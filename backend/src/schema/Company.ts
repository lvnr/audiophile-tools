
import { objectType } from 'nexus'

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.website()
  },
})
