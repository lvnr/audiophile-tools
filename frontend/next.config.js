// next.config.js
const withCss = require('@zeit/next-Css')
module.exports = withCss({
  cssLoaderOptions: {
    url: false
  }
})