/**
 * @file AppExample/index.tsx
 * @description AppExample landing page — introduces all sub-apps and highlights the React / AI capabilities each one demonstrates.
 */
import React, { memo } from 'react';
import { Tag } from 'antd';

interface Capability {
    label: string;
    color: string;
}

interface SubApp {
    name: string;
    path: string;
    description: string;
    reactCapabilities: Capability[];
    aiCapabilities: Capability[];
    emoji: string;
}

const SUB_APPS: SubApp[] = [
    {
        name: '待办事项清单',
        path: '/app-example/todo',
        emoji: '✅',
        description: '一个功能完整的 Todo 应用，支持新增、完成、删除和筛选任务，是演示 React 状态管理的经典示例。',
        reactCapabilities: [
            { label: 'useState', color: 'blue' },
            { label: 'useCallback', color: 'blue' },
            { label: 'useMemo', color: 'blue' },
            { label: 'React.memo', color: 'cyan' },
        ],
        aiCapabilities: [
            { label: 'AI 辅助编码', color: 'purple' },
            { label: 'Vibe Coding', color: 'magenta' },
        ],
    },
    {
        name: '记账本',
        path: '/app-example/bookkeeping',
        emoji: '💰',
        description: '收支记录与统计应用，支持分类记账、汇总展示。演示了组件拆分、表单处理与数据聚合计算。',
        reactCapabilities: [
            { label: 'useState', color: 'blue' },
            { label: 'useCallback', color: 'blue' },
            { label: 'useMemo', color: 'blue' },
            { label: 'Ant Design Form', color: 'geekblue' },
        ],
        aiCapabilities: [
            { label: 'AI 辅助编码', color: 'purple' },
            { label: 'Vibe Coding', color: 'magenta' },
        ],
    },
    {
        name: '购物车',
        path: '/app-example/shopping-cart',
        emoji: '🛒',
        description: '带搜索和分类筛选的购物车应用，展示商品列表管理与购物车状态同步，综合运用多种 Hooks。',
        reactCapabilities: [
            { label: 'useState', color: 'blue' },
            { label: 'useCallback', color: 'blue' },
            { label: 'useMemo', color: 'blue' },
            { label: 'React.memo', color: 'cyan' },
        ],
        aiCapabilities: [
            { label: 'AI 辅助编码', color: 'purple' },
            { label: 'Vibe Coding', color: 'magenta' },
        ],
    },
    {
        name: 'Relay Example',
        path: '/app-example/relay-example',
        emoji: '🔗',
        description: '使用 React Relay 进行 GraphQL 数据获取的示例，展示声明式数据依赖与 Suspense 加载状态处理。',
        reactCapabilities: [
            { label: 'Suspense', color: 'blue' },
            { label: 'useLazyLoadQuery', color: 'blue' },
            { label: 'React Relay', color: 'geekblue' },
            { label: 'GraphQL', color: 'cyan' },
        ],
        aiCapabilities: [
            { label: 'AI 辅助编码', color: 'purple' },
            { label: 'Vibe Coding', color: 'magenta' },
        ],
    },
];

const AppExample: React.FC = memo(() => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">应用示例</h1>
                    <p className="text-lg text-gray-500 max-w-2xl">
                        这里收录了多个完整的小应用示例，每个应用都综合运用了
                        React 核心能力，并通过 AI 辅助工作流（Vibe Coding）协作完成开发。
                    </p>
                </section>

                {/* Sub-app Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SUB_APPS.map(app => (
                        <a
                            key={app.path}
                            href={app.path}
                            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 p-6 no-underline"
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{app.emoji}</span>
                                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {app.name}
                                </h2>
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                {app.description}
                            </p>

                            {/* React Capabilities */}
                            <div className="mb-2">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
                                    React
                                </span>
                                <span className="inline-flex flex-wrap gap-1">
                                    {app.reactCapabilities.map(cap => (
                                        <Tag key={cap.label} color={cap.color} className="text-xs">
                                            {cap.label}
                                        </Tag>
                                    ))}
                                </span>
                            </div>

                            {/* AI Capabilities */}
                            <div>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
                                    AI
                                </span>
                                <span className="inline-flex flex-wrap gap-1">
                                    {app.aiCapabilities.map(cap => (
                                        <Tag key={cap.label} color={cap.color} className="text-xs">
                                            {cap.label}
                                        </Tag>
                                    ))}
                                </span>
                            </div>
                        </a>
                    ))}
                </section>
            </main>
        </div>
    );
});

AppExample.displayName = 'AppExample';

export default AppExample;
