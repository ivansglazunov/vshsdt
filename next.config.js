
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
  [optimizedImages],
], {
  hmr: false,
  webpack: (config) => {
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
