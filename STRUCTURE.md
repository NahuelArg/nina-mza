# Estructura del Proyecto - Nina MZA

## 📁 Vista General de la Estructura

```
nina-mza/
├── 📁 client/                          # Frontend React con Vite
│   ├── 📁 public/                      # Archivos estáticos públicos
│   │   ├── 🖼️ favicon.ico             # Favicon del sitio
│   │   ├── 🖼️ logo.png                # Logo de Nina MZA
│   │   ├── 🖼️ Protegido-MercadoPago.webp  # Imagen de seguridad MP
│   │   └── 📄 robots.txt              # Configuración SEO
│   ├── 📁 src/                         # Código fuente del frontend
│   │   ├── 📁 api/                     # Servicios de API
│   │   │   ├── 📄 authAPI.js          # API de autenticación
│   │   │   ├── 📄 cartAPI.js          # API del carrito
│   │   │   ├── 📄 couponAPI.js        # API de cupones
│   │   │   ├── 📄 mailAPI.js          # API de emails
│   │   │   ├── 📄 mpAPI.js            # API de MercadoPago
│   │   │   ├── 📄 productAPI.js       # API de productos
│   │   │   ├── 📄 salesAPI.js         # API de ventas
│   │   │   └── 📄 userAPI.js          # API de usuarios
│   │   ├── 📁 assets/                  # Recursos multimedia
│   │   │   ├── 🖼️ images/             # Imágenes del proyecto
│   │   │   └── 🎨 icons/              # Iconos personalizados
│   │   ├── 📁 componentes/             # Componentes React
│   │   │   ├── 📁 CashManagment/       # Gestión de caja
│   │   │   │   ├── 📄 CashBalance.jsx  # Balance de caja
│   │   │   │   └── 📄 CashReport.jsx   # Reportes de caja
│   │   │   ├── 📁 Colors/              # Selector de colores
│   │   │   │   └── 📄 ColorPicker.jsx  # Componente selector
│   │   │   ├── 📁 Coupons/             # Gestión de cupones
│   │   │   │   ├── 📄 CouponForm.jsx   # Formulario de cupones
│   │   │   │   ├── 📄 CouponList.jsx   # Lista de cupones
│   │   │   │   └── 📄 CouponValidator.jsx # Validador de cupones
│   │   │   ├── 📁 Dashboard/           # Componentes del dashboard
│   │   │   │   ├── 📁 Filter/          # Filtros y búsqueda
│   │   │   │   ├── 📁 Navbar/          # Navegación del dashboard
│   │   │   │   ├── 📁 Products/        # Gestión de productos
│   │   │   │   ├── 📁 Sales/           # Gestión de ventas
│   │   │   │   ├── 📁 Sidebar/         # Barra lateral
│   │   │   │   └── 📁 Users/           # Gestión de usuarios
│   │   │   ├── 📁 Ecommerce/           # Componentes del e-commerce
│   │   │   │   ├── 📁 Cart/            # Carrito de compras
│   │   │   │   ├── 📁 Checkout/        # Proceso de compra
│   │   │   │   ├── 📁 Footer/          # Pie de página
│   │   │   │   ├── 📁 Header/          # Encabezado
│   │   │   │   ├── 📁 Hero/            # Sección principal
│   │   │   │   ├── 📁 Loader/          # Componentes de carga
│   │   │   │   ├── 📁 Navbar/          # Navegación principal
│   │   │   │   ├── 📁 Products/        # Visualización de productos
│   │   │   │   └── 📁 Search/          # Búsqueda de productos
│   │   │   └── 📁 Mails/               # Componentes de email
│   │   │       ├── 📄 EmailTemplate.jsx # Plantilla de emails
│   │   │       └── 📄 EmailSender.jsx   # Enviador de emails
│   │   ├── 📁 context/                 # Context API de React
│   │   │   └── 📄 AuthContext.js       # Contexto de autenticación
│   │   ├── 📁 firebase/                # Configuración Firebase
│   │   │   ├── 📄 config.js           # Configuración de Firebase
│   │   │   └── 📄 auth.js             # Servicios de autenticación
│   │   ├── 📁 pages/                   # Páginas principales
│   │   │   ├── 📁 dashboard/           # Páginas del dashboard admin
│   │   │   │   ├── 📄 Balance.jsx      # Página de balance
│   │   │   │   ├── 📄 Coupons.jsx      # Gestión de cupones
│   │   │   │   ├── 📄 Dashboard.jsx    # Dashboard principal
│   │   │   │   ├── 📄 Error.jsx        # Página de error
│   │   │   │   ├── 📄 Login.jsx        # Inicio de sesión admin
│   │   │   │   ├── 📄 PagePayment.jsx  # Gestión de pagos
│   │   │   │   ├── 📄 Products.jsx     # Gestión de productos
│   │   │   │   ├── 📄 Register.jsx     # Registro de usuarios
│   │   │   │   ├── 📄 Sales.jsx        # Gestión de ventas
│   │   │   │   ├── 📄 Support.jsx      # Soporte al cliente
│   │   │   │   └── 📄 Users.jsx        # Gestión de usuarios
│   │   │   └── 📁 ecommerce/           # Páginas del e-commerce
│   │   │       ├── 📁 Payment/         # Páginas de pago
│   │   │       │   ├── 📄 FailurePayment.jsx # Pago fallido
│   │   │       │   ├── 📄 PendingPayment.jsx # Pago pendiente
│   │   │       │   └── 📄 SuccessPayment.jsx # Pago exitoso
│   │   │       ├── 📄 AllProducts.jsx   # Catálogo completo
│   │   │       ├── 📄 CartPage.jsx      # Página del carrito
│   │   │       ├── 📄 Home.jsx          # Página principal
│   │   │       ├── 📄 HowCanBuy.jsx     # Guía de compra
│   │   │       ├── 📄 ProductDetail.jsx # Detalle de producto
│   │   │       └── 📄 Purchase.jsx      # Página de compra
│   │   ├── 📁 redux/                   # Gestión de estado Redux
│   │   │   ├── 📁 actions/             # Acciones de Redux
│   │   │   │   ├── 📄 authActions.js   # Acciones de autenticación
│   │   │   │   ├── 📄 cartActions.js   # Acciones del carrito
│   │   │   │   ├── 📄 couponActions.js # Acciones de cupones
│   │   │   │   ├── 📄 productActions.js # Acciones de productos
│   │   │   │   ├── 📄 salesActions.js  # Acciones de ventas
│   │   │   │   └── 📄 userActions.js   # Acciones de usuarios
│   │   │   ├── 📁 reducer/             # Reducers de Redux
│   │   │   │   ├── 📄 authReducer.js   # Reducer de autenticación
│   │   │   │   ├── 📄 cartReducer.js   # Reducer del carrito
│   │   │   │   ├── 📄 couponReducer.js # Reducer de cupones
│   │   │   │   ├── 📄 productReducer.js # Reducer de productos
│   │   │   │   ├── 📄 salesReducer.js  # Reducer de ventas
│   │   │   │   └── 📄 userReducer.js   # Reducer de usuarios
│   │   │   └── 📄 store.js             # Configuración del store
│   │   ├── 📄 App.jsx                  # Componente principal
│   │   ├── 📄 index.css                # Estilos globales con Tailwind
│   │   └── 📄 main.jsx                 # Punto de entrada
│   ├── 📄 .eslintrc.cjs               # Configuración ESLint
│   ├── 📄 .gitignore                  # Archivos ignorados por Git
│   ├── 📄 index.html                  # HTML principal
│   ├── 📄 package.json                # Dependencias y scripts
│   ├── 📄 postcss.config.js           # Configuración PostCSS
│   ├── 📄 static.json                 # Configuración para deploy estático
│   ├── 📄 tailwind.config.js          # Configuración Tailwind CSS
│   ├── 📄 vercel.json                 # Configuración Vercel
│   └── 📄 vite.config.js              # Configuración Vite
├── 📁 server/                          # Backend Node.js con Express
│   ├── 📁 src/                         # Código fuente del backend
│   │   ├── 📁 Controllers/             # Controladores de la API
│   │   │   ├── 📁 coupon/              # Controladores de cupones
│   │   │   │   └── 📄 couponController.js # Lógica de cupones
│   │   │   ├── 📁 login/               # Controladores de autenticación
│   │   │   │   └── 📄 loginController.js # Lógica de login
│   │   │   ├── 📁 mails/               # Controladores de email
│   │   │   │   └── 📄 mailController.js # Lógica de emails
│   │   │   ├── 📁 mercadopago/         # Controladores de MercadoPago
│   │   │   │   ├── 📄 mpController.js  # Lógica de pagos
│   │   │   │   └── 📄 webhook.js       # Webhooks de MP
│   │   │   ├── 📁 sheets/              # Controladores de Google Sheets
│   │   │   │   ├── 📄 sheetsController.js # Lógica principal
│   │   │   │   ├── 📄 uploadImages.js  # Subida de imágenes
│   │   │   │   └── 📄 validation.js    # Validaciones
│   │   │   └── 📁 user/                # Controladores de usuarios
│   │   │       └── 📄 userController.js # Lógica de usuarios
│   │   ├── 📁 Helpers/                 # Funciones auxiliares
│   │   │   ├── 📄 dateUtils.js         # Utilidades de fecha
│   │   │   ├── 📄 emailTemplates.js    # Plantillas de email
│   │   │   ├── 📄 imageUtils.js        # Utilidades de imagen
│   │   │   └── 📄 validation.js        # Validaciones comunes
│   │   ├── 📁 Middleware/              # Middlewares de Express
│   │   │   ├── 📄 auth.js              # Middleware de autenticación
│   │   │   ├── 📄 cors.js              # Configuración CORS
│   │   │   ├── 📄 errorHandler.js      # Manejo de errores
│   │   │   ├── 📄 invalidRoute.js      # Rutas no válidas
│   │   │   ├── 📄 logger.js            # Logging de requests
│   │   │   ├── 📄 rateLimit.js         # Limitación de requests
│   │   │   └── 📄 uploadMiddleware.js  # Middleware de uploads
│   │   ├── 📁 Routes/                  # Definición de rutas
│   │   │   ├── 📄 cuponRoutes.js       # Rutas de cupones
│   │   │   ├── 📄 emailRoutes.js       # Rutas de email
│   │   │   ├── 📄 indexRoutes.js       # Rutas principales
│   │   │   ├── 📄 loginRoutes.js       # Rutas de autenticación
│   │   │   ├── 📄 mpRoutes.js          # Rutas de MercadoPago
│   │   │   ├── 📄 sheetsRoutes.js      # Rutas de Google Sheets
│   │   │   └── 📄 userRoutes.js        # Rutas de usuarios
│   │   └── 📄 app.js                   # Configuración principal
│   ├── 📁 uploads/                     # Directorio temporal de uploads
│   ├── 📄 .gitignore                  # Archivos ignorados por Git
│   ├── 📄 index.js                    # Servidor principal
│   ├── 📄 package.json                # Dependencias y scripts
│   └── 📄 vercel.json                 # Configuración Vercel
├── 📄 README.md                       # Documentación principal
├── 📄 TECHNICAL.md                    # Documentación técnica
└── 📄 SETUP.md                        # Guía de configuración
```

