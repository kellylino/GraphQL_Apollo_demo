import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRES } from '../queries'

const Genres = ({setGenre}) => {
  const { loading, error, data } = useQuery(GENRES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const genres = data.genres;

  const changeGenre = () => {
    setGenre(null)
  }

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={changeGenre}>all genres</button>
    </div>
  )
}

export default Genres