const BrotliPlugin = require(`brotli-webpack-plugin`);
module.exports = {
    plugins: [
        new BrotliPlugin({
            asset: '[fileWithoutExt].[ext].br',
            test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/
        }),
    ]
}