module.exports = {
  trackBranches: [
    'main'
  ],
  files: [
    {
      path: 'dist/**/app.*.js',
      maxSize: '50kB'
    },
    {
      path: 'dist/**/app.*.css',
      maxSize: '200kB'
    },
    {
      path: 'dist/**/*-vendors.*.css',
      maxSize: '50kB'
    },
    {
      path: 'dist/**/*-vendors.*.js',
      maxSize: '390kB'
    }
  ]
}
