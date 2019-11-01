import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'

import Header from '../../components/header'
import Picker from '../../components/picker'
import Headphone from '../../components/headphone'
import '../app.css'

const QUERY = gql`
  {
    headphones {
      id
      model
      price
      images
      company {
        name
      }
      reviews {
        id
        reviewer
        url
        credibility
        trebleExtension
        priceVsPerf
        aesthetics
        soundstage
        imaging
        balanced
        bassQty
        bassClarity
        bassImpact
        bassExtension
        bassTightness
        midrange
        treble
        smoothess
        naturalness
        detail
        distortion
        microDetail
        warmth
        sibilance
        speed
        nonFatiguing
        noBrainer
        dynamics
        brigthness
        matchability
        analytical
        sourceForgiving
        isolation
        leakage
        transparency
        forwardness
        build
        comfort
      }
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.headphones);

  return (
    <div>
      <Head>
        <title>Audiophile Tools</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://use.typekit.net/klz3bvo.css" />
      </Head>

      <Header />

      <main>
        <Picker />

        <div className='results'>
          <div className='results-header'>
            <h6>RESULTS</h6>
          </div>

          {data.headphones.map((headphone, i) => <Headphone key={i} headphone={headphone} />)}
        </div>
      </main>

      <style jsx>{`
        main {
          width: 1200px;
          display: flex;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
