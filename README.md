# 🛒 Shopping Calculator App

Aplicación web fullstack para gestionar y calcular costos de compras en tiempo real con autenticación segura, persistencia de carrito y historial de transacciones. Diseñada específicamente para uso móvil en supermercados.

🔐 **Autenticación con JWT** | 📱 **Mobile-First** | 🚀 **Deployado en Railway** | 💾 **Persistencia de Datos**

---

## 🚀 Demo en Vivo

**[🔗 Acceder a la aplicación aquí](https://shopping-calculator-production.up.railway.app/)**

Prueba las siguientes credenciales:
- **Email:** `demo@test.com`
- **Contraseña:** `Demo1234`

O crea tu propia cuenta para explorar todas las funcionalidades.

---

## 💡 ¿Por Qué Existe Este Proyecto?

En el día a día, es común **no saber con precisión cuánto pagarás en una compra** hasta llegar a la caja.

Este proyecto nació de una **necesidad real**: simplificar el control de gastos y descuentos mientras compras, especialmente en contextos móviles donde cada segundo cuenta.

La solución que entrego permite:

✅ **Calcular descuentos al instante** - Sin calculadora ni papel  
✅ **Ver el ahorro total** - Saber exactamente cuánto se economiza  
✅ **Persistir compras** - Guardar tickets para auditoría o control  
✅ **Controlar gastos** - Presupuesto bajo control  

---

## 📸 Screenshots

| Calculadora | Carrito | Login |
|------------|---------|-------|
| ![Calculadora](images/screenshot-calcular.png) | ![Carrito](images/screenshot-carrito.png) | ![Login](images/screenshot-registro.png) |

| Tickets | Detalle Ticket | Editar Producto |
|---------|-----------------|-----------------|
| ![Tickets](images/screenshot-tickets.png) | ![Detalle](images/screenshot-detalle-ticket.png) | ![Editar](images/screenshot-editar-producto.png) |

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Registro e inicio de sesión con validación
- **Autenticación JWT con Access + Refresh Tokens**
- Tokens almacenados en cookies seguras (`httpOnly`, `secure`)
- Renovación automática de sesión (Access: 1h | Refresh: 7 días)
- Middleware backend que protege rutas privadas
- Validaciones en frontend y backend
- Password hashing seguro

### 🛒 Gestión de Compras Avanzada
- ➕ Agregar productos al carrito dinámicamente
- ✏️ Editar cantidad y precio de productos
- ❌ Eliminar productos del carrito
- 🧮 **Cálculo automático en tiempo real:**
  - Precio con descuento por producto
  - Ahorro individual y total
  - Monto final incluyendo descuentos
  - Visualización clara del desglose

### 💾 Persistencia y Historial
- Guardar carrito como "Ticket" (compra completada)
- Historial de compras por usuario
- Visualización detallada de cada ticket
- Auditoría de transacciones
- Imposibilidad de editar/eliminar tickets (integridad)

### 📱 Experiencia de Usuario
- Interfaz optimizada para **uso en supermercado**
- **Mobile-first responsive** (funciona en cualquier dispositivo)
- Flujo de interacción rápido e intuitivo
- Accesible para usuarios sin experiencia técnica
- Feedback visual claro en cada acción

---

## 🛠 Stack Tecnológico

### Frontend
- **React** - Interfaz moderna y reactiva
- **React Router** - Navegación SPA
- **React Cookies** - Persistencia de estado
- **JavaScript (ES6+)** - Lógica de cliente

### Backend
- **Node.js** - Runtime JavaScript en servidor
- **Express.js** - Framework web robusto
- **MySQL** - Base de datos relacional
- **Sequelize ORM** - Mapeo objeto-relacional

### Autenticación & Seguridad
- **JWT** (JSON Web Tokens) - Access + Refresh Token
- **Cookies Seguras** - httpOnly, Secure, SameSite
- **Password Hashing** - Encriptación de contraseñas
- **Middleware de Autenticación** - Protección de rutas

### DevOps e Infraestructura
- **Docker** - Containerización de servicios
- **Docker Compose** - Orquestación local
- **Railway** - Despliegue en producción
- **Git** - Control de versiones

### Desarrollo
- **REST API** - Arquitectura estándar
- **Migrations** - Control de esquema BD
- **Validaciones** - Frontend + Backend
- **Separación MVC** - Código mantenible

---

## 🏗 Arquitectura Detallada

### Base de Datos (MySQL)

```sql
-- Tabla de Usuarios
Users
├── id (PK)
├── name
├── email (UNIQUE)
└── password (hashed)

-- Tabla de Tickets (Compras guardadas)
Tickets
├── id (PK)
├── userId (FK) → Users
├── name
├── productList (JSON)
├── totalPrice
├── totalDiscount
├── createdAt
└── updatedAt
```

### Backend (Node.js + Express)

```
server/
├── controllers/           # Lógica de negocios
│   ├── authController.js
│   ├── ticketController.js
│   └── userController.js
├── routes/               # Definición de endpoints
│   ├── auth.js
│   ├── tickets.js
│   └── users.js
├── middlewares/          # Autenticación, validación
│   ├── authMiddleware.js
│   └── errorHandler.js
├── validations/          # Esquemas de validación
├── database/             # Modelos y migrations
│   ├── models/
│   └── migrations/
└── app.js               # Configuración principal
```

**Patrón MVC:** Separación clara entre modelos, vistas y controladores

### Frontend (React)

```
client/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas principales
│   │   ├── Home
│   │   ├── Login
│   │   ├── Register
│   │   ├── Calculator
│   │   └── Tickets
│   ├── context/         # Estado global
│   ├── hooks/           # Hooks personalizados
│   ├── services/        # Llamadas API
│   └── App.js           # Enrutamiento
```

**Características:**
- Protección de rutas (PrivateRoute)
- Manejo de estado local con hooks
- Integración con API backend
- Persistencia con cookies

---

## 📊 Flujos Principales

### 1️⃣ Autenticación y Sesión

```
Usuario → Login → Validación Backend → JWT Tokens → Cookies Seguras
                                         ↓
                              Access Token (1h) + Refresh Token (7d)
                                         ↓
                              Si expira → Refrescar automáticamente
```

### 2️⃣ Carrito y Cálculo

```
Agregar Producto → Calcular Descuento → Actualizar Total → Mostrar en Carrito
                                              ↓
                              Guardar como Ticket → BD
```

---

## 🚀 Instalación y Ejecución

### Con Docker (Recomendado) 🐳

```bash
# Clonar repositorio
git clone https://github.com/Marcos676/shopping-calculator-app.git
cd shopping-calculator-app

# Crear archivo .env
cp .env.example .env

# Ejecutar servicios
docker compose -f docker-compose-dev.yml up

# Acceder a:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Sin Docker (Instalación Manual)

#### Backend
```bash
cd server

# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env

# Ejecutar migrations
npm run deploy:db

# Iniciar servidor
npm run start
# Servidor en: http://localhost:5000
```

#### Frontend
```bash
cd client

# Instalar dependencias
npm install

# Iniciar aplicación
npm start
# Aplicación en: http://localhost:3000
```

---

## 🌐 Despliegue en Producción

La aplicación está desplegada en **Railway** con:

- ✅ **Backend** - API REST ejecutándose
- ✅ **Frontend** - Interfaz en vivo
- ✅ **Base de datos MySQL** - Datos persistentes

**Configuración:**
- Variables de entorno separadas por ambiente
- Servicio de base de datos aislado
- SSL/TLS habilitado

---

## 📚 Desafíos Técnicos y Aprendizajes

A través de este proyecto profundicé en:

### 🔐 Seguridad y Autenticación
- Flujos JWT con Access + Refresh Tokens
- Gestión segura de cookies (httpOnly, Secure)
- Diferenciación entre Access Token (corta duración) y Refresh Token (larga duración)
- Implementación de middleware de autenticación

### 🎯 Arquitectura Backend
- Patrón MVC y separación de responsabilidades
- Diseño de rutas RESTful
- Validaciones en múltiples capas
- Manejo de errores consistente

### 💾 Base de Datos
- Modelado relacional con MySQL
- Migrations para versionamiento de esquema
- Asociaciones con Sequelize ORM
- Optimización de queries

### 📱 Desarrollo Frontend
- Protección de rutas en React
- Persistencia con cookies
- Manejo de estado local eficiente
- Mobile-first responsive design

### 🐳 DevOps y Deployment
- Containerización con Docker
- Orquestación local con Docker Compose
- Deployment en plataformas cloud (Railway)
- Configuración de variables de entorno

### ✅ Prácticas de Desarrollo
- Validaciones frontend + backend
- Manejo de errores y feedback de usuario
- Control de versiones con Git
- Documentación clara y completa

---

## ⚠️ Limitaciones Actuales

| Limitación | Descripción | Impacto |
|-----------|-------------|--------|
| Carrito en cookies | No sincroniza entre dispositivos | Datos locales solo |
| Tickets inmutables | No se pueden editar/eliminar | Por seguridad de auditoría |
| Sin tests | Sin cobertura de testing | Oportunidad de mejora |
| UI desktop | Diseño orientado solo a mobile | Necesita responsive mejorada |
| Sin estado global | Estado local por componentes | Oportunidad de Redux/Context |

---

## 🎯 Mejoras Futuras

### Corto Plazo
- [ ] Migración a **TypeScript** para mejor type-safety
- [ ] Implementar capa de **servicios** en backend
- [ ] Agregar **tests** (Jest + Supertest + React Testing Library)
- [ ] Mejorar UI para pantallas **desktop**

### Mediano Plazo
- [ ] Migrar carrito a backend (sincronización entre dispositivos)
- [ ] Implementar **estado global** con Redux o Context + useReducer
- [ ] Agregar **interceptors** para manejo automático de tokens
- [ ] Sistema de **categorías y búsqueda** de productos

### Largo Plazo
- [ ] Dashboard de **analytics** de gastos
- [ ] Sistema de **reportes mensuales**
- [ ] **Exportación a PDF** de tickets
- [ ] Autenticación con **OAuth** (Google, GitHub)
- [ ] **Notificaciones push** de presupuesto excedido

---

## 🤝 Contribuciones

Este es un proyecto personal en desarrollo activo. 

Si tienes sugerencias de mejora o encuentras bugs, puedes:
- Abrir un **issue** en GitHub
- Hacer un **fork** y proponer cambios
- Contactarme directamente

---

## 📄 Licencia

Proyecto de código abierto. Libre para usar con fines educativos y personales.

---

## 👨‍💻 Autor

**Marcos676**

- 🔗 GitHub: [@Marcos676](https://github.com/Marcos676)
- 💼 Desarrollador Fullstack
- 🛠 Especialmente en React, Node.js, MySQL

---

## 📞 Contacto y Links

- **Demo en vivo:** [shopping-calculator-production.up.railway.app](https://shopping-calculator-production.up.railway.app/)
- **Repositorio:** [github.com/Marcos676/shopping-calculator-app](https://github.com/Marcos676/shopping-calculator-app)

---

**Estado del Proyecto:** 🚀 En mantenimiento activo  
**Última actualización:** Mayo 2026  
**Versión:** 1.0.0

