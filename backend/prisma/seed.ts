import { Photon } from '@prisma/photon'

main()

async function main() {
  const photon = new Photon()

  // const user1 = await photon.users.create({
  //   data: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Watch the talks from Prisma Day 2019',
  //         content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
  //         published: true,
  //       },
  //     },
  //   },
  // })
  // const user2 = await photon.users.create({
  //   data: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Subscribe to GraphQL Weekly for community news',
  //           content: 'https://graphqlweekly.com/',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma/',
  //           published: false,
  //         },
  //       ],
  //     },
  //   },
  // })

  const headphone1 = await photon.headphones.create({
    data: {
      model: 'Empyrean',
      url: 'https://mezeaudio.com/products/meze-empyrean',
      company: {
        connect: {
          name: 'Meze Audio'
        }
      }
    }
  })

  console.log({ headphone1 })

  await photon.disconnect()
}
