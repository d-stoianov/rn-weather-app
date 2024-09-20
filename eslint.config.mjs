import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    prettierConfig,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
]
