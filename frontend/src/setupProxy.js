const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for /api/login
  app.use(
    "/api/login",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );

  // Proxy for /api/data
  app.use(
    "/api/login",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );
};
