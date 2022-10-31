module.exports = {
  preset: 'monodeploy/preset-recommended',
  git: {
    commitSha: 'HEAD',
    remote: 'origin',
    push: true,
  },
  conventionalChangelogConfig: '@tophat/conventional-changelog-config',
  access: 'infer',
  persistVersions: false,
  changesetIgnorePatterns: ['**/*.test.js', '**/stories/**/*'],
  packageGroupManifestField: 'publishConfig.group'
}