module.exports = {
  template: ['src', 'app', 'psc-package.json', '.gitignore'],
  requireables: ['scripts/dev.js', 'scripts/build.js'],
  packageScripts: ['dev', 'build'],
  bin: 'en-electronator',
};
