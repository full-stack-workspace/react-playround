import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '../../test/utils';
import Bookkeeping from './index';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, STORAGE_KEY } from './types';
import type { BookkeepingRecord, DateRange } from './types';
import { selectAntdOption } from '../../test/antdHelpers';
import dayjs from 'dayjs';
import type { RecordTableProps } from './RecordTable';

// 捕获 RecordTable 传入的 onDateRangeChange 回调，供日期区间筛选测试直接调用
let capturedOnDateRangeChange: ((range: DateRange) => void) | null = null;

vi.mock('./RecordTable', async () => {
    const actual = await vi.importActual<typeof import('./RecordTable')>('./RecordTable');
    const { RecordTable: OrigRecordTable } = actual;

    function WrappedRecordTable(props: RecordTableProps) {
        capturedOnDateRangeChange = props.onDateRangeChange;
        return <OrigRecordTable {...props} />;
    }

    return { ...actual, RecordTable: WrappedRecordTable };
});

async function addRecord(
    container: HTMLElement,
    opts: { type?: 'income' | 'expense'; amount: string; category: string; description?: string },
) {
    if (opts.type === 'income') {
        await selectAntdOption(container, 0, '收入');
    }

    fireEvent.change(screen.getByPlaceholderText('金额'), { target: { value: opts.amount } });

    await selectAntdOption(container, 1, opts.category);

    if (opts.description) {
        fireEvent.change(screen.getByPlaceholderText('备注（可选）'), {
            target: { value: opts.description },
        });
    }

    fireEvent.click(screen.getByRole('button', { name: /添加/ }));

    await waitFor(() => {
        expect(screen.getByText(opts.category)).toBeInTheDocument();
    });
}

