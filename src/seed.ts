import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {

  await prisma.user.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.course.deleteMany({})

  // const grace = await prisma.user.create({
  //   data: {
  //     email: "grace@hey.com",
  //     firstName: "Grace",
  //     lastName: "Bell",
  //     social: {
  //       facebook: "gracebell",
  //       twitter: "gracebell"
  //     }
  //   }
  // })

  // console.log(grace);

  // const weekFromNow = add(new Date(), {days: 7})
  // const twoWeeksFromNow = add(new Date(), {days: 14})
  // const monthFromNow = add(new Date(), {days: 28})

  // const course = await prisma.course.create({
  //   data:{
  //     name: "CRUD with prisma real world",
  //     courseDetails: "An soft ontroduction to CRUD with prisma real world",
  //     tests: {
  //       create: [
  //         {
  //           date: weekFromNow,
  //           name: "First test"
  //         },
  //         {
  //           date: twoWeeksFromNow,
  //           name: "Second test"
  //         },
  //         {
  //           date: monthFromNow,
  //           name: "Third test"
  //         }
  //       ]
  //     },
  //     members: {
  //       create: {
  //         role: "TEACHER",
  //         user: {
  //           connect: { email: grace.email }
  //         }
  //       }
  //     }
  //   },
  //   include: {
  //     tests: true,
  //     members: {
  //       include: {user: true}
  //     }
  //   }
  // })

  // console.log(course)

}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.disconnect()
  })
