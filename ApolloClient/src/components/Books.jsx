import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useState, useEffect } from 'react'
import Genres from './Genres';

const Books = () => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);
  const [genre, setGenre] = useState(null)
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre }
  });

  useEffect(() => {
    if (meData && meData.me) {
      setGenre(meData.me.genre);
    }
  }, [meData]);

  if (booksLoading || meLoading) return <p>Loading...</p>;
  if (booksError) return <p>Error: {booksError.message}</p>;
  if (meError) return <p>Error: {meError.message}</p>;

  const books = booksData.allBooks;

  console.log(genre)

  return (
    <div>
      <h2>books</h2>
      {localStorage.getItem('user-token')
        ? <h3>Books in your favorite genre: {meData.me.genre}</h3>
        : <h3>Filter by genre: {genre} </h3>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {localStorage.getItem('user-token') && <Genres setGenre={setGenre} />}
    </div>
  )
}

export default Books
