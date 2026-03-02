import type { ReactNode } from 'react';

export interface NavItem {
    key: string;
    label: ReactNode | string;
    icon?: string;
    children?: NavItem[];
}

enum NavPathKey {
    Home = '/',
    Fragment = '/fragment',
    Event = '/event',
    Hooks = '/hooks',
    useState = '/hooks/useState',
    useEffect = '/hooks/useEffect',
    AppExample = '/app-example',
    ShoppingCart = '/app-example/shopping-cart',
    RelayExample = '/app-example/relay-example',
    Todo = '/app-example/todo',
    Bookkeeping = '/app-example/bookkeeping',
};

export const mainNavItems: NavItem[] = [
    {
        key: NavPathKey.Home,
        label: (
            <a href="/">基础知识</a>
        ),

    },
    {
        key: NavPathKey.Hooks,
        label: (
            <a href="/hooks">Hooks</a>
        ),
    },
    {
        key: NavPathKey.AppExample,
        label: (
            <a href="/app-example">App Example</a>
        ),
    },
];

export const sideNavItems: Record<string, NavItem[]> = {
    [NavPathKey.Home]: [
        { key: NavPathKey.Fragment, label: 'Fragment' },
        { key: NavPathKey.Event, label: '事件与合成事件' }
    ],
    [NavPathKey.Hooks]: [
        { key: NavPathKey.useState, label: 'useState' },
        { key: NavPathKey.useEffect, label: 'useEffect' },
    ],
    [NavPathKey.AppExample]: [
        {
            key: NavPathKey.Todo,
            label: (<a href="/app-example/todo">待办事项清单</a>),
        },
        {
            key: NavPathKey.Bookkeeping,
            label: (<a href="/app-example/bookkeeping">记账本</a>),
        },
        {
            key: NavPathKey.ShoppingCart,
            label: (<a href="/app-example/shopping-cart">购物车</a>),
        },
        {
            key: NavPathKey.RelayExample,
            label: (<a href="/app-example/relay-example">Relay Example</a>),
        },
    ],
};