describe('Bookkeeping 页面集成测试', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('初始状态', () => {
        it('应该渲染页面标题"记账本"', () => {
            render(<Bookkeeping />);
            expect(screen.getByText('记账本')).toBeInTheDocument();
        });

        it('无记录时汇总卡片应全部显示 ¥ 0.00', () => {
            render(<Bookkeeping />);
            const amounts = screen.getAllByText(/¥\s*0\.00/);
            expect(amounts.length).toBe(3);
        });

        it('无记录时表格应显示空状态', () => {
            render(<Bookkeeping />);
            expect(screen.getByText('暂无记录，开始记账吧！')).toBeInTheDocument();
        });
    });

    describe('添加记录', () => {
        it('添加一条支出记录后，表格应显示该记录', async () => {
            const { container } = render(<Bookkeeping />);
            await addRecord(container, {
                amount: '50',
                category: EXPENSE_CATEGORIES[0],
                description: '午饭',
            });

            expect(screen.getByText('午饭')).toBeInTheDocument();
            expect(screen.getByText(EXPENSE_CATEGORIES[0])).toBeInTheDocument();
        });

        it('添加一条支出记录后，总支出和余额应更新', async () => {
            const { container } = render(<Bookkeeping />);
            await addRecord(container, {
                amount: '50',
                category: EXPENSE_CATEGORIES[0],
            });

            const expenseCard = screen.getByText('总支出').closest('div[class*="rounded"]')!;
            expect(expenseCard).toHaveTextContent('50.00');
        });

        it('添加一条收入记录后，总收入和余额应更新', async () => {
            const { container } = render(<Bookkeeping />);
            await addRecord(container, {
                type: 'income',
                amount: '5000',
                category: INCOME_CATEGORIES[0],
            });

            const incomeCard = screen.getByText('总收入').closest('div[class*="rounded"]')!;
            expect(incomeCard).toHaveTextContent('5,000.00');
        });
    });

    describe('localStorage 持久化', () => {
        it('添加记录后 localStorage 应写入数据', async () => {
            const { container } = render(<Bookkeeping />);
            await addRecord(container, {
                amount: '100',
                category: EXPENSE_CATEGORIES[0],
            });

            const stored = localStorage.getItem(STORAGE_KEY);
            expect(stored).toBeTruthy();
            const parsed = JSON.parse(stored!) as BookkeepingRecord[];
            expect(parsed.length).toBe(1);
            expect(parsed[0].amount).toBe(100);
        });

        it('localStorage 有已存数据时，页面加载应正确恢复记录', () => {
            const existingRecords: BookkeepingRecord[] = [
                {
                    id: 'test-1',
                    type: 'income',
                    amount: 8000,
                    category: '工资',
                    description: '三月工资',
                    date: '2025-03-01',
                },
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRecords));

            render(<Bookkeeping />);

            expect(screen.getByText('三月工资')).toBeInTheDocument();
            const incomeCard = screen.getByText('总收入').closest('div[class*="rounded"]')!;
            expect(incomeCard).toHaveTextContent('8,000.00');
        });
    });

    describe('删除记录', () => {
        it('删除记录后汇总数据应同步更新', async () => {
            const existingRecords: BookkeepingRecord[] = [
                {
                    id: 'del-1',
                    type: 'expense',
                    amount: 200,
                    category: '餐饮',
                    description: '聚餐',
                    date: '2025-03-01',
                },
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRecords));

            render(<Bookkeeping />);
            expect(screen.getByText('聚餐')).toBeInTheDocument();

            const deleteBtn = document.querySelector('.ant-btn-dangerous')!;
            fireEvent.click(deleteBtn);

            await waitFor(() => {
                expect(screen.getByText('确定删除这条记录吗？')).toBeInTheDocument();
            });

            const popover = document.querySelector('.ant-popconfirm');
            const btns = popover?.querySelectorAll('button') ?? [];
            const confirmBtn = Array.from(btns).pop();
            fireEvent.click(confirmBtn!);

            await waitFor(() => {
                expect(screen.queryByText('聚餐')).not.toBeInTheDocument();
            });

            const expenseCard = screen.getByText('总支出').closest('div[class*="rounded"]')!;
            expect(expenseCard).toHaveTextContent('0.00');
        });
    });

    describe('日期区间筛选', () => {
        const crossMonthRecords: BookkeepingRecord[] = [
            {
                id: 'f-1',
                type: 'income',
                amount: 5000,
                category: '工资',
                description: '三月工资',
                date: '2025-03-15',
            },
            {
                id: 'f-2',
                type: 'expense',
                amount: 200,
                category: '餐饮',
                description: '三月餐饮',
                date: '2025-03-10',
            },
            {
                id: 'f-3',
                type: 'income',
                amount: 3000,
                category: '兼职',
                description: '二月收入',
                date: '2025-02-10',
            },
        ];

        it('设置日期区间后，汇总数据应仅反映区间内记录', async () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(crossMonthRecords));
            render(<Bookkeeping />);

            // 初始状态：全部记录汇总（收入 5000 + 3000 = 8000，支出 200）
            const incomeCardBefore = screen.getByText('总收入').closest('div[class*="rounded"]')!;
            expect(incomeCardBefore).toHaveTextContent('8,000.00');

            // 设置日期区间为 2025-03-01 ~ 2025-03-31，仅包含两条三月记录
            act(() => {
                capturedOnDateRangeChange?.([dayjs('2025-03-01'), dayjs('2025-03-31')]);
            });

            await waitFor(() => {
                const incomeCard = screen.getByText('总收入').closest('div[class*="rounded"]')!;
                expect(incomeCard).toHaveTextContent('5,000.00'); // 只有三月工资
                const expenseCard = screen.getByText('总支出').closest('div[class*="rounded"]')!;
                expect(expenseCard).toHaveTextContent('200.00'); // 只有三月餐饮
                const balanceCard = screen.getByText('余额').closest('div[class*="rounded"]')!;
                expect(balanceCard).toHaveTextContent('4,800.00'); // 5000 - 200
            });
        });

        it('清除日期区间后，汇总数据应恢复为全部记录', async () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(crossMonthRecords));
            render(<Bookkeeping />);

            // 先设置日期区间（只包含三月记录）
            act(() => {
                capturedOnDateRangeChange?.([dayjs('2025-03-01'), dayjs('2025-03-31')]);
            });

            await waitFor(() => {
                const incomeCard = screen.getByText('总收入').closest('div[class*="rounded"]')!;
                expect(incomeCard).toHaveTextContent('5,000.00');
            });

            // 清除日期区间，应恢复全部记录
            act(() => {
                capturedOnDateRangeChange?.(null);
            });

            await waitFor(() => {
                const incomeCard = screen.getByText('总收入').closest('div[class*="rounded"]')!;
                expect(incomeCard).toHaveTextContent('8,000.00'); // 5000 + 3000
            });
        });
    });
});
