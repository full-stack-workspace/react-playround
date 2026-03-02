/**
 * @file antdHelpers.ts
 * @description Ant Design 组件的测试辅助工具函数
 *
 * Ant Design v6 的 Select 组件使用自定义 DOM 结构，无法通过标准 accessible 查询直接操作。
 * 本模块封装常见的交互操作，避免在各测试文件中重复实现。
 */

import { fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

/**
 * 打开 Ant Design Select 下拉并选中指定选项。
 *
 * @param container - 包含 Select 组件的 DOM 容器（通常是 render() 返回的 container）
 * @param index - 页面中第几个 `.ant-select` 组件（0-based）
 * @param optionTitle - 目标选项的 title 属性值（即选项的文本内容）
 *
 * @example
 * const { container } = render(<MyForm />);
 * await selectAntdOption(container, 0, '收入');
 */
export async function selectAntdOption(
    container: HTMLElement,
    index: number,
    optionTitle: string,
): Promise<void> {
    const selects = container.querySelectorAll<HTMLElement>('.ant-select');
    const target = selects[index];
    fireEvent.mouseDown(target.querySelector('.ant-select-content')!);

    await waitFor(() => {
        const option = document.querySelector(
            `.ant-select-item[title="${optionTitle}"]`,
        );
        expect(option).toBeTruthy();
        fireEvent.click(option!);
    });
}
