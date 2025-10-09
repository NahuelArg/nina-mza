# Guía de Despliegue y Mejores Prácticas - Nina MZA

## 🚀 Opciones de Despliegue

### Frontend (Cliente React)

#### 🔷 Vercel (Recomendado)
```bash
# Instalación global
npm i -g vercel

# Deploy desde el directorio client
cd client
vercel

# Configuración automática detectada:
# Framework: Vite
# Build Command: npm run build
# Output Directory: dist
```

**Configuración en vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_FIREBASE_API_KEY": "@vite_firebase_api_key"
  }
}
```

#### 🔷 Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist

# Environment variables
VITE_API_URL=https://tu-api.com
VITE_FIREBASE_API_KEY=tu-api-key
```

#### 🔷 GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: cd client && npm install
      - name: Build
        run: cd client && npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
```

### Backend (Servidor Node.js)

#### 🔶 Railway (Recomendado)
```bash
# Instalación
npm install -g @railway/cli

# Login y deploy
railway login
cd server
railway link
railway deploy
```

**railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api",
    "healthcheckTimeout": 100
  }
}
```

#### 🔶 Render
```yaml
# render.yaml
services:
  - type: web
    name: nina-mza-api
    env: node
    region: oregon
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        sync: false
```

#### 🔶 Heroku
```bash
# Heroku CLI
heroku create nina-mza-api
git subtree push --prefix server heroku main

# O usando Docker
# Dockerfile en server/
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔧 Configuración de Producción

### Variables de Entorno de Producción

#### Cliente
```env
# Producción
VITE_API_URL=https://api.ninamza.com.ar
VITE_FIREBASE_API_KEY=produccion-api-key
VITE_FIREBASE_AUTH_DOMAIN=nina-mza-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nina-mza-prod
VITE_MP_PUBLIC_KEY=APP_USR-produccion-public-key

# URLs de redirección
VITE_SUCCESS_URL=https://ninamza.com.ar/success
VITE_FAILURE_URL=https://ninamza.com.ar/failure
VITE_PENDING_URL=https://ninamza.com.ar/pending
```

#### Servidor
```env
# Servidor de producción
NODE_ENV=production
PORT=3001

# Firebase Admin (Producción)
FIREBASE_PROJECT_ID=nina-mza-prod
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@nina-mza-prod.iam.gserviceaccount.com

# Google Sheets (Producción)
GOOGLE_SHEETS_SPREADSHEET_ID=produccion-spreadsheet-id
GOOGLE_SHEETS_CLIENT_EMAIL=sheets-prod@nina-mza-prod.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudinary (Producción)
CLOUDINARY_CLOUD_NAME=nina-mza-prod
CLOUDINARY_API_KEY=prod-api-key
CLOUDINARY_API_SECRET=prod-api-secret

# MercadoPago (Producción)
MP_ACCESS_TOKEN=APP_USR-prod-access-token

# Email (Producción)
EMAIL_USER=notificaciones@ninamza.com.ar
EMAIL_PASS=app-password-prod
```

### Optimizaciones de Build

#### Cliente (Vite)
```javascript
// vite.config.js para producción
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['react-hot-toast', 'react-icons']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

#### Servidor (Express)
```javascript
// Configuraciones de producción en app.js
if (process.env.NODE_ENV === 'production') {
  // Comprimir respuestas
  const compression = require('compression');
  server.use(compression());
  
  // Rate limiting
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
  });
  server.use('/api/', limiter);
  
  // Security headers
  const helmet = require('helmet');
  server.use(helmet());
  
  // Servir archivos estáticos del cliente
  server.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Catch all handler para SPA
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}
```

## 🔒 Seguridad en Producción

### Headers de Seguridad
```javascript
// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.mercadopago.com"]
    }
  }
}));
```

### CORS de Producción
```javascript
// Configuración CORS estricta
const corsOptions = {
  origin: [
    'https://ninamza.com.ar',
    'https://www.ninamza.com.ar',
    'https://nina-mza.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Validación de Entrada
```javascript
// Middleware de validación
const validateInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Datos inválidos',
        details: error.details
      });
    }
    next();
  };
};
```

## 📊 Monitoreo y Analytics

### Health Checks
```javascript
// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  });
});
```

### Logging en Producción
```javascript
// Winston para logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Error Tracking
```javascript
// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy Nina MZA

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install client dependencies
        run: cd client && npm ci
        
      - name: Install server dependencies
        run: cd server && npm ci
        
      - name: Lint client
        run: cd client && npm run lint
        
      - name: Build client
        run: cd client && npm run build
        
      - name: Test server
        run: cd server && npm test # Si tienes tests

  deploy-client:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./client

  deploy-server:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.1.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: ${{ secrets.RAILWAY_SERVICE }}
```

## 🎯 Optimizaciones de Performance

### Lazy Loading
```javascript
// Lazy loading de componentes
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Products = lazy(() => import('./pages/dashboard/Products'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization
```javascript
// React Lazy Load Image Component
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductImage = ({ src, alt }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    wrapperProps={{
      style: { transitionDelay: "1s" },
    }}
  />
);
```

### Bundle Analysis
```bash
# Analizar el bundle del cliente
cd client
npx vite-bundle-analyzer dist/stats.json

# Ver tamaño de dependencias
npm install -g bundle-phobia-cli
bundle-phobia package.json
```

## 📱 PWA Configuration

### Service Worker
```javascript
// public/sw.js
const CACHE_NAME = 'nina-mza-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### Web App Manifest
```json
{
  "name": "Nina MZA - Showroom",
  "short_name": "Nina MZA",
  "description": "Tienda de ropa femenina en Mendoza",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔧 Troubleshooting de Producción

### Logs Comunes
```bash
# Ver logs en Railway
railway logs

# Ver logs en Vercel
vercel logs

# Ver logs en Heroku
heroku logs --tail -a nina-mza-api
```

### Problemas Frecuentes

#### 1. CORS Errors
```javascript
// Verificar configuración CORS
const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Debug
    callback(null, true);
  }
};
```

#### 2. Environment Variables
```bash
# Verificar variables en el servidor
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'SET' : 'MISSING'
});
```

#### 3. Build Errors
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install

# Build con más información
npm run build -- --verbose
```

## 📈 Métricas y Monitoring

### Google Analytics
```javascript
// gtag.js implementation
import { gtag } from 'ga-gtag';

gtag('config', 'GA_TRACKING_ID', {
  page_title: document.title,
  page_location: window.location.href
});

// Track events
gtag('event', 'purchase', {
  transaction_id: '12345',
  value: 25.42,
  currency: 'ARS'
});
```

### Performance Monitoring
```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

*Esta guía cubre los aspectos esenciales para un despliegue exitoso y mantenimiento en producción del proyecto Nina MZA.*