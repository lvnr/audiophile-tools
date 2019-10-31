// next.config.js
const withCss = require('@zeit/next-css')
module.exports = withCss({
  cssLoaderOptions: {
    url: false
  }
})