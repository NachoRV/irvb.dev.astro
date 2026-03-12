import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Archivos a ignorar
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'src/env.d.ts'],
  },

  // Excepciones para archivos de declaración de tipos de Astro
  {
    files: ['src/env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Configuración recomendada para archivos .astro
  ...eslintPluginAstro.configs['flat/recommended'],

  // TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Accesibilidad
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.astro', '**/*.tsx', '**/*.jsx'],
  },
];
