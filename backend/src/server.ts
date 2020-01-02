import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'
import { createContext } from './context'
import * as jwt from 'jsonwebtoken'
import permissions from './permissions'
// import { AuthenticationError } from 'apollo-server-core'

// Auth

function getClaims(req: any) {
  let token: any
  try {
    token = jwt.verify(req.request.get('Authorization'), 'secret')
  } catch (e) {
    return null
    return new AuthenticationError('Not authorised')
  }
  return token.claims
}

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: req => ({
    ...req,
    ...createContext(),
    claims: getClaims(req)
  })
})

server.start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#5-using-the-graphql-api`,
  ),
)
