// src/api/axiosConfig.js
import axios from 'axios';
import https from 'https';

// Detectar si el entorno es Node.js
const isNode = typeof window === 'undefined';

const instance = axios.create({
  baseURL: 'https://nina-mza.onrender.com',
  withCredentials: true,
  ...(isNode && {
    httpsAgent: new https.Agent({
      rejectUnauthorized: true, // Asegúrate de habilitar esto en producción
    }),
  }),
});

export default instance;



