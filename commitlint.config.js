/**
 * @file Commitlint configuration
 * @description Enforces Conventional Commits specification
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum
    'type-enum': [
      2,
      'always',
      [
        'feat',      // New feature
        'fix',       // Bug fix
        'docs',      // Documentation changes
        'style',     // Code style changes (formatting, semicolons, etc.)
        'refactor',  // Code refactoring (neither fix nor feat)
        'perf',      // Performance improvements
        'test',      // Adding or modifying tests
        'chore',     // Build process, auxiliary tools, docs
        'revert',    // Revert commits
        'ci',        // CI configuration changes
      ],
    ],
    // Type is required
    'type-empty': [2, 'never'],
    // Scope is optional
    'scope-empty': [2, 'always'],
    // Subject (description) is required and cannot be empty
    'subject-empty': [2, 'never'],
    // Subject max length
    'subject-max-length': [2, 'always', 100],
    // Body is optional
    'body-empty': [2, 'always'],
    // Footer is optional
    'footer-empty': [2, 'always'],
  },
};
