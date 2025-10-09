# Documentación Técnica - Nina MZA

## 📋 Índice
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [API Endpoints](#api-endpoints)
- [Base de Datos (Google Sheets)](#base-de-datos-google-sheets)
- [Estados y Flujos](#estados-y-flujos)
- [Integración de Servicios](#integración-de-servicios)
- [Middleware y Seguridad](#middleware-y-seguridad)

## 🏗️ Arquitectura del Sistema

### Patrón de Arquitectura
La aplicación sigue un patrón de arquitectura **Cliente-Servidor** con las siguientes características:

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│                 │ ◄──────────────► │                 │
│   React Client  │                  │  Express Server │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌─────────────────┐                  ┌─────────────────┐
│    Firebase     │                  │  Google Sheets  │
│ Authentication  │                  │   (Database)    │
└─────────────────┘                  └─────────────────┘
                                               │
                                               ▼
                                    ┌─────────────────┐
                                    │   Third Party   │
                                    │    Services     │
                                    │ - Cloudinary    │
                                    │ - MercadoPago   │
                                    │ - Nodemailer    │
                                    └─────────────────┘
```

### Flujo de Datos
1. **Cliente → Servidor**: Peticiones HTTP/HTTPS
2. **Servidor → Google Sheets**: Operaciones CRUD
3. **Servidor → Servicios Externos**: Cloudinary, MercadoPago, etc.
4. **Servidor → Cliente**: Respuestas JSON

## 🔌 API Endpoints

### Autenticación
```
POST /api/login/login           # Iniciar sesión
POST /api/login/logout          # Cerrar sesión
POST /api/login/register        # Registrar usuario
```

### Productos y Ventas (Google Sheets)
```
GET    /api/sheets/products          # Obtener productos
POST   /api/sheets/products          # Crear producto
PUT    /api/sheets/products/:id      # Actualizar producto
DELETE /api/sheets/products/:id      # Eliminar producto

GET    /api/sheets/sales             # Obtener ventas
POST   /api/sheets/sales             # Crear venta
GET    /api/sheets/sales/:id         # Obtener venta específica

POST   /api/sheets/upload-images     # Subir imágenes a Cloudinary
```

### Cupones
```
GET    /api/coupon/validate          # Validar cupón
POST   /api/coupon                   # Crear cupón
GET    /api/coupon                   # Obtener cupones
PUT    /api/coupon/:id               # Actualizar cupón
DELETE /api/coupon/:id               # Eliminar cupón
```

### MercadoPago
```
POST   /api/mp/create-preference     # Crear preferencia de pago
POST   /api/mp/webhook               # Webhook de notificaciones
GET    /api/mp/payment/:id           # Obtener estado de pago
```

### Usuarios
```
GET    /api/user/users               # Obtener usuarios
GET    /api/user/:id                 # Obtener usuario específico
PUT    /api/user/:id                 # Actualizar usuario
DELETE /api/user/:id                 # Eliminar usuario
```

### Emails
```
POST   /api/mails/send               # Enviar email
POST   /api/mails/notification       # Enviar notificación
```

## 📊 Base de Datos (Google Sheets)

### Estructura de Hojas

#### Hoja "Productos"
| Columna | Tipo | Descripción |
|---------|------|-------------|
| A | ID | Identificador único |
| B | SKU | Código del producto |
| C | Nombre | Nombre del producto |
| D | Precio | Precio unitario |
| E | Stock | Cantidad disponible |
| F | Categoría | Categoría del producto |
| G | Colores | Colores disponibles (JSON) |
| H | Talles | Talles disponibles (JSON) |
| I | Imágenes | URLs de imágenes (JSON) |
| J | Descripción | Descripción del producto |
| K | Estado | Activo/Inactivo |

#### Hoja "Ventas"
| Columna | Tipo | Descripción |
|---------|------|-------------|
| A | ID Venta | Identificador único de venta |
| B | ID Producto | Referencia al producto |
| C | ID Cliente | Identificador del cliente |
| D | SKU | Código del producto vendido |
| E | Cantidad | Cantidad vendida |
| F | Talle | Talle seleccionado |
| G | Color | Color seleccionado |
| H | Precio | Precio unitario |
| I | Forma Pago | Método de pago |
| J | Estado Pago | Estado del pago |
| K | Total | Total de la línea |
| L | Fecha | Fecha de la venta |
| M | Hora | Hora de la venta |
| N | Tipo Envío | Método de envío |
| O | Email | Email del cliente |
| P | Dirección | Dirección de envío |
| Q | Provincia | Provincia |
| R | CP | Código postal |
| S | Teléfono | Número de contacto |
| T | Medio | Canal de venta |
| U | Código Descuento | Cupón aplicado |
| V | Estado Cupón | Validez del cupón |

#### Hoja "Cupones"
| Columna | Tipo | Descripción |
|---------|------|-------------|
| A | ID | Identificador único |
| B | Código | Código del cupón |
| C | Nombre | Nombre descriptivo |
| D | Tipo | percentage/fixed |
| E | Valor | Valor del descuento |
| F | Expiración | Fecha de expiración |
| G | Estado | active/inactive |
| H | Usos | Número de usos |
| I | Límite | Límite de usos |
| J | Categorías | Categorías aplicables |

#### Hoja "Usuarios"
| Columna | Tipo | Descripción |
|---------|------|-------------|
| A | UID | Firebase UID |
| B | Email | Correo electrónico |
| C | Nombre | Nombre completo |
| D | Teléfono | Número de teléfono |
| E | Dirección | Dirección |
| F | Provincia | Provincia |
| G | CP | Código postal |
| H | Fecha Registro | Fecha de registro |
| I | Estado | Activo/Inactivo |
| J | Rol | admin/customer |

## 🔄 Estados y Flujos

### Flujo de Compra
```
1. Selección de Productos
   ├── Agregar al carrito
   ├── Seleccionar color/talle
   └── Validar stock

2. Carrito de Compras
   ├── Aplicar cupón (opcional)
   ├── Seleccionar método de envío
   └── Proceder al pago

3. Información del Cliente
   ├── Datos personales
   ├── Dirección de envío
   └── Método de pago

4. Procesamiento
   ├── Crear venta en Google Sheets
   ├── Procesar pago (MercadoPago)
   └── Enviar confirmación por email

5. Estados Finales
   ├── Pago Exitoso → Preparar envío
   ├── Pago Pendiente → Esperar confirmación
   └── Pago Fallido → Reintentar o cancelar
```

### Estados de Pago
- **Pendiente**: Pago iniciado, esperando confirmación
- **Completada**: Pago confirmado y procesado
- **Fallida**: Error en el procesamiento del pago
- **Cancelada**: Pago cancelado por el usuario

### Estados de Producto
- **Activo**: Disponible para venta
- **Inactivo**: No visible en la tienda
- **Sin Stock**: Visible pero no comprable

## 🔌 Integración de Servicios

### Firebase Authentication
```javascript
// Configuración
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};

// Uso en el servidor
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
```

### Cloudinary
```javascript
// Configuración
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload de imágenes
const result = await cloudinary.uploader.upload(file.path);
```

### MercadoPago
```javascript
// Crear preferencia
const preference = {
  items: [{
    title: producto.nombre,
    unit_price: producto.precio,
    quantity: producto.cantidad,
  }],
  back_urls: {
    success: "https://ninamza.com.ar/success",
    failure: "https://ninamza.com.ar/failure",
    pending: "https://ninamza.com.ar/pending"
  },
  notification_url: "https://api.ninamza.com.ar/api/mp/webhook"
};
```

### Google Sheets API
```javascript
// Configuración
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Operaciones
const sheets = google.sheets({ version: 'v4', auth });
const result = await sheets.spreadsheets.values.get({
  spreadsheetId: SPREADSHEET_ID,
  range: 'Products!A:K',
});
```

## 🛡️ Middleware y Seguridad

### CORS Configuration
```javascript
server.use(cors({
  origin: [
    "https://ninamza.com.ar",
    "http://localhost:5173",
    "https://nina-mza.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true,
}));
```

### Middleware de Autenticación
```javascript
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
};
```

### Upload Middleware
```javascript
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
```

### Manejo de Errores
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};
```

## 📈 Monitoreo y Logs

### Logging
```javascript
const morgan = require('morgan');
server.use(morgan('dev')); // Solo en desarrollo
```

### Validación de Requests
```javascript
server.use((req, res, next) => {
  // Log de requests entrantes en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
  }
  next();
});
```

## 🔧 Configuración de Desarrollo

### Scripts Disponibles

#### Cliente
```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build para producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint . --ext js,jsx"   // Linting
}
```

#### Servidor
```json
{
  "start": "node index.js",         // Producción
  "dev": "nodemon index.js"         // Desarrollo con hot reload
}
```

### Variables de Entorno Requeridas

#### Desarrollo Local
```bash
# Server
PORT=3001
NODE_ENV=development

# Client
VITE_API_URL=http://localhost:3001
```

#### Producción
```bash
# Server
NODE_ENV=production
PORT=3001

# Client
VITE_API_URL=https://api.ninamza.com.ar
```

---

*Esta documentación técnica está dirigida a desarrolladores que trabajen en el mantenimiento y evolución del sistema Nina MZA.*