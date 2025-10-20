const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    port: 3002
  },
  webpack: {
    plugins: {
      add: [
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
    },
  },
};
