let babelrc = {
    "presets": [
        "react",
        ["es2015", { loose: true }],
        "stage-3"
    ],
    "env": {
        "development": {
            "presets": [
                "react-hmre"
            ]
        }
    }
};

module.exports = {
    babel: () => {
        return {
            test: /\.js$/,
            exclude: /node_modules/,

            loader: 'babel-loader',
            query: babelrc,
        }
    },
    extractcss: (a) => {
        let re = RegExp('(.*?(\\|\/)' + a + '(\\|\/)).*less$'),
            ExtractTextPlugin = require('extract-text-webpack-plugin');
        return {
            test: re,
            loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!less-loader')
        }
    },
    images: (size) => {
        return {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit='+size+'&name=images/[hash:8].[name].[ext]'
        }
    },
}