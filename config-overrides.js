/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');
const paths = require('react-scripts-ts/config/paths');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = function override(config, env) {
  const tsLoader = config.module.rules.find(conf => conf.loader && conf.loader.includes('ts-loader'));
  tsLoader.loader = require.resolve('awesome-typescript-loader');
  tsLoader.query = {
    useBabel: true,
  };

  const tsLintLoader = config.module.rules.find(conf => conf.loader && conf.loader.includes('tslint-loader'));
  tsLintLoader.options = tsLintLoader.options || {};
  // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
  tsLintLoader.options.typeCheck = true;

  // For import with absolute path
  config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules);

  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config); // change importing css to less
  config = rewireLess(config, env, {
    // We use modifyVars option of less- loader here, you can see a green button rendered
    // on the page after reboot start server.
    modifyVars: { '@primary-color': '#1DA57A' },
  });

  // Include rule for JS/JSX files
  config.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {},
      enforce: 'pre',
    },
    {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        babelrc: true,
        presets: [require.resolve('babel-preset-react-app')],
        cacheDirectory: true,
      },
    },
  );

  // Optimize
  config.plugins.push(new ParallelUglifyPlugin({
    sourceMap: true,
    uglifyES: {
      // These pass straight through to uglify-es. Cannot be used with uglifyJS. uglify-es is a
      // version of uglify that understands newer es6 syntax. You should use this option if the
      // files that you're minifying do not need to run in older browsers/versions of node.
    },
  }));

  return config;
};
