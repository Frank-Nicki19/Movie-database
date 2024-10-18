import React from 'react';
import HomePage from './components/HomePage';  // Updated path to point to the components folder
import './App.css';  // Global styles (optional)
import TVShows from './components/TVShows';

// Main App Component
function App() {
  return (
    <div className="App">
      {/* Render HomePage component */}
      <HomePage />
      <TVShows />
    </div>
  );
}

export default App;
