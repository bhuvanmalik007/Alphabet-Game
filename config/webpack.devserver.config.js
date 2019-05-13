const { spawn } = require('child_process');
const path = require('path');
const escape = require('escape-string-regexp');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = () => ({
  disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
  compress: true,
  clientLogLevel: 'none',
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: new RegExp(
      `^(?!${escape(
        path.normalize(paths.appSrc + '/').replace(/[\\]+/g, '/'),
      )}).+/node_modules/`,
      'g',
    ),
  },
  https: protocol === 'https',
  host,
  overlay: false,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  },
  before() {
    if (process.env.ELECTRON) {
      console.log('Starting Main Process...');
      spawn('electron', ['./app/main.js'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  },
});