## 🔍 Descripción Detallada de Componentes

### Frontend (Client)

#### 🎨 Componentes UI Principales

**Header & Navigation**
```
📁 componentes/Ecommerce/Header/
├── 📄 Header.jsx           # Encabezado principal con logo y navegación
├── 📄 MobileMenu.jsx       # Menú responsive para móviles
└── 📄 SearchBar.jsx        # Barra de búsqueda de productos

📁 componentes/Ecommerce/Navbar/
├── 📄 Navbar.jsx           # Navegación principal del e-commerce
├── 📄 CategoryNav.jsx      # Navegación por categorías
└── 📄 UserMenu.jsx         # Menú de usuario (login/logout)
```

**Productos y Carrito**
```
📁 componentes/Ecommerce/Products/
├── 📄 ProductCard.jsx      # Tarjeta individual de producto
├── 📄 ProductGrid.jsx      # Grilla de productos
├── 📄 ProductFilter.jsx    # Filtros de productos
├── 📄 ProductSearch.jsx    # Búsqueda de productos
└── 📄 ProductSort.jsx      # Ordenamiento de productos

📁 componentes/Ecommerce/Cart/
├── 📄 Cart.jsx             # Componente principal del carrito
├── 📄 CartItem.jsx         # Item individual del carrito
├── 📄 CartSummary.jsx      # Resumen del carrito
├── 📄 StepIndicator.jsx    # Indicador de pasos del checkout
├── 📄 StepProducts.jsx     # Paso 1: Selección de productos
├── 📄 StepShipping.jsx     # Paso 2: Información de envío
└── 📄 StepPayment.jsx      # Paso 3: Método de pago
```

