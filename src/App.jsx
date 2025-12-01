import React, { useEffect, useState } from 'react';
import poster from './assets/No-Poster.png';
import background from './assets/BG.png';
import hero from './assets/hero-img.png';
import Search from './components/search';
import Spinner from './components/Spinner'; 
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingSearches } from './appwrite';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';                                                                                                                                                          
const API_KEY = import.meta.env.VITE_API_TOKEN;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

function App() {
    console.log("API TOKEN =>", import.meta.env.VITE_API_TOKEN);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedTerm] = useState('');
    const [trendingSearches, setTrendingSearches] = useState([]);

    useDebounce(() => setDebouncedTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endPoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            console.log(data);
            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('Error fetching movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingSearches();
            setTrendingSearches(movies);
        } catch (error) {
            console.error('Error loading trending searches:', error);
        }
    };

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                    <header>
                        <img src={hero} />
                        <h1>
                            Find <span className="text-gradient">Movies</span> You'll Enjoy Without Hassle
                        </h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>

                    {trendingSearches.length > 0 && (
                        <section className="trending">
                            <h2>Trending Movies</h2>
                            <ul>
                                {trendingSearches.map((movie, index) => (
                                    <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img src={movie.poster_url} alt={movie.title} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section className="all-movies mt-20">
                        <h2>All Movies</h2>

                        {isLoading ? (
                            <Spinner />
                        ) : errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ) : (
                            <ul className="bg-black/20 p-4 rounded-lg">
                                {movieList.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default App;

