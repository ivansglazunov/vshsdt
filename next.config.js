const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
  withCSS,
  withTypescript
]);
