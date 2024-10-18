import React, { useState, useEffect } from 'react';
import apiClient from './apiClient'; // Axios instance for API requests
import './TVShows.css'; // Custom styles for the component

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const response = await apiClient.get('', {
          params: {
            s: 'trending', // Search for trending shows (this depends on the API, replace as needed)
            type: 'series', // Filter for TV series
          },
        });
        setShows(response.data.Search || []); // Assuming the API returns data in a `Search` array
      } catch (error) {
        setError('Failed to fetch TV shows');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingShows();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tv-shows">
      <h2>Trending TV Shows</h2>
      <div className="show-grid">
        {shows.map((show) => (
          <div key={show.imdbID} className="show-card">
            <img
              src={show.Poster}
              alt={show.Title}
              className="show-poster"
            />
            <p className="show-title">{show.Title}</p>
            <p className="show-year">{show.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShows;