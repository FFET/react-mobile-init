/**
 * @author FFET
 * @since 2021-01-21
 * @description Analyzer bundle
 */

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

exports = require("./webpack.prod.config");

exports.plugins.push(new BundleAnalyzerPlugin());

module.exports = exports;
