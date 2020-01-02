import { queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.headphone()
    t.crud.headphones({ filtering: true })
    t.crud.headphoneReview()
    t.crud.headphoneReviews()
    t.crud.companies()

    // t.list.field('headphones', {
    //   type: 'Headphone',
    //   resolve: (_parent, _args, ctx) => {
    //     return ctx.photon.headphones.findMany()
    //   },
    // })

    t.list.field('headphonesWithReviewsAndCompany', {
      type: 'Headphone',
      resolve: (_parent, _args, ctx) => {
        return ctx.photon.headphones.findMany({
          include: {
            reviews: true,
            company: true,
          },
          where: {
            active: true,
          },
        })
      },
    })

    t.list.field('filterHeadphones', {
      type: 'Headphone',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.headphones.findMany({
          where: {
            OR: [
              { model: { contains: searchString } },
              // { contents: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})
