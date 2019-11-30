import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'

import Header from '../../components/header'
import Picker from '../../components/picker'
import Headphone from '../../components/headphone'
import '../app.css'
// import Select from './select'


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

  const [filteringAndSorting, setFilteringAndSorting] = useState({
    priceRange: [0, 5000],
    sortBy: { value: 'price', label: 'Price' },
    sortOrder: true,
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.headphones);

  const filteredHeadphones = data.headphones.filter((headphone) => {
    if (headphone.price > filteringAndSorting.priceRange[0] && headphone.price < filteringAndSorting.priceRange[1]) 
      return true
    return false
  })

  const filteredAndSortedHeadphones = data.headphones.sort((a, b) => {
    const { sortBy } = filteringAndSorting

    if (filteringAndSorting.sortOrder === true)
      return a[sortBy.value] - b[sortBy.value]
    if (filteringAndSorting.sortOrder === false)
      return b[sortBy.value] - a[sortBy.value]
  })

  return (
    <div>
      <Head>
        <title>Audiophile Tools</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://use.typekit.net/klz3bvo.css" />
      </Head>

      <Header />

      <main>
        <Picker
          filteringAndSorting={filteringAndSorting}
          setFilteringAndSorting={setFilteringAndSorting}
        />

        <div className='results'>
          <div className='results-header'>
            <h6>RESULTS</h6>
          </div>

          {filteredAndSortedHeadphones.map((headphone, i) => <Headphone key={i} headphone={headphone} />)}

        </div>
      </main>
      
    </div>
  )
}
