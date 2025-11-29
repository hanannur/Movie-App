import React, {useEffect, useState } from 'react';
import poster from './assets/No-Poster.png';
import background from './assets/BG.png';
import hero from './assets/hero-img.png'
import Search from './components/search'
import Spinner from './components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_API_TOKEN;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

function App() {
    const [searchTerm , setSearchTerm] = useState('')
    const[errorMessage , setErrorMessage]=useState('')
    const[movieList , setMovieList] = useState([])
    const[isLoading , setIsLoading]=useState(false)

    const fetchMovies = async (query) => {
        setIsLoading(true)
        setErrorMessage(' ')
        try {
            const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS);
            if(!response.ok){
                throw new Error('Faild to fetch movies');
            }
            const data = await response.json();
            console.log(data)
            // if(data.Response==='False'){
            //     setErrorMessage(data.Error || 'Failed to fetch movies');
            //     setMovieList([])
            //     return;
            // }

            setMovieList(data.results || [])
        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage( 'Error fetching monies. Please try again')
        }
        finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchMovies()

    },[])

    return(


         <main>
    <div className="pattern">
        <div className="wrapper">
            <header >
               
                <img src= {hero} />
                <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without Hassle</h1>
                      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>
            <section className="all-movies mt-20">
                <h2 className="mt-[40px">All Movies</h2>
                {isLoading ? (
                <Spinner/>
            ): errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ):(
                <ul className="bg-black/20 p-4 rounded-lg">
                    {movieList.map((movie) =>(
                        <li key={movie.id} className="text-white">
                            {movie.title}
                        </li>
                    ))}
                </ul>
            )}
            </section>

        </div>
    </div>

  </main>
    )
}

export default App
