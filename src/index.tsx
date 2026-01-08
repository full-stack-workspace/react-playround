import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import App from './App';
import { environment } from './relay/Environment';
import "./index.css";


const rootEl = document.getElementById('root');
if (rootEl) {
    // 创建根节点来调用 render 方法，能启动 React 的并行渲染机制
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <RelayEnvironmentProvider environment={environment}>
                <App />
            </RelayEnvironmentProvider>
        </React.StrictMode>,
    );
}
