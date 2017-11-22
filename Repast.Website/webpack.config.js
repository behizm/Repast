const path = require('path');
const webpack = require('webpack');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('app.css');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: { app: ['aurelia-bootstrapper', 'site.css'] },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['ClientApp', 'node_modules', 'Content'],
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: 'dist/',
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.ts$/i, include: /ClientApp/, use: 'ts-loader?silent=true' },
                { test: /\.html$/i, use: 'html-loader' },
                //{ test: /\.css$/i, use: extractCSS.extract([isDevBuild ? 'css-loader' : 'css-loader?minimize']) },
                {
                    test: /\.css$/i,
                    use: extractCSS.extract(
                        {
                            publicPath: '',
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }
                            ]
                        })
                },
                { test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new AureliaPlugin({ aureliaApp: 'boot' })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                //filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                new webpack.optimize.UglifyJsPlugin()
            ])
    }];
}
