import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, stringArg } from 'nexus'
import {
  HeadphoneDriverType,
  HeadphoneDriverMaterial,
  HeadphoneEarpadMaterial,
  HeadphoneCableTerm,
  HeadphoneEnclosure,
  HeadphoneCategory,
} from '@generated/photon'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
  },
})

const Company = objectType({
  name: 'Company',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.website()
  },
})

const HeadphoneReview = objectType({
  name: 'HeadphoneReview',
  definition(t) {
    t.model.id()
    t.model.reviewer()
    t.model.url()
    t.model.headphone()
  },
})

const Headphone = objectType({
  name: 'Headphone',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.model()
    t.model.company({ type: 'Company' })
    t.model.url()
    t.model.amazonUrl()
    t.model.category()
    t.model.enclosure()
    t.model.freqRespFrom()
    t.model.freqRespTo()
    t.model.driverDesc()
    t.model.driverMaterial()
    t.model.driverQty()
    t.model.driverSize()
    t.model.driverType()
    t.model.price()
    t.model.weigth()
    t.model.impedance()
    t.model.sensitivity()
    t.model.THD90()
    t.model.THD100()
    t.model.wireless()
    t.model.DSP()
    t.model.cableQty()
    t.model.cableLength()
    t.model.cableBalanced()
    t.model.cableRemovable()
    t.model.cableTermEar()
    t.model.cableTermAmp()
    t.model.earpadQty()
    t.model.earpadMaterial()
    t.model.carryingCase()
    t.model.tunability()
    t.model.portability()
    t.model.serviceability()
    t.model.reviews({
      type: 'HeadphoneReview',
      pagination: false,
    })
  },
})

const Query = objectType({
  name: 'Query',
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

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    // t.crud.deleteOneHeadphone()

    t.field('createHeadphone', {
      type: 'Headphone',
      args: {
        model: stringArg({ nullable: false }),
        companyName: stringArg({ nullable: false }),
      },
      resolve: (_, { model, companyName }, ctx) => {
        return ctx.photon.headphones.create({
          data: {
            model,
            company: {
              connect: { name: companyName },
            },
          },
        })
      },
    })

    t.crud.createOneHeadphoneReview({ alias: 'createHeadphoneReview' })

    t.field('connectHeadphoneReview', {
      type: 'HeadphoneReview',
      args: {
        reviewId: idArg(),
        headphoneModel: stringArg({ nullable: false }),
      },
      resolve: (_, { reviewId, headphoneModel }, ctx) => {
        return ctx.photon.headphoneReviews.update({
          where: { id: reviewId },
          data: {
            headphone: {
              connect: { model: headphoneModel },
            }
          }
        })
      },
    })

    // t.field('createHeadphoneReview', {
    //   type: 'HeadphoneReview',
    //   args: {
    //     reviewer: stringArg({ nullable: false }),
    //     headphoneModel: stringArg({ nullable: false }),
    //   },
    //   resolve: (_, { reviewer, headphoneModel }, ctx) => {
    //     return ctx.photon.headphones.create({
    //       data: {
    //         reviewer,
    //         headphone: {
    //           connect: { model: headphoneModel },
    //         },
    //       },
    //     })
    //   },
    // })

    // t.field('publish', {
    //   type: 'Post',
    //   nullable: true,
    //   args: {
    //     id: idArg(),
    //   },
    //   resolve: (_, { id }, ctx) => {
    //     return ctx.photon.posts.update({
    //       where: { id },
    //       data: { published: true },
    //     })
    //   },
    // })
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Headphone,
    User,
    Company,
    HeadphoneReview,
    HeadphoneDriverType,
    HeadphoneEnclosure,
    HeadphoneDriverMaterial,
    HeadphoneCableTerm,
    HeadphoneEarpadMaterial,
    HeadphoneCategory,
  ],
  plugins: [nexusPrismaPlugin()],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
