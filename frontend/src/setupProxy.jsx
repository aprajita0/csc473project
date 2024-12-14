const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'https://server-sooty-gamma-45.vercel.app/',
      changeOrigin: true, 
    })
  );
};
