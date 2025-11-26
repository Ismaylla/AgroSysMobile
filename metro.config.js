// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona 'ttf' e 'otf' ao resolver de assets
config.resolver.assetExts.push('ttf', 'otf');

module.exports = config;