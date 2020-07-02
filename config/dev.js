/**
 * @author Jay
 * @date 2020-07-01
 * @description config
 */

/**
 * webpack 参数配置
 */
const Options = {
  port: 8080, // 端口
  contentBase: "mobile", // 根目录
  publicPath: "/mobile/", // 公共前缀 "/mobile/" or ""  注意 publicPath需要设置鱼contentBase相同
  router: "browser", // 路由模式 hash browser
  devtool: "cheap-module-source-map", // map
};

module.exports = { Options };
