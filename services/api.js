const API_KEY = "e7ececcc6eac722307f119fb9f64258e"
const BASE_URL = `https://api.themoviedb.org/3`


export const getMovie = async (movie)=>{

    const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie)}`)

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json();
    return data.results[0]

}