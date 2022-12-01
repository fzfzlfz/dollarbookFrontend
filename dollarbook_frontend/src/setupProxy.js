const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:3000',
      target: 'http://linserv1.cims.nyu.edu:21019/',
      changeOrigin: true,
    })
  );
};