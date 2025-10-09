# Nina MZA - E-commerce Platform

## 📋 Descripción del Proyecto

Nina MZA es una plataforma de e-commerce completa desarrollada para Nina Showroom, una tienda de ropa ubicada en Mendoza, Argentina. El proyecto consiste en una aplicación web full-stack que permite la gestión completa de un negocio de venta de ropa, incluyendo ventas online, gestión de inventario, procesamiento de pagos y administración de clientes.

## 🏗️ Arquitectura del Sistema

### Frontend (Cliente)
- **Framework**: React 18 con Vite
- **Gestión de Estado**: Redux con Redux Toolkit
- **Estilos**: Tailwind CSS
- **Routing**: React Router DOM
- **UI Components**: Componentes personalizados con iconos de React Icons

### Backend (Servidor)
- **Framework**: Node.js con Express.js
- **Base de Datos**: Google Sheets (como base de datos principal)
- **Autenticación**: Firebase Authentication
- **Almacenamiento de Imágenes**: Cloudinary
- **Procesamiento de Pagos**: MercadoPago SDK
- **Email**: Nodemailer para envío de correos

## 🚀 Características Principales

### Para Clientes (E-commerce)
- **Catálogo de Productos**: Visualización de productos con imágenes, precios y detalles
- **Carrito de Compras**: Gestión completa del carrito con cantidades y selección de colores/talles
- **Sistema de Cupones**: Aplicación de descuentos por porcentaje o monto fijo
- **Métodos de Pago**: Integración con MercadoPago para pagos online
- **Opciones de Envío**: Selección entre envío a domicilio y retiro en casa central
- **Autenticación de Usuario**: Registro y login con Firebase
- **Seguimiento de Compras**: Visualización del historial de compras

### Para Administradores (Dashboard)
- **Gestión de Productos**: CRUD completo de productos con subida de imágenes
- **Gestión de Ventas**: Visualización y administración de todas las ventas
- **Sistema de Cupones**: Creación y gestión de códigos de descuento
- **Gestión de Usuarios**: Administración de clientes registrados
- **Panel de Balance**: Análisis de ventas y métricas del negocio
- **Soporte**: Sistema de comunicación con clientes
- **Punto de Venta**: Interfaz para ventas en casa central

## 📁 Estructura del Proyecto

```
nina-mza/
├── client/                     # Frontend React
│   ├── public/                 # Archivos estáticos
│   ├── src/
│   │   ├── api/                # Servicios de API
│   │   ├── assets/             # Recursos (imágenes, iconos)
│   │   ├── componentes/        # Componentes React
│   │   │   ├── Dashboard/      # Componentes del panel admin
│   │   │   └── Ecommerce/      # Componentes del e-commerce
│   │   ├── context/            # Context API
│   │   ├── firebase/           # Configuración Firebase
│   │   ├── pages/              # Páginas principales
│   │   │   ├── dashboard/      # Páginas del dashboard
│   │   │   └── ecommerce/      # Páginas del e-commerce
│   │   ├── redux/              # Gestión de estado Redux
│   │   │   ├── actions/        # Actions de Redux
│   │   │   └── reducer/        # Reducers de Redux
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Punto de entrada
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node.js
│   ├── src/
│   │   ├── Controllers/        # Controladores de API
│   │   │   ├── coupon/         # Gestión de cupones
│   │   │   ├── login/          # Autenticación
│   │   │   ├── mails/          # Envío de emails
│   │   │   ├── mercadopago/    # Integración MercadoPago
│   │   │   ├── sheets/         # Integración Google Sheets
│   │   │   └── user/           # Gestión de usuarios
│   │   ├── Helpers/            # Funciones auxiliares
│   │   ├── Middleware/         # Middlewares de Express
│   │   ├── Routes/             # Definición de rutas
│   │   └── app.js              # Configuración de Express
│   ├── uploads/                # Directorio temporal para uploads
│   ├── index.js                # Servidor principal
│   └── package.json
└── README.md                   # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^18.3.1 | Framework principal |
| Vite | ^5.3.4 | Build tool y dev server |
| Redux Toolkit | ^2.8.2 | Gestión de estado |
| React Router | ^6.24.1 | Routing |
| Tailwind CSS | ^3.4.6 | Framework CSS |
| Axios | ^1.7.2 | Cliente HTTP |
| Firebase | ^10.12.4 | Autenticación |
| MercadoPago SDK | ^0.0.19 | Pagos |
| React Hot Toast | ^2.4.1 | Notificaciones |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Express.js | ^4.19.2 | Framework web |
| Firebase Admin | ^12.2.0 | Autenticación servidor |
| Google APIs | ^105.0.0 | Integración Google Sheets |
| Cloudinary | ^2.6.0 | Gestión de imágenes |
| MercadoPago | ^2.0.13 | Procesamiento de pagos |
| Multer | ^1.4.5 | Upload de archivos |
| Nodemailer | ^6.9.14 | Envío de emails |
| Moment.js | ^2.30.1 | Manejo de fechas |

## ⚙️ Configuración e Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase
- Cuenta de Cloudinary
- Cuenta de MercadoPago
- Acceso a Google Sheets API

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/NahuelArg/nina-mza.git
cd nina-mza
```

