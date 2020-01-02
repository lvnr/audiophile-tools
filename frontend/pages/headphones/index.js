import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'

import store from 'store'
import Header from '../../components/header'
import Picker from '../../components/picker'
import Headphone from '../../components/headphone'
import Shimmer from '../../components/Schimmer'
import '../app.css'
import './footer.css'
// import Select from './select'
import { extendHeadphone } from '../../lib/utils'
import isDevelopment from '../../lib/isDevelopment'
import { object } from 'prop-types'
import Link from 'next/link'


/*
  There are no perfect product, but there are perfect matches...
  Tell us what you love and we'll tell you what to buy.

  The most informed way to buy...

  Your shortcut to educated buys.
*/

const QUERY = gql`
  {
    headphones {
      id
      model
      slug
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
#      company {
#        name
#      }
#      reviews {
#        id
#        reviewer
#        url
#        credibility
#        trebleExtension
#        priceVsPerf
#        aesthetics
#        soundstage
#        imaging
#        balanced
#        bassQty
#        bassClarity
#        bassImpact
#        bassExtension
#        bassTightness
#        midrange
#        treble
#        smoothess
#        naturalness
#        detail
#        distortion
#        microDetail
#        warmth
#        sibilance
#        speed
#        nonFatiguing
#        noBrainer
#        dynamics
#        brigthness
#        matchability
#        analytical
#        sourceForgiving
#        isolation
#        leakage
#        transparency
#        forwardness
#        build
#        comfort
#      }
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(QUERY)

  const initialState = {
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
  }

  const savedSoundPreferences = store.get('soundPreferences')
  
  const [soundPreferences, setSoundPreferences] = useState(savedSoundPreferences !== undefined ? savedSoundPreferences : initialState)

 
  const [filteringAndSorting, setFilteringAndSorting] = useState({
      priceRange: [0, 5000],
      weightRange: [0, 1000],
      sortBy: { value: 'match', label: 'Match'},
      category: [{ value: 'all', label: 'All' }],
      enclosure: [{ value: 'all', label: 'All' }],
      driver: [{ value: 'all', label: 'All' }],
      sortOrder: 'dsc',
    })

  let headphones
  let filteredHeadphones
  let filteredAndSortedHeadphones = []

  if (!error && !loading) {
    isDevelopment() && console.time('calculating headphone stats')
    headphones = data.headphones.map((h) => extendHeadphone(h, soundPreferences))
    isDevelopment() && console.timeEnd('calculating headphone stats')

    isDevelopment() && console.log(headphones);
    
    filteredHeadphones = headphones.filter((headphone) => {
      const { priceRange, weightRange, category, enclosure, driver } = filteringAndSorting
      const categoryFilters = category.map((e) => e.value)
      const enclosureFilters = enclosure.map((e) => e.value)
      const driverFilters = driver.map((e) => e.value)

      if ((headphone.price > priceRange[0] && headphone.price < priceRange[1])
          && (headphone.weight > weightRange[0] && headphone.weight < weightRange[1])
          && (categoryFilters.includes(headphone.category) || categoryFilters[0] === 'all')
          && (enclosureFilters.includes(headphone.enclosure) || enclosureFilters[0] === 'all')
          && (driverFilters.includes(headphone.driverType) || driverFilters[0] === 'all'))
        return true
      return false
    })

    // const filteredHeadphonesWeight = headphones.filter((headphone) => {
    //   if (headphone.weight > weight.weightRange[0] && headphone.weight < weight.weightRange[1]) 
    //     return true
    //   return false
    // })

    filteredAndSortedHeadphones = filteredHeadphones.sort((a, b) => {
      const { sortBy } = filteringAndSorting

      if (filteringAndSorting.sortOrder === 'asc')
        return a[sortBy.value] - b[sortBy.value]
      if (filteringAndSorting.sortOrder === 'dsc')
        return b[sortBy.value] - a[sortBy.value]
    })
  }

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
          initialState={initialState}
        />

        <div className='results'>
          <div className='results-header'>
            <h6>RESULTS</h6>
          </div>

          {loading
            ? [1,2,3].map((i) => <Shimmer key={i} />)
            : filteredAndSortedHeadphones.map((headphone, i) => <Headphone key={i} headphone={headphone} />)}

          {error && <div>Oops! Something went wrong...</div>}
        </div>

        <div className='footer-container'> 
          <footer>
                <div className='cr'> &copy; Arakelyan Audio  2019</div>
                {/* <Link to="/"> */}
                  <a href="/about"> about </a>
                {/* </Link> */}
            </footer>
        </div>
  
      </main>
      
    </div>
  )
}
