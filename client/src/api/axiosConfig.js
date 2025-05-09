// src/api/axiosConfig.js
import axios from 'axios';
import https from 'https';

// Detectar si el entorno es Node.js
const isNode = typeof window === 'undefined';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://nina-mza.onrender.com' : 'http://localhost:3000',
  withCredentials: true,
  ...(isNode && {
    httpsAgent: new https.Agent({
      rejectUnauthorized: true, // Asegúrate de habilitar esto en producción
    }),
  }),
});

export default instance;



