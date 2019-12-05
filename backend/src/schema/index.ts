import * as Nexus from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as Query from './Query'
import * as Mutation from './Mutation'
import * as User from './User'
import * as Headphone from './Headphone'
import * as Company from './Company'
import * as HeadphoneReview from './HeadphoneReview'
import * as path from 'path'
import {
  HeadphoneDriverType,
  HeadphoneDriverMaterial,
  HeadphoneEarpadMaterial,
  HeadphoneCableTerm,
  HeadphoneEnclosure,
  HeadphoneCategory,
} from '@prisma/photon'

export default Nexus.makeSchema({
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
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
})