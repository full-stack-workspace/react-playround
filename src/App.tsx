import { useState, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Posts from './pages/Posts';
import { ShoppingCart } from './pages/ShoppingCart';
import RelayExample from './pages/RelayExample';
import './index.css';

import { Loading } from './components/Loading';

import { AppErrorBoundary } from './monitor/AppErrorBoundary';

const { Header, Sider, Content } = Layout;

// Import navigation configuration with type assertion
import {
    mainNavItems,
    sideNavItems,
} from './config/navigation';

import type { MenuProps } from 'antd';

const AppContent = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const secondaryNavItems = sideNavItems[location.pathname] || [];

    return (
        <Suspense fallback={<Loading />}>
            <Layout className="min-h-screen">
                <Header className="bg-white shadow-sm flex items-center justify-between px-4">
                    <div className="text-xl font-bold">React Playground</div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={mainNavItems as MenuProps['items']}
                        className="border-b-0"
                    />
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={setCollapsed}
                        className="bg-white border-r"
                        width={200}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[location.pathname]}
                            items={secondaryNavItems as MenuProps['items']}
                            className="h-full border-none"
                            defaultOpenKeys={['/']}
                        />
                    </Sider>
                    <Layout className="bg-gray-50">
                        <Suspense fallback={<Loading />}>
                            <AppErrorBoundary>
                                <Content className="p-6">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/hooks" element={<Posts />} />
                                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                                        <Route path="/relay-example" element={<RelayExample />} />
                                    </Routes>
                                </Content>
                            </AppErrorBoundary>
                        </Suspense>
                    </Layout>
                </Layout>
            </Layout>
        </Suspense>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
