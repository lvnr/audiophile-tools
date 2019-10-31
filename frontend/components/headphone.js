import React from 'react'

import './headphone.css'

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
        <h5>
          {headphone.model} by {headphone.company.name}
        </h5>

        <div className="metric-body">
          <div className="metric">
            <div className="value">0%</div>
            <span className="label">match</span>
          </div>

          <div className="metric">
            <div className="value">0%</div>
            <span className="label">sq</span>
          </div>

          <div className="metric">
            <div className="value">0%</div>
            <span className="label">comfort</span>
          </div>

          <div className="metric">
            <div className="value">0%</div>
            <span className="label">price vs perf.</span>
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