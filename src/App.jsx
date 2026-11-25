import { useState, useEffect } from 'react'
import { Moviecard } from '../components/movieCard'
import { Scoreboard } from '../components/scoreBoard'
import { getMovie } from '../services/api'
import './App.css'

function App() {

 const [movies, setMovies] = useState([])
 const [selectedMoviesArray, setSelectedMoviesArray] = useState([])
 const [currentScore, setCurrentScore] = useState(0)
 const [bestScoreArray, setBestScoreArray] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)

 const moviesList = ["Fight Club", "Fist Fight", "Fighting with My Family", "Day of the Fight", "Why we Fight", "Fight or Flight"]
  
 function checkMovieInSelectedMoviesArray(selectedMovie, selectedMoviesArray){
  const hasMovie = selectedMoviesArray.some(movie => selectedMovie.id == movie.id)
  return hasMovie
 } 

 function reorderMovies(movies){
  const shuffledMovies = [...movies]

  for (let i = shuffledMovies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledMovies[i], shuffledMovies[j]] = [shuffledMovies[j], shuffledMovies[i]]
  }

  setMovies(shuffledMovies)

 }

 function selectMovie(movie){
  if(!checkMovieInSelectedMoviesArray(movie, selectedMoviesArray)){
    setSelectedMoviesArray([movie, ...selectedMoviesArray])
    reorderMovies(movies)
    setCurrentScore(currentScore => currentScore + 1)
  }

  if(checkMovieInSelectedMoviesArray(movie, selectedMoviesArray)){
    setBestScoreArray([currentScore, ...bestScoreArray])
    reorderMovies(movies)
    setCurrentScore(0)
    setSelectedMoviesArray([])


  }


 }

 //get movies from tmdb//
  useEffect(()=>{
    async function getMovies (){
      try{
        const moviePromises = moviesList.map(movie => getMovie(movie))
        const fetchedMovies = await Promise.all(moviePromises)
        setMovies(fetchedMovies)

      } catch (error) {
        console.log(error)
        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }

    getMovies()}, [])


  return (
    <main className="game-shell">
      <header className="game-header">
        <div className="game-intro">
          <h1>Odin Memory Game</h1>
          <p className="game-instructions">Choose each movie once. Remember your picks as the cards shuffle.</p>
        </div>
        <Scoreboard currentScore={currentScore} bestScoreArray={bestScoreArray} />
      </header>
      
      <section className="movie-grid" aria-label="Movie cards">
        {loading ? (
            <div className="loading-div">Loading...</div>
          ) : error ? (
            <div role="alert">Could not load movies: {error}</div>
          ) : (
            movies.map(movie => (
              <Moviecard
                movie={movie}
                selectMovie={() => selectMovie(movie)}
                key={movie.id}
              />
            ))
          )}
      </section>
    </main>
  )
}

export default App
