
module.exports = [
  {
    path: 'dist/**/app.*.js',
    limit: '13kB'
  },
  {
    path: 'dist/**/app.*.css',
    limit: '235kB',
    // prevent injection of style-loader runtime, see last part of:
    // https://github.com/ai/size-limit#config
    webpack: false
  },
  {
    path: 'dist/**/*-vendors.*.css',
    limit: '43kB',
    // prevent injection of style-loader runtime, see last part of:
    // https://github.com/ai/size-limit#config
    webpack: false
  },
  {
    path: 'dist/**/*-vendors.*.js',
    limit: '492kB'
  }
]
