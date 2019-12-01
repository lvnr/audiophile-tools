import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'

import Header from '../../components/header'
import Picker from '../../components/picker'
import Headphone from '../../components/headphone'
import '../app.css'
// import Select from './select'
import { extendHeadphone } from '../../lib/utils'

/*
  There are no perfect product, but there are perfect matches...
  Tell us what you love and we'll tell you what to buy.
*/

const QUERY = gql`
  {
    headphones {
      id
      model
      price
      images
      category
      enclosure
      driverType
      weight
      impedance
      sensitivity
      wireless
      tunability
      portability
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

  const [soundPreferences, setSoundPreferences] = useState({
    soundstage: 0,
    aesthetics: 0,
    balance: 0,    
    imaging: 0, 
    bassPower: 0,  
    bassClarity: 0, 
    bassSpeed: 0,  
    bassExtension: 0,
    midrange: 0,  
    treble: 0,     
    distortion: 0, 
    dynamics: 0,   
    detail: 0,     
    texture: 0,    
    naturalness: 0,
    smoothess: 0, 
    forwardness: 0,
    speed: 0,      
    warmth: 0,    
    brightness: 0, 
    sibilance: 0,
  })

  const [filteringAndSorting, setFilteringAndSorting] = useState({
    priceRange: [0, 5000],
    sortBy: { value: 'match', label: 'Match' },
    sortOrder: 'dsc',
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.time('calculating headphone stats')
  const headphones = data.headphones.map((h) => extendHeadphone(h, soundPreferences))
  console.timeEnd('calculating headphone stats')

  console.log(headphones);
  
  const filteredHeadphones = headphones.filter((headphone) => {
    if (headphone.price > filteringAndSorting.priceRange[0] && headphone.price < filteringAndSorting.priceRange[1]) 
      return true
    return false
  })

  const filteredAndSortedHeadphones = filteredHeadphones.sort((a, b) => {
    const { sortBy } = filteringAndSorting

    if (filteringAndSorting.sortOrder === 'asc')
      return a[sortBy.value] - b[sortBy.value]
    if (filteringAndSorting.sortOrder === 'dsc')
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
          soundPreferences={soundPreferences}
          setSoundPreferences={setSoundPreferences}
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
