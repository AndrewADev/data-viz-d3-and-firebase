module.exports = {
  files: [
    {
      path: 'dist/**/*.js',
      maxSize: '200kB'
    },
    {
      path: 'dist/**/*.css',
      maxSize: '200kB'
    },
    {
      path: 'dist/**/*-vendors.*.js',
      maxSize: '390kB'
    }
  ]
}
