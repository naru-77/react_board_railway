const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/INFO_3/BulletinBoardApplication/1.0.0",
    createProxyMiddleware({
      target: "https://virtserver.swaggerhub.com",
      changeOrigin: true,
    })
  );
};
