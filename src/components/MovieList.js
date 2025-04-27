import React from 'react';

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    return (
        <>
            {props.movies.map((movie) => (
                <div className="movie-list-item" key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <div 
                        className="overlay d-flex align-items-center justify-content-center"
                        onClick={() => props.handleFavoritesClick(movie)}
                    >
                        <FavoriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;