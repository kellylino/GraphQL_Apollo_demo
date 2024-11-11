const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const http = require('http')

const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User8 = require('./model/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User8.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null;
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//       const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
//       const currentUser = await User8.findById(decodedToken.id);
//       return { currentUser };
//     }
//   }
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })


// allBooks: async (root, args) => {
//   if (!args.author && !args.genre) {
//     return await Book.find({});
//   }

//   return Book.filter(book => {
//     const authorMatches = args.author ? book.author === args.author : true;
//     const genreMatches = args.genre ? book.genres.includes(args.genre) : true;
//     return authorMatches && genreMatches;
//   });
// },