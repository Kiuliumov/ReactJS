import MovieListItem from "./MovieListItem";

function MovieList(props) {
  return (
    <>
      <h3>Movie list:</h3>
      <ul>
        {props.movies.map((movie, index) => (
          <MovieListItem key={index} movie={movie} />
        ))}
      </ul>
    </>
  );
}

export default MovieList;