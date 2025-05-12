import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginQuery from '@tanstack/eslint-plugin-query';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules', 'package-lock.json', 'dist', 'lint-*'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser, // 🚨 Añade el parser de TypeScript
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    // Configuración específica para React (flat)
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Configuración para TanStack Query
    plugins: {
      '@tanstack/query': pluginQuery,
      
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
  {
    plugins: {
      '@tanstack/router': pluginRouter,
    },
    rules: {
      '@tanstack/router/create-route-property-order': 'error',
    },
  },
];
