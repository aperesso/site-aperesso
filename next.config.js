const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

module.exports = withPlugins([
  [withSass, {}],
  [withTM , { transpileModules : ['three'] }]
])