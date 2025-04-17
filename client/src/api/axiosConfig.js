import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nina-mza.onrender.com/api', // Apunta al backend desplegado
  withCredentials: true,  // Si es necesario, habilita las cookies
});

export default instance;
