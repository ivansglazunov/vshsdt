const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([
  [withTypescript],
  [withCSS, {
    cssModules: true,
  }],
  [optimizedImages],
]);
