import { queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.headphone({ alias: 'headphone' })
    t.crud.headphoneReview()

    t.list.field('headphones', {
      type: 'Headphone',
      resolve: (_parent, _args, ctx) => {
        return ctx.photon.headphones.findMany()
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
