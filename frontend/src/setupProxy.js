const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'https://calm-ruby-fawn-tie.cyclic.app',
      changeOrigin: true,
    })
  );
};