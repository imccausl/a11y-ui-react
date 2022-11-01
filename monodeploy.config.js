module.exports = {
  dryRun: process.env.CI === 1 ? true : false,
  preset: 'monodeploy/preset-recommended',
  git: {
    commitSha: 'HEAD',
    remote: 'origin',
    push: true,
  },
  conventionalChangelogConfig: '@tophat/conventional-changelog-config',
  access: 'infer',
  persistVersions: process.env.CI === 1 ? true : false,
  changesetIgnorePatterns: ['**/*.test.js', '**/stories/**/*'],
  packageGroupManifestField: 'publishConfig.group',
  changelogFilename: '<packageDir>/CHANGELOG.md',
  plugins: [
    '@monodeploy/plugin-github'
  ],
  autoCommit: process.env.CI === 1 ? true : false,
  autoCommitMessage: "chore: publish packages [skip ci]",
}