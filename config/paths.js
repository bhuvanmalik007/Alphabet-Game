const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = () => envPublicUrl || 'build/';

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return servedUrl.endsWith('/') ? servedUrl : `${servedUrl}/`;
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('app/build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('app/app.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  mainjsPath: resolveApp('app/main.js'),
  menujsPath: resolveApp('app/menu.js'),
  // Support Purescript
  pursFiles: resolveApp('src/**/*.purs'),
  pscPackages: resolveApp('.psc-package/purescript-*/src/**/*.purs'),
};
