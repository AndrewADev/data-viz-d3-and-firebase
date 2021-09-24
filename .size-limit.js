
module.exports = [
  {
    name: 'App JS',
    path: 'dist/**/app.*.js',
    limit: '13kB'
  },
  {
    name: 'App CSS',
    path: 'dist/**/app.*.css',
    limit: '1.1kB',
    // prevent injection of style-loader runtime, see last part of:
    // https://github.com/ai/size-limit#config
    webpack: false
  },
  {
    name: 'Vendor CSS',
    path: 'dist/**/*-vendors.*.css',
    limit: '43kB',
    // prevent injection of style-loader runtime, see last part of:
    // https://github.com/ai/size-limit#config
    webpack: false
  },
  {
    name: 'Vendor JS',
    path: 'dist/**/*-vendors.*.js',
    limit: '362kB'
  }
]
