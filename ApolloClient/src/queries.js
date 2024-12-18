import { gql } from '@apollo/client'

export const query = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const GENRES = gql`
  query {
    genres
  }
`

export const ME = gql`
  query {
    me {
      username,
      genre
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ){
    title
    author {
      name
    }
    published
    genres
    }
}`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor (
    name: $name,
    born: $born,
  ){
    name
    born
    }
}`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
