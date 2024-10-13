import React, { useState } from 'react';
import './HomePage.css';
import apiClient from './apiClient'; // Ensure this path is correct

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); // To store search results
  const [darkMode, setDarkMode] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Function to fetch movies from OMDb API
  const fetchMoviesByTitle = async (title) => {
    try {
      const response = await apiClient.get('', {
        params: {
          s: title, // 's' is the search parameter in OMDb API for movies
        },
      });
      if (response.data.Response === "True") {
        setMovies(response.data.Search); // Assuming Search contains an array of movies
      } else {
        setMovies([]); // No movies found, clear the list
        alert('No movies found');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle Search button click
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMoviesByTitle(searchTerm);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    alert(`Logging in with email: ${email}`);
    setLoginModalOpen(false); // Close the login modal after logging in
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Bar */}
      <div className="navbar">
        <h2 className="logo">MovieDB</h2>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">TV Shows</a>
          <a href="#">Movies</a>
          <a href="#">My List</a>
        </div>
        <div className="icons">
          <button className="login-btn" onClick={() => setLoginModalOpen(true)}>Login</button>
          <button className="toggle-darkmode" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Featured Movie</h1>
          <p>Exciting movie description goes here.</p>
          <button className="play-button">Play</button>
          <button className="info-button">More Info</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Search Results */}
      {movies.length > 0 ? (
        <div className="content-section">
          <ContentRow title="Search Results" movies={movies} />
        </div>
      ) : (
        <p className="no-results">No movies found. Try searching for something else.</p>
      )}

      {/* Content Rows */}
      <div className="content-section">
        <ContentRow title="Trending Now" movies={['Movie1', 'Movie2', 'Movie3', 'Movie4']} />
        <ContentRow title="Top Picks" movies={['Movie5', 'Movie6', 'Movie7', 'Movie8']} />
        <ContentRow title="Action" movies={['Movie9', 'Movie10', 'Movie11', 'Movie12']} />
      </div>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="login-modal">
          <div className="modal-content">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Continue with Email</button>
            <button onClick={() => setLoginModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ContentRow Component (to display movies in rows)
const ContentRow = ({ title, movies }) => {
  return (
    <div className="content-row">
      <h2>{title}</h2>
      <div className="movie-cards">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={movie.Poster ? movie.Poster : `https://via.placeholder.com/200x300?text=${movie.Title}`}
              alt={movie.Title}
            />
            <p>{movie.Title} ({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

