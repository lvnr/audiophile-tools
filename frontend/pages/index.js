import React from 'react'
import Router from 'next/router'

const Home = () => (
  <div> </div>
)

Home.getInitialProps = (ctx) => {
  if (ctx && ctx.req) {
    ctx.res.writeHead(302, {Location: `/headphones`})
    ctx.res.end()
  } else {
    Router.push(`/headphones`)
  }
}

export default Home
