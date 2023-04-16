
module.exports = [
  {
    name: 'App JS',
    path: 'dist/**/index-*.js',
    // After switching to Vite (uses ESBuild as bundler), some dependencies
    // are also counted here, even with separate regex/chunk, which
    // renders a limit for the actual app file size virtually useless.
    // The app chunk itself is actually well within this range (ca. 9.3 kB
    // gzipped per Vite output) at the time of migration.
    // limit: '13kB'
    limit: '230kB'
  },
  {
    name: 'All CSS',
    path: 'dist/**/index-*.css',
    limit: '27kB',
  },
  {
    name: 'Vendor JS',
    path: 'dist/**/vendor-*.js',
    limit: '250kB'
  }
]
