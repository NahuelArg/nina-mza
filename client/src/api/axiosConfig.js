// src/api/axiosConfig.js
import axios from 'axios';
import https from 'https';

const instance = axios.create({
  baseURL: 'https://nina-mza.onrender.com',
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: true, // Asegúrate de habilitar esto en producción
  }),
});

export default instance;



