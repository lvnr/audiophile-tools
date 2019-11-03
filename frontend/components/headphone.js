import React from 'react'
import { mean } from 'simple-statistics'

import './headphone.css'

const toFixed1 = (num) => {
  if (typeof num === 'number') {
    num = num.toFixed(1)
  }

  return typeof num === 'string' && num.substring(num.length - 2, num.length) === '.0'
    ? num.substring(0, num.length - 2)
    : num
}

const Headphone = ({ headphone }) => {
  const imageStyle = {
    backgroundImage: `url("${headphone.images[0] || ''}")`
  }

  const aggregatedRatings = {}
  const meanRatings = {}
  const SQweights = {
    midrange:     .15,
    treble:       .10,
    naturalness:  .07,
    distortion:   .04,
    imaging:      .11,
    soundstage:   .11,
    dynamics:     .08,
    speed:        .07,
    detail:       .07,
    bassQty:      .05,
    bassClarity:  .05,
    bassExtension:.05,
    bassImpact:   .05,
  }

  headphone.reviews.map(review => {
    Object.entries(review).map(([field, value]) => {
      if (field && value && typeof value === 'number') {
        if (aggregatedRatings[field] !== undefined)
          aggregatedRatings[field].push(value)
        else
          aggregatedRatings[field] = [value]
      }
    })
  })

  Object.entries(aggregatedRatings).map(([field, ratings]) => meanRatings[field] = mean(ratings))

  const SQreducer = (accumulator, [field, weight]) => {
    const mean = meanRatings[field]

    if (mean) {
      return accumulator + (mean * weight)
    }

    return accumulator + (meanRatings.priceVsPerf || 5) * weight
  }

  const SQ = Object.entries(SQweights).reduce(SQreducer, 0)

  return (
    <div className="product">
      
      <div className="photo">
        <div style={imageStyle} />
      </div>

      <div className="detail">

        <h5>
          {headphone.model} by {headphone.company.name}
        </h5>

        <div className="metric-body">

          <div className="metric match">
            <div className="value match">
               {0}
              <span>%</span>
            </div>

            <div className='label-icon'>
              <div>
                <span className="label">match</span>
              </div>

              <div className='dot'>
                <span className='icon tooltip bottom'>?</span>
              </div>
            </div>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(SQ) || '–'}</div>
            <span className="label">SQ</span>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(meanRatings.comfort || '–')}</div>
            <span className="label">comfort</span>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(meanRatings.priceVsPerf || '–')}</div>
            <span className="label">price vs perf.</span>
          </div>

          <div className="metric price">
            <div className="value">
              <span>$</span>
              {headphone.price}
            </div>
            <span className="label">price</span>
          </div>

        </div>

      </div>

      <style jsx>{`
        .photo div {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>
    </div>
  );
}

export default Headphone