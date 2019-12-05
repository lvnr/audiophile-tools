import { objectType } from 'nexus'

export const Headphone = objectType({
  name: 'Headphone',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.model()
    t.model.images()
    t.model.company({ type: 'Company' })
    t.model.url()
    t.model.slug()
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
    t.model.weight()
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