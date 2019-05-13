const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
// const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = false;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const babelRcPath = path.resolve('.babelrc') || path.resolve('babel.config.js');
const hasBabelRc = fs.existsSync(babelRcPath);
const mainBabelOptions = {
  babelrc: true,
  compact: true,
  presets: [],
};

if (hasBabelRc) {
  console.log('> Using .babelrc defined in your app root');
} else {
  mainBabelOptions.presets.push(require.resolve('babel-preset-react-app'));
}

// Note: defined here because it will be used more than once.

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  mode: 'production',
  devtool: shouldUseSourceMap ? 'source-map' : false,
  // In production, we only want to load the polyfills and the app code.
  entry: [paths.appIndexJs],
  output: {
    // The build folder.
    path: paths.appBuild,
    filename: 'bundle.js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  optimization: {
    minimize: true,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: paths.appBuild + 'static/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: mainBabelOptions,
          },
          {
            test: /\.purs$/,
            loader: require.resolve('purs-loader'),
            exclude: /node_modules/,
            query: {
              psc: 'psa',
              src: [paths.pursFiles, paths.pscPackages],
              pscPackage: true,
              bundle: true,
              watch: false,
            },
          },
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** no loader after File Loader
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
