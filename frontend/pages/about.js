import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/header'
import './app.css'
import Link from 'next/link'

const About = () => (
  <div>
    <Head>
      <title>Audiophile Tools</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel="stylesheet" href="https://use.typekit.net/klz3bvo.css" />
    </Head>

    <Header />

    <main className='mb-100'>
      <h1>About Audiophile Tools</h1>
      <section className='ph-80'>
        <p>
          For the last few years I've become increasingly interested in high fidelity audio and have spent arguably
          too much money on audio gear.
        </p>
        <p>
          I've created this website to hopefully help people like me find the best matching gear to their taste
          and to their budget in a fraction of the time that they would usually spend.
        </p>
      </section>
    </main>

    <footer>
      <div className='column'>
        <a href="/about"> About </a>
      </div>
      <div className='column'>
        <div className='cr'> &copy; Arakelyan Audio - 2020</div>
      </div>
    </footer>

  </div>
)

export default About