**Dashboard Administrativo**
```
📁 componentes/Dashboard/
├── 📁 Sidebar/
│   ├── 📄 Sidebar.jsx      # Barra lateral del dashboard
│   └── 📄 SidebarItem.jsx  # Items de navegación
├── 📁 Products/
│   ├── 📄 ProductForm.jsx  # Formulario de productos
│   ├── 📄 ProductList.jsx  # Lista de productos admin
│   ├── 📄 ProductEdit.jsx  # Edición de productos
│   └── 📄 ImageUpload.jsx  # Subida de imágenes
├── 📁 Sales/
│   ├── 📄 SalesList.jsx    # Lista de ventas
│   ├── 📄 SaleDetail.jsx   # Detalle de venta
│   └── 📄 SalesChart.jsx   # Gráficos de ventas
└── 📁 Users/
    ├── 📄 UserList.jsx     # Lista de usuarios
    ├── 📄 UserForm.jsx     # Formulario de usuarios
    └── 📄 UserDetail.jsx   # Detalle de usuario
```

#### 📊 Gestión de Estado (Redux)

**Structure del Store**
```javascript
store = {
  auth: {
    user: {},
    isAuth: boolean,
    loading: boolean,
    error: string
  },
  products: {
    items: [],
    categories: [],
    filters: {},
    loading: boolean
  },
  cart: {
    cartItems: [],
    total: number,
    cartError: string
  },
  sales: {
    sales: [],
    saleInfo: {},
    loading: boolean
  },
  users: {
    users: [],
    currentUser: {},
    loading: boolean
  },
  coupons: {
    coupons: [],
    validCoupon: {},
    discount: number
  }
}
```

