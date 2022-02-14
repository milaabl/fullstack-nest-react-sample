const { createProxyMiddleware } = require('http-proxy-middleware');

function proxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://blomstergard.herokuapp.com',
      changeOrigin: true,
    }),
  );
}

module.exports = proxy;
