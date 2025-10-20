import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/dist/**', '**/build/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }]
    }
  }
];
