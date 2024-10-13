import axios from 'axios';


const API_KEY = 'd17881d4'; // Use your actual API key
const apiClient = axios.create({
  baseURL: `http://www.omdbapi.com/`,
  params: {
    apikey: API_KEY,
  },
});

export default apiClient;