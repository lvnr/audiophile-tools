import React from 'react'
import { mean } from 'simple-statistics'

import './headphone.css'

const Headphone = ({ headphone }) => {
  const imageStyle = {
    backgroundImage: `url("${headphone.images[0] || ''}")`
  }

  const aggregatedRatings = {}
  const meanRatings = {}

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

  Object.entries(aggregatedRatings).map(([field, ratings]) => meanRatings[field] = mean(ratings).toFixed(1))

  console.log(meanRatings);

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
            <div className="value">0</div>
            <span className="label">sq</span>
          </div>

          <div className="metric">
            <div className="value">0</div>
            <span className="label">comfort</span>
          </div>

          <div className="metric">
            <div className="value">{meanRatings.priceVsPerf || '–'}</div>
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