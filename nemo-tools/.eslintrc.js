module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	parser: 'vue-eslint-parser',
	extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-strongly-recommended', 'plugin:vue/vue3-recommended'],
	env: {
		browser: true,
		node: true,
		es6: true,
		'vue/setup-compiler-macros': true
	},
	rules: {
		'no-console': 'off',
		'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
	},
}