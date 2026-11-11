import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
	globalIgnores(['dist', 'node_modules']),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		plugins: {
			'@stylistic': stylistic,
		},
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
		},
		rules: {
			// Forzar tabs y no espacios
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/jsx-indent-props': ['error', 'tab'],
			'@stylistic/no-mixed-spaces-and-tabs': 'error',
			'no-tabs': 'off',
			// Otras reglas de estilo basicas
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/eol-last': ['error', 'always'],
		},
	},
])
