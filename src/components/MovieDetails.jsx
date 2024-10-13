const MovieDetails = ({ movie }) => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
        <img className="w-full" src={movie.Poster} alt={movie.Title} />
        <div className="p-4">
          <h1 className="text-2xl font-bold">{movie.Title}</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Ratings:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    );
  };
  
  export default MovieDetails;