**Flujo de Actions**
```
User Action → Action Creator → Reducer → Store Update → Component Re-render
```

### Backend (Server)

#### 🛣️ Estructura de Rutas

**API Endpoints por Módulo**
```
/api/
├── /login/                 # Autenticación
│   ├── POST /login         # Iniciar sesión
│   ├── POST /logout        # Cerrar sesión
│   └── POST /register      # Registrar usuario
├── /sheets/                # Google Sheets Operations
│   ├── GET /products       # Obtener productos
│   ├── POST /products      # Crear producto
│   ├── PUT /products/:id   # Actualizar producto
│   ├── DELETE /products/:id # Eliminar producto
│   ├── GET /sales          # Obtener ventas
│   ├── POST /sales         # Crear venta
│   └── POST /upload-images # Subir imágenes
├── /coupon/               # Gestión de cupones
│   ├── GET /              # Obtener cupones
│   ├── POST /             # Crear cupón
│   ├── PUT /:id           # Actualizar cupón
│   ├── DELETE /:id        # Eliminar cupón
│   └── POST /validate     # Validar cupón
├── /mp/                   # MercadoPago
│   ├── POST /create-preference # Crear preferencia
│   ├── POST /webhook      # Webhook de notificaciones
│   └── GET /payment/:id   # Estado de pago
├── /user/                 # Gestión de usuarios
│   ├── GET /users         # Obtener usuarios
│   ├── GET /:id           # Obtener usuario
│   ├── PUT /:id           # Actualizar usuario
│   └── DELETE /:id        # Eliminar usuario
└── /mails/                # Envío de emails
    ├── POST /send         # Enviar email
    └── POST /notification # Enviar notificación
```