2. **Instalar dependencias del servidor**
```bash
cd server
npm install
```

3. **Instalar dependencias del cliente**
```bash
cd ../client
npm install
```

### Configuración de Variables de Entorno

#### Servidor (server/.env)
```env
# Firebase
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_CLIENT_EMAIL=tu-client-email

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# MercadoPago
MP_ACCESS_TOKEN=tu-access-token

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=tu-client-email
GOOGLE_SHEETS_PRIVATE_KEY=tu-private-key
GOOGLE_SHEETS_SPREADSHEET_ID=tu-spreadsheet-id

# Email
EMAIL_USER=tu-email
EMAIL_PASS=tu-password
```

#### Cliente (client/.env)
```env
# Firebase
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id

# MercadoPago
VITE_MP_PUBLIC_KEY=tu-public-key

# API
VITE_API_URL=http://localhost:3001
```

## 🚀 Ejecución

### Desarrollo

1. **Ejecutar el servidor**
```bash
cd server
npm run dev
```

2. **Ejecutar el cliente**
```bash
cd client
npm run dev
```

### Producción

1. **Build del cliente**
```bash
cd client
npm run build
```

2. **Ejecutar servidor**
```bash
cd server
npm start
```

## 📊 Funcionalidades Detalladas

### Sistema de Ventas
- **Registro de Ventas**: Cada venta se registra en Google Sheets con todos los detalles
- **Estados de Pago**: Pendiente, Completada, Fallida
- **Medios de Venta**: Página web, Casa central
- **Información del Cliente**: Datos completos incluyendo dirección de envío

### Sistema de Cupones
- **Tipos de Descuento**: Porcentaje o monto fijo
- **Categorías**: Aplicable a categorías específicas de productos
- **Fechas de Expiración**: Control temporal de validez
- **Estados**: Activo/Inactivo

### Gestión de Productos
- **Información Completa**: SKU, nombre, precio, stock, categoría
- **Variantes**: Colores y talles disponibles
- **Imágenes**: Múltiples imágenes por producto almacenadas en Cloudinary
- **Control de Stock**: Validación de disponibilidad en tiempo real

### Procesamiento de Pagos
- **MercadoPago**: Integración completa con webhooks
- **Estados de Pago**: Manejo de estados pending, approved, rejected
- **Notificaciones**: Emails automáticos según el estado del pago

## 🌐 Deployment

### Frontend (Vercel)
El cliente está configurado para deploy en Vercel con configuración en `vercel.json`.

### Backend (Render/Railway)
El servidor puede desplegarse en cualquier plataforma que soporte Node.js.

### Dominios Configurados
- **Producción**: https://ninamza.com.ar
- **Desarrollo**: http://localhost:5173
- **Alternativo**: https://nina-mza.onrender.com

## 🔒 Seguridad

- **CORS**: Configurado para dominios específicos
- **Autenticación**: Firebase Authentication para usuarios
- **Middleware**: Validación de rutas y permisos
- **Variables de Entorno**: Configuración segura de credenciales

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop**: Experiencia completa de administración y compra
- **Tablet**: Navegación adaptada para pantallas medianas
- **Mobile**: Interface optimizada para dispositivos móviles

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas sobre el proyecto:
- **Sitio Web**: https://ninamza.com.ar
- **Repositorio**: https://github.com/NahuelArg/nina-mza

## 📄 Licencia

Este proyecto es privado y está destinado exclusivamente para Nina Showroom.

---

*Desarrollado con ❤️ para Nina Showroom - Mendoza, Argentina*