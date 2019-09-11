
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
  webpack: (config) => {
    config.plugins.push(new webpack.IgnorePlugin(/\.flow$/));

    return config;
  },
});
