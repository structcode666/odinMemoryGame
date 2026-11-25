export function Moviecard({movie, selectMovie}){
    return(
        <button type="button" onClick={selectMovie} className="movie-card">
            {movie.poster_path ? (
                <img
                    className="movie-card-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                />
            ) : (
                <span className="movie-card-poster movie-card-poster-fallback">
                    Poster unavailable
                </span>
            )}
            <span className="movie-card-title">{movie.title}</span>
            
        </button>
    )
}