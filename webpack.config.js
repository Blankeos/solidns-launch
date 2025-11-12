const webpack = require("@nativescript/webpack");
require("dotenv").config();

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    config.devServer.hotOnly(true);
    config.devServer.hot(true);

    config.resolve.fallback = {
      ...config.resolve.fallback,
      url: require.resolve("url/"),
    };

    config.plugin("DefinePlugin").tap((args) => {
      Object.assign(args[0], {
        __PUBLIC_API_URL__: JSON.stringify(process.env.PUBLIC_API_URL),
      });
      return args;
    });
  });

  return webpack.resolveConfig();
};
