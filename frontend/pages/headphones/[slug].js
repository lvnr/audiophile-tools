import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'
import Review from '../../components/Review'
import Link from 'next/link'
import { Icon } from 'react-icons-kit'
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft'
import { externalLink } from 'react-icons-kit/feather/externalLink'
import { amazon } from 'react-icons-kit/icomoon/amazon'
import { headphones as headphonesIcon } from 'react-icons-kit/feather/headphones'
import { extendHeadphone, toFixed1 } from '../../lib/utils'
import ReviewAverages from '../../components/ReviewAverages'
import isDevelopment from '../../lib/isDevelopment'

const QUERY = gql`
  query getHeadphone($slug: String!) {
    headphone(where: { slug: $slug }) {
      id
      model
      slug
      url
      amazonUrl
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
        takeaways
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

const Headphone = () => {
  const router = useRouter()
  const { slug } = router.query
  const { loading, error, data } = useQuery(QUERY, { variables: { slug } })
  const [highlightCriteria, setHighlightCriteria] = useState({})

  if (loading || error) return (
    <section className='tc mt-100'>
      {error && <div className='error-message'>Oops! something went wrong...</div>}
      <div className='title long shimmer' />
      <div className='title shimmer' />
      <div className='photo-placeholder shimmer'>
        <Icon icon={headphonesIcon} size={256} />
      </div>
      <div className='blocks'>
        <div className='shimmer' />
        <div className='shimmer' />
        <div className='shimmer' />
        <div className='shimmer' />
      </div>

      <style jsx>{`
        .error-message {
          font-size: 16px;
          color: red;
        }
        
        .title {
          width: 250px;
          height: 30px;
          border-radius: 8px;
          margin: 40px auto;
          display: block;
        }
        
        .title.long {
          width: 300px;
        }
        
        .photo-placeholder {
          width: 350px;
          padding: 50px;
          color: #eee;
          border-radius: 20px;
          margin: 80px auto;
        }
        
        .blocks {
          display: flex;
          justify-content: space-evenly;
        }
        
        .blocks > div {
          width: 100px;
          height: 100px;
          border-radius: 8px;
        }
      `}</style>
    </section>
  )

  const headphone = extendHeadphone(data.headphone, {})

  isDevelopment() && console.log(headphone)

  const imageStyle = {
    backgroundImage: `url("${headphone.images[0] || ''}")`
  }

  const criteriaExtended = {
    reviewer: {label: 'Reviewed by'},
    url: {label: 'Review Link'},
    takeaways: {label: 'Key Takeaways'},
    build: {label: 'Build'},
    comfort: {label: 'Comfort'},
    midrange: {label: 'Midrange'},
    treble: {label: 'Treble'},
    trebleExtension: {label: 'Treble Extension'},
    bassQty: {label: 'Bass (Quantity)'},
    bassClarity: {label: 'Bass (Clarity)'},
    bassImpact: {label: 'Bass (Impact)'},
    bassExtension: {label: 'Bass (Extension)'},
    bassTightness: {label: 'Bass (Tightness)'},
    priceVsPerf: {label: 'Price vs Performance'},
    aesthetics: {label: 'Aesthetics'},
    soundstage: {label: 'Soundstage'},
    imaging: {label: 'Imaging'},
    balanced: {label: 'Balance'},
    smoothess: {label: 'Smoothness'},
    naturalness: {label: 'Naturalness'},
    transparency: {label: 'Transparency'},
    forwardness: {label: 'Forwardness'},
    detail: {label: 'Detail Retrieval'},
    microDetail: {label: 'Micro-detail / Texture'},
    distortion: {label: 'Distortion'},
    warmth: {label: 'Warmth'},
    brigthness: {label: 'Brightness'},
    sibilance: {label: 'Sibilance'},
    speed: {label: 'Speed'},
    dynamics: {label: 'Dynamics'},
    matchability: {label: 'Matchability'},
    analytical: {label: 'Analytical Character'},
    isolation: {label: 'Isolation'},
    leakage: {label: 'Leakage'},
  }

  return (
    <div>
      <Head>
        <title>{headphone.company.name} {headphone.model} – Audiophile Tools</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://use.typekit.net/klz3bvo.css" />
      </Head>

      <main>
        <section>
        </section>

        <section className='tc mb-100'>
          <div className='heading'>
            <Link href='/headphones'>
              <a className='back-icon'>
                <Icon icon={arrowLeft} size={48} />
              </a>
            </Link>
            <div className='titles'>
              <h1>{headphone.model}</h1>
              <h2>{headphone.company.name}</h2>
            </div>
          </div>

          <div className='photo'>
            <div style={imageStyle} />
          </div>
          <div className="detail">
            <div className="metric-body">
              <div className="metric">
                <div className="value">{headphone.reviews.length || '–'}</div>
                <span className="label">Reviews</span>
              </div>

              <div className="metric">
                <div className="value">{toFixed1(headphone.SQ) || '–'}</div>
                <span className="label">Sound Quality</span>
              </div>

              <div className="metric">
                <div className="value">{toFixed1(headphone.meanRatings.comfort || '–')}</div>
                <span className="label">Comfort</span>
              </div>

              <div className="metric">
                <div className="value">{toFixed1(headphone.meanRatings.priceVsPerf || '–')}</div>
                <span className="label">Value</span>
              </div>

              <div className="metric">
                <div className="value">
                  <span>$</span>
                  {headphone.price}
                </div>
                <span className="label">price</span>
              </div>

            </div>
          </div>
        </section>

        <section className='links tc mb-100'>
          {headphone.url && (
            <Link href={headphone.url} prefetch={false}>
              <a className='product-link' target='_blank'>
                <Icon icon={headphonesIcon} size={48} />
                <span>Product page <Icon icon={externalLink} size={16} /></span>
              </a>
            </Link>
          )}

          {headphone.amazonUrl && (
            <Link href={headphone.amazonUrl} prefetch={false}>
              <a className='amazon-link' target='_blank'>
                <Icon icon={amazon} size={48} />
                <span>Check the price on Amazon <Icon icon={externalLink} size={16} /></span>
              </a>
            </Link>
          )}
        </section>

        {headphone.reviews.length > 0 && (
          <>
            <h3 className='tc'>Detailed opinions</h3>

            <section className='reviews mb-100'>
              <div className='labels dark'>
                {Object.entries(criteriaExtended).map(([key, { label }])=> !['url'].includes(key) && <div className={'label ' + key} key={key}>{label}</div>)}
              </div>
              <div className='table-layout'>
                <ReviewAverages headphone={headphone} criteria={criteriaExtended} hoverOnDot={setHighlightCriteria} />
                {headphone.reviews.map((review, i) => <Review key={i} review={review} criteria={criteriaExtended} highlightCriteria={highlightCriteria} />)}
                <span className='spacer' />
              </div>
            </section>
          </>
        )}
      </main>

      <style jsx>{`
        main {
          flex-direction: column;  
        }
        
        section.reviews {
          padding-left: 100px;
          position: relative;
        }
        
        section.links {
          display: flex;
          justify-content: space-evenly;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        
        h2 {
          font-size: 1.8rem;
          margin-top: 0;
          display: inline-block;
          color: #999;
          font-weight: 300;
          //background: -webkit-linear-gradient(0deg, rgba(40,100,255,1) 0%, rgba(255,15,15,1) 100%);
          //-webkit-background-clip: text;
          //-webkit-text-fill-color: transparent;
        }
        
        h3 {
          font-size: 2rem;
        }
        
        .heading {
          padding: 0 80px;
        }
        
        .back-icon {
          color: black;
          transition: color .3s ease;
          display: inline-block;
          padding-top: 25px;
          box-sizing: border-box;
          float: left;
          width: 0;
        }
        
        .back-icon:hover {
          color: #999;
        }

        .table-layout {
          display: flex;
          overflow: auto;
        }

        .labels {
          margin: 3px;
          border: 1px solid #efefef;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          width: 200px;
          position: absolute;
          box-shadow: 12px 0 20px 0 rgba(0, 0, 0, .05);
          left: 75px;
          background: white;
          background: linear-gradient(90deg,rgb(248, 248, 248) 0%,rgb(255, 255, 255) 80%);
          z-index: 9;
        }
        
        .labels.dark {
          background: #222;
          border-color: #222;
          color: white; 
          box-shadow: 14px 0 24px 0 rgba(0, 0, 0, .15);
        }
        
        .labels .label {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-transform: uppercase;
          border-bottom: 1px solid #efefef;
          padding: 10px 15px;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 1px;
          box-sizing: border-box;
        }
        
        .labels.dark .label {
          border-color: #333;
        }
        
        .labels .label:last-child {
          border: 0;
        }
        
        .labels .label.takeaways {
          height: 200px;
        }
          
        .spacer {
          min-width: 100px;
        }
        
        .photo {
          height: 400px;
          width: 400px;
          border: 0;
          display: block;
          margin: 50px auto;
        }
        
        .photo div {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }


        @media only screen and (max-width: 380px){
          .table-layout {
            display: flex;
            // overflow: auto;
            width: 250px;
          }
        }

        @media only screen and (max-width: 380px){
          .labels {
            position: absolute;
            left: 0px;
            width: 130px;
          }
        }

        @media only screen and (max-width: 960px){
          .back-icon {
            position: absolute;
            left: 10px;
          }
        }

        @media only screen and (max-width: 960px){
          h3 {
            // font-size: 100px;
            // // font-weight: 100;
          }
        }

        @media only screen and (max-width: 960px){
          .photo {
            width: 90%;
          }
        }
      `}</style>
    </div>
  )
}

export default Headphone
