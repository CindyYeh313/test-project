module.exports = {
  purge: {
    enabled: process.env.BUILD === 'true',
    content: [ './src/**/*.vue' ]
  }
}