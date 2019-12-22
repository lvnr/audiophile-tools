import React from 'react'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'

import './headphone.css'
import { toFixed1 } from '../lib/utils'

const Headphone = ({ headphone }) => {
  const imageStyle = {
    backgroundImage: `url("${headphone.images[0] || ''}")`
  }

  return (
    <div className="product">
      
      <div className="photo">
        <div style={imageStyle} />
      </div>

      <div className="detail">

      {/* <p data-tip="hello world">Tooltip</p>
      <ReactTooltip /> */}

        <h5>
          <Link href="/headphones/[slug]" as={`/headphones/${headphone.slug}`}>
            <a>{headphone.model}</a>
          </Link>
          {headphone.company && <>&nbsp; by {headphone.company.name}</>}
        </h5>

        <div className="metric-body">

          <div className="metric match">
            <div className="value match">
               {headphone.match ? Math.round(headphone.match) : '–'}
              <span>{headphone.match ? '%' : ''}</span>
            </div>

            <div className='label-icon'>
              <div>
                <span className="label">Match</span>
              </div>

              <div className='dot'>
                <span className='icon tooltip bottom'>?</span>
              </div>
            </div>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(headphone.SQ) || '–'}</div>
            <span className="label">SQ</span>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(headphone.meanRatings.comfort || '–')}</div>
            <span className="label">Comfort</span>
          </div>

          <div className="metric">
            <div className="value">{toFixed1(headphone.meanRatings.priceVsPerf || '–')}</div>
            <span className="label">Value</span>
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
