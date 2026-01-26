# Capability: Git Workflow

This capability defines the git workflow rules that AI programming tools MUST follow when committing and pushing code to this repository.

## ADDED Requirements

### Requirement: Commit Message Generation

AI tools SHALL generate commit messages based only on files that have been explicitly staged via `git add`. The AI tool SHALL analyze each staged file's diff to understand the code changes, categorize the changes into Conventional Commits types, and generate a semantic commit message.

#### Scenario: Generate commit message from staged files

- **WHEN** the user executes `git add` on one or more files
- **THEN** the AI tool SHALL read the diff of each staged file
- **AND** the AI tool SHALL categorize changes into one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`
- **AND** the AI tool SHALL generate a commit message following the format: `<type>[optional scope]: <description>`
- **AND** the AI tool SHALL use imperative mood in the description

#### Scenario: Present commit message for user confirmation

- **WHEN** the commit message has been generated
- **THEN** the AI tool SHALL present the message to the user for confirmation
- **AND** the AI tool SHALL wait for explicit user approval before executing the commit
- **AND** the AI tool SHALL not proceed with commit without user confirmation

### Requirement: Commit Execution

AI tools SHALL execute the commit only after user confirmation. The AI tool SHALL notify the user of the result and handle errors appropriately.

#### Scenario: Execute commit after user confirmation

- **WHEN** the user confirms the commit message
- **THEN** the AI tool SHALL execute `git commit -m "<confirmed message>"`
- **AND** on success, the AI tool SHALL notify the user with the commit hash and description
- **AND** on failure, the AI tool SHALL analyze the error and report it to the user

#### Scenario: Handle commit errors

- **WHEN** a commit fails to execute
- **THEN** the AI tool SHALL check for active rebase or merge in progress
- **AND** the AI tool SHALL verify all staged files are valid
- **AND** the AI tool SHALL report the specific error to the user
- **AND** the AI tool SHALL NOT attempt force commit without user approval

### Requirement: Pre-Push Rebase

AI tools SHALL integrate remote changes using `git pull --rebase` before pushing. The AI tool SHALL handle rebase conflicts and not proceed until they are resolved.

#### Scenario: Pull remote changes with rebase

- **WHEN** the user requests to push code
- **THEN** the AI tool SHALL execute `git pull --rebase origin <branch-name>`
- **AND** if rebase succeeds, the AI tool SHALL proceed to validation checks
- **AND** if rebase fails due to conflicts, the AI tool SHALL notify the user immediately
- **AND** the AI tool SHALL wait for user to resolve conflicts before continuing

#### Scenario: Notify user of rebase conflicts

- **WHEN** a rebase conflict is detected
- **THEN** the AI tool SHALL list all conflicted files
- **AND** the AI tool SHALL provide instructions for resolving conflicts
- **AND** the AI tool SHALL wait for user to run `git add` and `git rebase --continue`
- **AND** the AI tool SHALL not proceed to validation until conflicts are resolved

### Requirement: Pre-Push Validation

AI tools SHALL run tests and build checks after successful rebase and before pushing. The AI tool SHALL not push if any validation fails.

#### Scenario: Run tests before push

- **WHEN** rebase completes successfully
- **THEN** the AI tool SHALL execute `pnpm test:run` (or equivalent test command)
- **AND** if tests fail, the AI tool SHALL report the failures to the user
- **AND** the AI tool SHALL NOT push until tests pass
- **AND** the AI tool SHALL wait for user approval before attempting fixes

#### Scenario: Run build before push

- **WHEN** tests pass successfully
- **THEN** the AI tool SHALL execute `pnpm build`
- **AND** if build fails, the AI tool SHALL report the errors to the user
- **AND** the AI tool SHALL NOT push until build succeeds
- **AND** the AI tool SHALL wait for user approval before attempting fixes

### Requirement: Push Execution

AI tools SHALL push code only after all validation checks pass. The AI tool SHALL notify the user of the result and handle push failures appropriately.

#### Scenario: Execute push after successful validation

- **WHEN** all validation checks pass (rebase, tests, build)
- **THEN** the AI tool SHALL execute `git push origin <branch-name>`
- **AND** on success, the AI tool SHALL notify the user with branch and remote details
- **AND** on failure, the AI tool SHALL identify the error type and report accordingly

#### Scenario: Handle push failures

- **WHEN** a push fails with non-fast-forward error
- **THEN** the AI tool SHALL notify the user that remote has new commits
- **AND** the AI tool SHALL ask the user whether to rebase-merge or force push
- **AND** the AI tool SHALL NOT take action without user confirmation

#### Scenario: Handle permission and network errors

- **WHEN** a push fails with permission denied
- **THEN** the AI tool SHALL report the access error to the user immediately
- **AND** the AI tool SHALL NOT retry without user guidance

- **WHEN** a push fails with network error
- **THEN** the AI tool SHALL retry once
- **AND** if the error persists, the AI tool SHALL report to the user

### Requirement: Notification Requirements

AI tools SHALL provide clear notifications throughout the git workflow, including before, during, and after operations.

#### Scenario: Notify before major operations

- **BEFORE** any git operation (commit, push, rebase)
- **THEN** the AI tool SHALL state what operation will be performed
- **AND** the AI tool SHALL list affected files or commits
- **AND** the AI tool SHALL wait for confirmation on major operations

#### Scenario: Notify during operations

- **DURING** long-running operations
- **THEN** the AI tool SHALL provide progress indicators
- **AND** the AI tool SHALL immediately report conflicts, test failures, or build errors

#### Scenario: Notify after operations

- **AFTER** any operation completes or fails
- **THEN** the AI tool SHALL provide success confirmation with details
- **OR** the AI tool SHALL provide failure notification with error message and suggested resolution

### Requirement: Scope Limitations

AI tools SHALL respect scope limitations and never commit or push unauthorized changes.

#### Scenario: Only commit staged files

- **WHEN** committing code
- **THEN** the AI tool SHALL only consider files explicitly staged via `git add`
- **AND** the AI tool SHALL NOT commit untracked files without explicit user permission

#### Scenario: Protect sensitive data

- **WHEN** staging files is detected
- **THEN** the AI tool SHALL NOT commit sensitive data including credentials, tokens, or `.env` files
- **AND** the AI tool SHALL alert the user if such files are detected

### Requirement: Conventional Commits Types

AI tools SHALL use the following commit types and their definitions when generating commit messages.

#### Scenario: Apply correct commit type

- **GIVEN** the AI tool has analyzed the staged changes
- **WHEN** changes add new functionality
- **THEN** the AI tool SHALL use type `feat`
- **WHEN** changes fix a bug
- **THEN** the AI tool SHALL use type `fix`
- **WHEN** changes only affect documentation
- **THEN** the AI tool SHALL use type `docs`
- **WHEN** changes affect code formatting without logic changes
- **THEN** the AI tool SHALL use type `style`
- **WHEN** changes refactor code without behavior changes
- **THEN** the AI tool SHALL use type `refactor`
- **WHEN** changes improve performance
- **THEN** the AI tool SHALL use type `perf`
- **WHEN** changes add or modify tests
- **THEN** the AI tool SHALL use type `test`
- **WHEN** changes affect build process or dependencies
- **THEN** the AI tool SHALL use type `chore`
- **WHEN** changes revert a previous commit
- **THEN** the AI tool SHALL use type `revert`
- **WHEN** changes affect CI/CD configuration
- **THEN** the AI tool SHALL use type `ci`

### Requirement: Forbidden Actions

AI tools SHALL never perform certain actions without explicit user confirmation.

#### Scenario: Never force push or amend without confirmation

- **WHEN** the user requests force push (`git push --force`)
- **THEN** the AI tool SHALL ask for explicit confirmation
- **AND** the AI tool SHALL explain the risks of force push
- **AND** the AI tool SHALL wait for user approval

- **WHEN** the user requests commit amend
- **THEN** the AI tool SHALL ask for explicit confirmation
- **AND** the AI tool SHALL explain the implications
- **AND** the AI tool SHALL wait for user approval

#### Scenario: Never skip validation checks

- **WHEN** the user asks to skip validation before push
- **THEN** the AI tool SHALL refuse and explain the importance of checks
- **AND** the AI tool SHALL not proceed without running tests and build
