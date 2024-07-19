import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.js';
import MovieCard from './components/MovieCard/MovieCard.js';
import './App.css';
import Loader from './components/Loader/Loader.js';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
 

  const fetchMovies = async (query) => {
    setLoading(true);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
    const movies = data.docs.map((doc) => ({
      title: doc.title,
      author: doc.author_name?.[0],
      publicationDate: doc.first_publish_year,
    }));
    setMovies(movies);
    setLoading(false);
  };

  const handleSearch = (query) => {
    setQuery(query);
    fetchMovies(query);
  };

  
  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="movie-cards">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        
        </>
      )}
    </div>
  );
};

export default App;
