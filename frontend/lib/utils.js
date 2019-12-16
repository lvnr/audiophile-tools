import { mean } from 'simple-statistics'

export const toFixed1 = (num) => {
  if (typeof num === 'number') {
    num = num.toFixed(1)
  }

  return typeof num === 'string' && num.substring(num.length - 2, num.length) === '.0'
    ? num.substring(0, num.length - 2)
    : num
}

export const extendHeadphone = (headphone, soundPreferences) => {
  const aggregatedRatings = {}
  const meanRatings = {}
  const SQweights = {
    midrange:     .17,
    treble:       .12,
    naturalness:  .07,
    distortion:   .04,
    imaging:      .11,
    soundstage:   .11,
    dynamics:     .08,
    speed:        .07,
    detail:       .07,
    bassQty:      .04,
    bassClarity:  .04,
    bassExtension:.04,
    bassImpact:   .04,
  }

  if (headphone.reviews)
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

  const SQ = Object.values(meanRatings).length > 0 ? Object.entries(SQweights).reduce(SQreducer, 0) : '–'

  let matchedOnFields = []

  const matchReducer = (accumulator, [field, value]) => {
    const MAX_DELTA = 9
    const delta = 100 - (Math.abs(meanRatings[field] - value) / MAX_DELTA * 100)

    if (value > 0 && delta >= 0) {
      matchedOnFields.push(field)
      return accumulator + delta
    }

    return accumulator
  }

  const match = Object.entries(soundPreferences).reduce(matchReducer, 0) / matchedOnFields.length
  
  return {
    ...headphone,
    SQ,
    meanRatings,
    match,
    matchedOnFields,
  }
}