import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=e396844e`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if(responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    const addFavoriteMovie = (movie) => {
        if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
            const newFavorites = [...favorites, movie];
            setFavorites(newFavorites);
        }
    };

    const removeFavoriteMovie = (movie) => {
        const newFavorites = favorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID
        );
        setFavorites(newFavorites);
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    return (
        <div className="container-fluid movie-app">
            <div className="search-container">
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className="row">
                <MovieListHeading heading="Movies" />
            </div>

            <div className="row">
                <MovieList 
                    movies={movies} 
                    favoriteComponent={AddFavorites} 
                    handleFavoritesClick={addFavoriteMovie}
                />
            </div>

            {/* Favorites Section - Fixed at bottom */}
            <div className="favorites-container">
                {favorites.length > 0 && (
                    <>
                        <div className="row">
                            <MovieListHeading heading="Your Favorites" />
                        </div>
                        <div className="row favorites-row">
                            <MovieList 
                                movies={favorites} 
                                favoriteComponent={RemoveFavorites} 
                                handleFavoritesClick={removeFavoriteMovie}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
