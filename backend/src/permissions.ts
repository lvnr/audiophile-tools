import { rule, shield, and, or, not } from 'graphql-shield'


// Rules

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.claims !== null
})

const deleteOneHeadphone = rule()(async (parent, args, ctx, info) => {
  return ctx.claims === 'delete-headphones'
})

// Permissions

const permissions = shield({
  Mutation: {
    deleteOneHeadphone: and(isAuthenticated, deleteOneHeadphone)
  }
})

export default permissions
