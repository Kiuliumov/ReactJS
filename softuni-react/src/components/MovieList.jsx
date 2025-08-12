function MovieList(props) {
  return (
    <>
      <h3>Movie list:</h3>
      <ul>
        {props.movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </>
  );
}

export default MovieList;