import React from 'react'

const renderCriteria = (key, headphone, hoverOnDot) => {
  switch (key) {
    case 'takeaways': return ''

    case 'reviewer':
      return (
        <div>
          <h5>All reviews</h5>

          <style jsx>{`
            h5 {
              display: inline-block;
              flex: 1;
              text-align: center;
              margin: 0;
              line-height: 50px;
            }
          `}</style>
        </div>
      )

    default:
      if (typeof headphone.meanRatings[key] === 'number' && headphone.meanRatings[key] > 0)
        return (
          <div className='bar'>
            <div className='gradient' style={{ width: headphone.meanRatings[key] * 10 + '%' }} />
            {headphone.reviews.map((r, i) => r[key] && (
              <div
                key={i}
                className='dot-criteria'
                style={{ left: r[key] * 10 + '%' }}
                onMouseEnter={() => hoverOnDot({ reviewId: r.id, criteria: key })}
                onMouseLeave={() => hoverOnDot({})}
              />
            ))}

            <style jsx>{`
              .bar {
                background: #efefef;
                border-radius: 5px;
                width: 370px;
                height: 10px;
                position: relative;
              }
              
              .gradient {
                position: absolute;
                height: 10px;
                background: linear-gradient(90deg, rgba(40,100,255,1) 0%, rgba(255,15,15,1) 100%);
                background-size: 370px;
                border-radius: 5px;
              }
              
              .dot-criteria {
                position: absolute;
                height: 10px;
                width: 10px;
                margin-left: -10px;
                border-radius: 5px;
                background: #ffda4a;
                top: 15px;
                transition: background .3s ease;
                cursor: pointer;
              }
              
              .dot-criteria:hover {
                background: #000;
              }
            `}</style>
          </div>
        )
      else
        return <div>{headphone.meanRatings[key] || ''}</div>
  }
}

const ReviewAverages = ({ headphone, criteria, hoverOnDot }) => (

  <div className='review'>
    {Object.keys(criteria).map(key => !['url'].includes(key) && (
      <section key={key} className={'criteria ' + key}>
        {renderCriteria(key, headphone, hoverOnDot)}
      </section>
    ))}

    <style jsx>{`
      .review {
        flex: 1;
        min-width: 400px;
        max-width: 400px;
        margin: 3px;
        border: 1px solid #efefef;
        overflow: hidden;
      }
      
      .review:first-child {
        margin-left: 185px;
        border-color: #ffda4a;
        border-left-width: 6px;
        border-right-width: 6px;
      }
      
      .review:last-of-type {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      
      .criteria {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #efefef;
        padding: 10px 15px;
        box-sizing: border-box;
      }
      
      .criteria:first-child {
        font-size: 18px;
        letter-spacing: 0.7px;
        background-size: 300%;
        padding: 0;
        background: #ffda4a;
        text-transform: uppercase;
      }
      
      .criteria:last-child {
        border: 0;
      }
      
      .criteria.takeaways {
        height: 200px;
        align-items: flex-start;
      }
    `}</style>
  </div>
)

export default ReviewAverages
