/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const { mountRoutes } = require('remix-mount-routes');
const basePath = '/dashboard';

module.exports = {
  serverBuildTarget: 'cloudflare-workers',
  // server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  assetsBuildDirectory: `public${basePath}/build`,
  serverBuildPath: `build/index.js`,
  publicPath: `${basePath}/build/`,
  routes: (defineRoutes) => {
    const baseRoutes = mountRoutes(basePath, 'routes');
    const routes = {
      ...baseRoutes,
    };
    return routes;
  },
};
