import React, {useState} from "react"

function MovieSearch() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const movieSearch = async (e)=>{
        e.preventDefault()

        const url= `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results)
        }catch(err){
            console.error(err)
        }
    }

    return (
        <>
        <h1 className="title">React Movie Search</h1>
        <form className="form" onSubmit={movieSearch}>
        
        <label className="label" htmlFor="query">Movies
            
        </label>
        <input type="text" name="query" value={query}
            onChange={(e)=>setQuery(e.target.value)} className="input" 
            placeholder="search movies" />
        <button className="btn" type="submit">Search</button>
        </form>
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
                <div key={movie.id} className="card">
                    <img className="card--img" 
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` } />
                    <div className="card--content">
                        <h3 className="card--title">{movie.title}</h3>
                        <p className="card--desc">{movie.overview}</p>
                        <div className="flex">
                            <p className="card--release">Release Date: {"   "} {movie.release_date}</p>
                            <p className="card--rating">Rating: {"  "}{movie.vote_average}</p>
                        </div>
                    </div>
                </div>
            )
                )}
        </div>
        </>
    )
}

export default MovieSearch