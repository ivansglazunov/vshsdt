
const webpack = require("webpack");

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([
  [withCSS, {
    cssLoaderOptions: {
      url: false
    }
  }],
], {
  hmr: true,
  webpack: (config) => {
    // if (dev && !isServer) {
      const HMR = config.module.rules.find(r => r.loader === "hot-self-accept-loader")
      if (HMR) {
        HMR.test = /\.(ts|tsx|js|jsx)$/
        HMR.options.extensions = /\.(ts|tsx|js|jsx)$/
      }
    // }

    config.plugins.push(new webpack.IgnorePlugin(/\.flow$/));

    config.module.rules.push({
      test: /\.(jpe?g|png)$/i,
      loader: 'responsive-loader',
      options: {
        // If you want to enable sharp support:
        adapter: require('responsive-loader/sharp')
      }
    });

    return config;
  },
});
