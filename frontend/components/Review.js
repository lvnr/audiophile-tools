import React from 'react'
import Link from 'next/link'
import { Icon } from 'react-icons-kit'
import { externalLink } from 'react-icons-kit/feather/externalLink'

const URL = url => (
  <Link href={url} as={url} prefetch={false}>
    <a target='_blank'>
      <Icon icon={externalLink} size={24} />

      <style jsx>{`
      a {
        background: #efefef;
        color: black;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
    </a>
  </Link>
)

const renderCriteria = (key, review) => {
  switch (key) {
    case 'url': return '';

    case 'reviewer':
      return (
        <div>
          <h5>{review.reviewer}</h5>
          {URL(review.url)}

          <style jsx>{`
            div {
              width: 100%;
              display: flex;
              justify-content: space-between; 
            }
            
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

    case 'takeaways':
      return (
        <div>
          {review.takeaways.map((t, i) => <div key={i} className='takeaway-tag'>{t}</div>)}

          <style jsx>{`
            .takeaway-tag {
              font-size: 14px;
              font-weight: 300;
              line-height: 16px;
              padding: 6px 8px;
              border-radius: 6px;
              margin-bottom: 8px;
              background: black;
              color: white;
            }
          `}</style>
        </div>
      )

    default:
      if (typeof review[key] === 'number' && review[key] > 0)
        return (
          <div className='bar'>
            <div className='gradient' style={{ width: review[key] * 10 + '%' }} />

            <style jsx>{`
              .bar {
                background: #efefef;
                border-radius: 5px;
                width: 270px;
                height: 10px;
                position: relative;
              }
              
              .gradient {
                position: absolute;
                height: 10px;
                background: linear-gradient(90deg, rgba(40,100,255,1) 0%, rgba(255,15,15,1) 100%);
                background-size: 270px;
                border-radius: 5px;
              }
            `}</style>
          </div>
        )
      else
        return <div>{review[key] || ''}</div>
  }
}

const Review = ({ review, criteria, highlightCriteria }) => (
  <div className='review'>
    {Object.keys(criteria).map(key => !['url'].includes(key) && (
      <section key={key} className={'criteria ' + key + (highlightCriteria.reviewId === review.id && highlightCriteria.criteria === key ? ' highlight' : '')}>
        {renderCriteria(key, review)}
      </section>
    ))}

    <style jsx>{`
      .review {
        flex: 1;
        min-width: 300px;
        max-width: 300px;
        margin: 3px;
        border: 1px solid #efefef;
        overflow: hidden;
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
        transition: all .3s ease;
      }
      
      .criteria:first-child {
         //background: linear-gradient(5deg,rgba(40,100,255,1) 0%,rgba(255,15,15,1) 100%);
         //color: white;
        font-size: 18px;
        letter-spacing: 0.7px;
        background-size: 300%;
        padding: 0;
      }
      
      .criteria:last-child {
        border: 0;
      }
      
      .criteria.takeaways {
        height: 200px;
        align-items: flex-start;
      }
      
      .criteria.highlight {
        background-color: #ffda4a;
      }
    `}</style>
  </div>
)

export default Review