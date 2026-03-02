# 代码提交计划 - react-playround/uip worktree

## 任务概述

使用 git-workflow 流程将 worktree 中的代码变更进行本地提交。

## 当前状态

| 项目 | 值 |
|------|-----|
| Worktree 路径 | /Users/liangshiquan/.cursor/worktrees/react-playround/uip |
| 当前分支 | feat/bookkeeping |
| 提交类型 | 本地提交 (不推送到远程) |

## 提交信息

### 提交消息 (Conventional Commits)

feat(bookkeeping): add bookkeeping feature with record management

Add complete bookkeeping module with:
- AddRecordForm for creating new financial records
- RecordTable for displaying and managing records
- SummaryCards for financial overview
- Full test coverage for all components
- Update App routing and navigation to include bookkeeping page

### 提交范围

将提交以下文件：

已跟踪文件的修改:
- package.json - 依赖更新
- pnpm-lock.yaml - 锁文件更新
- src/App.tsx - 路由配置更新
- src/config/navigation.tsx - 导航配置更新

新增目录/文件:
- src/pages/Bookkeeping/ - 完整的新功能模块
  - AddRecordForm.tsx
  - AddRecordForm.test.tsx
  - RecordTable.tsx
  - RecordTable.test.tsx
  - SummaryCards.tsx
  - SummaryCards.test.tsx
  - index.tsx
  - index.test.tsx
  - types.ts
  - README.md

### 不提交的文件

- .pnpm-store/ - pnpm 缓存目录 (已在 .gitignore 中)

## 执行步骤

### 步骤 0: 验证 Husky Hooks 状态

检查当前 hooks 配置状态：

git -C /Users/liangshiquan/.cursor/worktrees/react-playround/uip ls-hooks

当前状态分析：
- .husky/pre-commit 已存在 (运行 lint-staged)
- .husky/commit-msg 不存在 (commitlint 不会在提交时检查)

### 步骤 1: 创建 commit-msg Hook

创建 commit-msg hook 以启用 commitlint 验证：

cat > /Users/liangshiquan/.cursor/worktrees/react-playround/uip/.husky/commit-msg << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "${1}"
EOF

chmod +x /Users/liangshiquan/.cursor/worktrees/react-playround/uip/.husky/commit-msg

### 步骤 2: 添加所有变更到暂存区

git -C /Users/liangshiquan/.cursor/worktrees/react-playround/uip add -A

### 步骤 3: 验证暂存内容

git -C /Users/liangshiquan/.cursor/worktrees/react-playround/uip status

预期输出：所有变更已暂存，无未跟踪文件（除 .pnpm-store/）

### 步骤 4: 执行提交

git -C /Users/liangshiquan/.cursor/worktrees/react-playround/uip commit -m "feat(bookkeeping): add bookkeeping feature with record management

Add complete bookkeeping module with:
- AddRecordForm for creating new financial records
- RecordTable for displaying and managing records
- SummaryCards for financial overview
- Full test coverage for all components
- Update App routing and navigation to include bookkeeping page"

此时 commit-msg hook 会自动运行 commitlint 验证提交消息

### 步骤 5: 验证提交结果

git -C /Users/liangshiquan/.cursor/worktrees/react-playround/uip log -1 --stat

预期输出：显示最新的提交包含所有预期文件

## 验证清单

- [ ] commit-msg hook 已创建并有执行权限
- [ ] 所有代码变更已暂存
- [ ] 提交消息符合 Conventional Commits 格式
- [ ] commitlint 验证通过
- [ ] 提交成功无错误
- [ ] git status 显示工作区干净
- [ ] git log 显示新提交在分支顶部

## 注意事项

1. 不推送: 用户明确要求仅本地提交，不推送到远程仓库
2. 单一提交: 所有变更合并为一个提交
3. 使用 git-workflow 流程: 遵循 Conventional Commits 规范
4. Hook 验证: commit-msg hook 会在提交时验证消息格式
