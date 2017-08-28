const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
	const tsLoader = config.module.rules.find(conf => {
		return conf.loader && conf.loader.includes('ts-loader')
	})
	tsLoader.loader = require.resolve('awesome-typescript-loader')
	tsLoader.query = {
		useBabel: true,
	}

	const tsLintLoader = config.module.rules.find(conf => {
		return conf.loader && conf.loader.includes('tslint-loader')
	})
	tsLintLoader.options = tsLintLoader.options || {}
	// FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
	tsLintLoader.options.typeCheck = true

	const path = require('path')
	// For import with absolute path
	config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules)

	config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
	config = rewireLess(config, env, {
		//We use modifyVars option of less- loader here, you can see a green button rendered on the page after reboot start server.
		modifyVars: { "@primary-color": "#1DA57A" },
	});

	return config
}