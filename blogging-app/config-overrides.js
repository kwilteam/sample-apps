const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "zlib": require.resolve('browserify-zlib'),
        "net": false,
        "tls": false,
        "fs": false,
        "path": false,
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);
    config.module.rules = config.module.rules.map(rule => {
      if (rule.use && rule.use.some(use => use.options && use.options.useEslintrc !== undefined)) {
        const useEslintLoader = rule.use.find(use => use.options && use.options.useEslintrc !== undefined);
        useEslintLoader.options.baseConfig = {
          ...eslintConfigReactApp,
          parserOptions: {
            ...eslintConfigReactApp.parserOptions,
            ecmaVersion: 2020, // Enable BigInt support
          },
        };
      }
      return rule;
    });
    return config;
}