const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const Author = require('./model/author')
const Book = require('./model/book')
const User8 = require('./model/user')

const resolvers = {
    Query: {
      bookCount: async () => await Book.collection.countDocuments,
      authorCount: async () => await Author.collection.countDocuments,
      me: (root, args, context) => {
        const user = context.currentUser

        console.log('user',user)

        return user
      },

      genres: async () => {
        const books = await Book.find({});
        const genres = books.flatMap(book => book.genres);
        return [...new Set(genres)];
      },

      allBooks: async (root, args) => {
        const query = {};

        // If an author filter is provided, find the author's ObjectId
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (author) {
            query.author = author._id;
          }
        }

        // If a genre filter is provided, use it in the query
        if (args.genre) {
          query.genres = { $in: [args.genre] };
        }

        // Find books that match the constructed query and populate the author field
        return await Book.find(query).populate('author');
      },


      allAuthors: async () => {
        const authors = await Author.find({});

        return authors.map(async (author) => {
          const bookCount = await Book.countDocuments({ author: author._id });
          return {
            name: author.name,
            born: author.born,
            bookCount,
          }
        })
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let author = await Author.findOne({ name: args.author });

        console.log('author', author)

        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        console.log('author', author)

        const book = new Book({ ...args, author: author._id });
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }

        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser;

        console.log(currentUser)
        if (!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }

        const author = await Author.findOne({ name: args.name });

        if (!author) return null;
        author.born = args.born;

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User8({ ...args })

        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User8.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, process.env.SECRET) }
      },
    }
  }

module.exports = resolvers