#### 🎯 Controllers Pattern

**Estructura de un Controller**
```javascript
// Ejemplo: sheetsController.js
const sheetsController = {
  // GET /api/sheets/products
  getProducts: async (req, res) => {
    try {
      const products = await sheetsService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // POST /api/sheets/products
  createProduct: async (req, res) => {
    try {
      const product = await sheetsService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
```

#### 🔧 Middleware Chain

**Request Lifecycle**
```
Request → CORS → Morgan → Body Parser → Cookie Parser → Auth → Route Handler → Error Handler → Response
```

**Middleware por Propósito**
- **cors.js**: Configuración de CORS para dominios permitidos
- **auth.js**: Verificación de tokens Firebase
- **uploadMiddleware.js**: Manejo de archivos con Multer
- **errorHandler.js**: Manejo centralizado de errores
- **logger.js**: Logging de requests y responses

## 📱 Responsiveness y UX

### Breakpoints de Tailwind CSS
```css
/* Mobile First Approach */
sm: '640px'     // Tablet pequeña
md: '768px'     // Tablet
lg: '1024px'    // Desktop
xl: '1280px'    // Desktop grande
2xl: '1536px'   // Desktop extra grande
```

### Componentes Responsive
```javascript
// Ejemplo de componente responsive
const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## 🔄 Flujos de Datos Principales

### Flujo de Compra
```
1. ProductGrid → ProductCard → addToCart (Redux Action)
2. Cart Component → Checkout Process (3 pasos)
3. Payment → MercadoPago API → Webhook → Google Sheets
4. Email Notification → Customer Confirmation
```

### Flujo de Administración
```
1. Dashboard Login → Firebase Auth
2. Product Management → Google Sheets API
3. Sales Review → Sheets Data Processing
4. Reports Generation → Data Visualization
```

### Flujo de Autenticación
```
1. User Input → Firebase Auth
2. Token Generation → Local Storage
3. Protected Routes → Token Validation
4. API Requests → Token Verification
```

## 🛠️ Configuración de Desarrollo

### Hot Reload Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
```

### ESLint Configuration
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
  }
};
```

## 📦 Dependencias Clave

### Frontend Dependencies
```json
{
  "production": {
    "react": "UI Framework",
    "redux": "State Management", 
    "axios": "HTTP Client",
    "firebase": "Authentication",
    "@mercadopago/sdk-react": "Payment Processing",
    "react-router-dom": "Routing",
    "tailwindcss": "CSS Framework"
  },
  "development": {
    "vite": "Build Tool",
    "eslint": "Code Linting",
    "@vitejs/plugin-react": "React Plugin"
  }
}
```

### Backend Dependencies
```json
{
  "production": {
    "express": "Web Framework",
    "googleapis": "Google APIs",
    "firebase-admin": "Server Auth",
    "cloudinary": "Image Storage",
    "mercadopago": "Payment Processing",
    "nodemailer": "Email Service"
  },
  "development": {
    "nodemon": "Auto-restart",
    "morgan": "HTTP Logging"
  }
}
```

---

*Esta estructura está diseñada para ser escalable y mantenible, siguiendo las mejores prácticas de desarrollo full-stack.*