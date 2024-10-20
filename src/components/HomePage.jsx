import React, { useState, useEffect } from 'react';
import './HomePage.css';
import apiClient from './apiClient'; // Ensure this path is correct

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Simulate top picked movies based on user interactions
  const topPicksData = ['tt0111161', 'tt0068646', 'tt0071562', 'tt0468569']; // IMDb IDs for top movies

  // Function to fetch movies from OMDb API
  const fetchMovies = async (title, type = 'movie') => {
    try {
      const response = await apiClient.get('', {
        params: { s: title, type },
      });
      if (response.data.Response === "True") {
        return response.data.Search;
      }
      return [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  // Shuffle an array (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch featured movies, top picks, and trending TV shows
  const fetchHomePageContent = async () => {
    const featured = await fetchMovies('trending');
    const topPicksMovies = await Promise.all(topPicksData.map(id => fetchMovies(id)));
    const trendingShows = await fetchMovies('trending', 'series');
    
    // Shuffle arrays to change displayed movies on refresh
    setFeaturedMovies(shuffleArray(featured));
    setTopPicks(shuffleArray(topPicksMovies.flat()));
    setTrendingTVShows(shuffleArray(trendingShows));
  };

  // Temporary trailer URL (You may integrate with YouTube API to fetch real trailers)
  const fetchMovieTrailer = (imdbID) => {
    const trailerUrl = `https://www.youtube.com/watch?v=${imdbID}`;
    setTrailerUrl(trailerUrl);
  };

  // Handle Search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm).then((movies) => {
        if (movies.length === 0) {
          alert('No movies found for the search term.');
        }
        setMovies(movies);
      });
    }
  };

  useEffect(() => {
    fetchHomePageContent();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    alert(`Logging in with email: ${email}`);
    setLoginModalOpen(false); 
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
      {Array.isArray(movies) && movies.length > 0 && (
        <div className="content-section">
          <ContentRow title="Search Results" movies={movies} onPlayTrailer={fetchMovieTrailer} />
        </div>
      )}

      {/* Trailer Section */}
      {trailerUrl && (
        <div className="trailer-section">
          <h2>Trailer</h2>
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Featured Movies Section */}
      <div className="content-section">
        <ContentRow title="Featured Movies" movies={featuredMovies} onPlayTrailer={fetchMovieTrailer} />
      </div>

      {/* Top Picks Section */}
      <div className="content-section">
        <ContentRow title="Top Picks" movies={topPicks} onPlayTrailer={fetchMovieTrailer} />
      </div>

      {/* Trending TV Shows Section */}
      <div className="content-section">
        <ContentRow title="Trending TV Shows" movies={trendingTVShows} onPlayTrailer={fetchMovieTrailer} />
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

// ContentRow Component
const ContentRow = ({ title, movies, onPlayTrailer }) => {
  return (
    <div className="content-row">
      <h2>{title}</h2>
      <div className="movie-cards">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={movie.Poster || `https://via.placeholder.com/200x300?text=${movie.Title}`}
              alt={movie.Title}
            />
            <p>{movie.Title} ({movie.Year})</p>
            <button onClick={() => onPlayTrailer(movie.imdbID)}>Play Trailer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
