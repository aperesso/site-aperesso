const withSass = require('@zeit/next-sass');
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

module.exports = withPlugins([
  [withSass, {}],
  [withImages, {}],
  [withTM , { transpileModules : ['three'] }]
])