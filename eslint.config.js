import js from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    ignores: ['node_modules', 'dist', '.vite']
  },
  {
    languageOptions: {
      globals: {
        console: 'readonly'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-prop-types': 'off'
    }
  }
]