const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:5001',
            changeOrigin: true,
            onProxyReq: ({ method, path, req }) => console.log(method, path),
            secure: false
        }),

    );
};