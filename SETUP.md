# Guía de Configuración - Nina MZA

## 🚀 Configuración Inicial del Proyecto

Esta guía te ayudará a configurar el proyecto Nina MZA desde cero en tu entorno de desarrollo local.

## 📋 Prerrequisitos

### Software Requerido
- **Node.js** (versión 16 o superior) - [Descargar](https://nodejs.org/)
- **npm** o **yarn** (viene con Node.js)
- **Git** - [Descargar](https://git-scm.com/)
- Editor de código (recomendado: **VS Code**)

### Cuentas de Servicios Externos
1. **Firebase** - [Console](https://console.firebase.google.com/)
2. **Google Cloud** (para Sheets API) - [Console](https://console.cloud.google.com/)
3. **Cloudinary** - [Dashboard](https://cloudinary.com/console)
4. **MercadoPago** - [Developers](https://developers.mercadopago.com/)

## 🛠️ Instalación Paso a Paso

### 1. Clonar el Repositorio
```bash
# Clonar el repositorio
git clone https://github.com/NahuelArg/nina-mza.git
cd nina-mza

# Verificar la estructura
ls -la
# Deberías ver: client/ server/ README.md TECHNICAL.md
```

### 2. Configurar el Servidor (Backend)

```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env  # Si existe, sino crear manualmente
```

#### Crear `server/.env`
```env
# Puerto del servidor
PORT=3001
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project.iam.gserviceaccount.com

# Google Sheets API
GOOGLE_SHEETS_CLIENT_EMAIL=sheets-service@tu-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu-private-key\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1234567890abcdefghijklmnop

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=tu-api-secret

# MercadoPago
MP_ACCESS_TOKEN=APP_USR-1234567890123456-123456-abcdef1234567890abcdef1234567890-123456789

# Email (opcional - para notificaciones)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_SERVICE=gmail

# WhatsApp (para enlaces directos)
WHATSAPP_NUMBER=+5492612345678
```

### 3. Configurar el Cliente (Frontend)

```bash
# Navegar al directorio del cliente (desde la raíz del proyecto)
cd client

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
touch .env
```

#### Crear `client/.env`
```env
# API del servidor
VITE_API_URL=http://localhost:3001

# Firebase Client SDK
VITE_FIREBASE_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678
VITE_FIREBASE_AUTH_DOMAIN=tu-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef

# MercadoPago Public Key
VITE_MP_PUBLIC_KEY=APP_USR-12345678-123456-12345678901234567890-123456789

# URLs para redirección (desarrollo)
VITE_SUCCESS_URL=http://localhost:5173/success
VITE_FAILURE_URL=http://localhost:5173/failure
VITE_PENDING_URL=http://localhost:5173/pending
```

## 🔧 Configuración de Servicios Externos

### Firebase Setup

#### 1. Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Crear un proyecto"
3. Sigue los pasos de configuración
4. Habilita Authentication y Firestore

#### 2. Configurar Authentication
1. Ve a Authentication > Sign-in method
2. Habilita "Correo electrónico/contraseña"
3. Configura dominio autorizado: `localhost`

#### 3. Obtener Credenciales
1. **Para el Cliente**: Ve a Configuración del proyecto > General > Tus apps
2. **Para el Servidor**: Ve a Configuración del proyecto > Cuentas de servicio
3. Genera una nueva clave privada y descarga el JSON

### Google Sheets Setup

#### 1. Crear Spreadsheet
1. Crea un nuevo Google Sheets
2. Crea las siguientes hojas: `Products`, `Sales`, `Coupons`, `Users`
3. Copia el ID del spreadsheet desde la URL

#### 2. Habilitar API
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita Google Sheets API
3. Crea credenciales de cuenta de servicio
4. Comparte el spreadsheet con el email de la cuenta de servicio

### Cloudinary Setup

#### 1. Crear Cuenta
1. Regístrate en [Cloudinary](https://cloudinary.com/)
2. Ve al Dashboard
3. Copia Cloud Name, API Key y API Secret

#### 2. Configurar Presets (Opcional)
1. Ve a Settings > Upload
2. Crea un upload preset para optimizar imágenes

### MercadoPago Setup

#### 1. Crear Aplicación
1. Ve a [MercadoPago Developers](https://developers.mercadopago.com/)
2. Crea una nueva aplicación
3. Obtén las credenciales de prueba y producción

#### 2. Configurar Webhooks
1. En tu aplicación de MercadoPago
2. Configura URL de notificaciones: `https://tu-api.com/api/mp/webhook`
3. Selecciona eventos de pago

## 🏃‍♂️ Ejecutar el Proyecto

### Modo Desarrollo

#### Terminal 1 - Servidor
```bash
cd server
npm run dev
```
El servidor se ejecutará en `http://localhost:3001`

#### Terminal 2 - Cliente
```bash
cd client
npm run dev
```
El cliente se ejecutará en `http://localhost:5173`

### Verificar Funcionamiento

1. **Frontend**: Abre `http://localhost:5173`
2. **Backend**: Verifica `http://localhost:3001/api`
3. **Health Check**: Ambos servicios deben responder correctamente

## 🛠️ Configuración de Desarrollo

### VS Code Extensions Recomendadas
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Settings.json para VS Code
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  }
}
```

### Git Hooks (Opcional)
```bash
# Instalar husky para pre-commit hooks
npm install --save-dev husky
npx husky install

# Agregar hook de lint
npx husky add .husky/pre-commit "npm run lint"
```

## 🔍 Solución de Problemas Comunes

### Error: "Module not found"
```bash
# Limpiar cache e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS
- Verificar que las URLs en `server/src/app.js` incluyan tu localhost
- Asegurar que el cliente use la URL correcta del servidor

### Error de Firebase
- Verificar que todas las variables de entorno estén configuradas
- Comprobar que el proyecto Firebase esté activo
- Revisar que las reglas de Firestore permitan acceso

### Error de Google Sheets
- Verificar permisos de la cuenta de servicio
- Comprobar que el spreadsheet esté compartido
- Verificar formato de las claves privadas (incluir `\n`)

### Error de Cloudinary
- Verificar credenciales en el dashboard
- Comprobar que la carpeta `uploads/` exista en el servidor

## 📝 Scripts Útiles

### Linting y Formatting
```bash
# Cliente
cd client
npm run lint          # Verificar errores de linting
npm run lint:fix      # Corregir errores automáticamente

# Servidor (si tienes eslint configurado)
cd server
npm run lint
```

### Build para Producción
```bash
# Cliente
cd client
npm run build

# Servidor
cd server
npm start
```

### Testing (si tienes tests configurados)
```bash
npm test              # Ejecutar tests
npm test:watch        # Ejecutar tests en modo watch
npm test:coverage     # Generar reporte de cobertura
```

## 🚀 Despliegue

### Preparar para Producción

#### 1. Variables de Entorno de Producción
- Actualizar URLs en archivos `.env`
- Usar credenciales de producción de MercadoPago
- Configurar dominios en Firebase Auth

#### 2. Build del Cliente
```bash
cd client
npm run build
# Los archivos se generarán en dist/
```

#### 3. Configurar Servidor
```bash
cd server
# Asegurar que NODE_ENV=production
npm start
```

### Plataformas de Deploy Recomendadas

#### Frontend (Cliente)
- **Vercel** (recomendado) - Deploy automático desde Git
- **Netlify** - Alternativa confiable
- **GitHub Pages** - Para proyectos simples

#### Backend (Servidor)
- **Railway** - Fácil configuración
- **Render** - Plan gratuito disponible
- **Heroku** - Tradicional y confiable

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Revisar logs**: Ambos servicios muestran errores en consola
2. **Variables de entorno**: Verificar que todas estén configuradas
3. **Permisos**: Comprobar accesos a servicios externos
4. **Documentación**: Revisar `TECHNICAL.md` para detalles técnicos

---

*Esta guía cubre la configuración básica. Para configuraciones avanzadas, consulta la documentación técnica.*