const manifest = require('../public/manifest.json')

const appSlug = 'audiophile-tools'
const serverPort = process.env.PORT || 3000

const completeConfig = {

  default: {
    serverPort,
    appSlug,
    appName: manifest.name,
    appUrl: process.env.APP_URL || 'https://audiophile.tools/',
    appTagline: 'Best way to find your next audio stuff',
    appDescription: 'Basically let\'s you find the gear matching your sound taste',
    locale: 'en_US',
    googleAnalyticsId: 'UA-146770852-2',
    googleSiteVerification: false,
    graphqlUrl: process.env.GRAPHQL_URL || 'https://audiophile-tools-prisma.lyov.now.sh/'
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`,
    googleAnalyticsId: null
  },

  production: {
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}