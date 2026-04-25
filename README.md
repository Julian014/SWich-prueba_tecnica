# SWinch - Prueba Técnica

Sistema de autenticación y gestión de sesión para SWinch, desarrollado con arquitectura Frontend + Backend.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- React Google ReCAPTCHA

### Backend

- Node.js
- Express
- MySQL
- JWT (JSON Web Token)
- Bcrypt
- Nodemailer

### Base de datos

- MySQL

---

# Instalación del proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/Julian014/SWich-prueba_tecnica/tree/main/backend
cd SWich-prueba_tecnica
```

---

# Configuración Frontend

Ir a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar proyecto:

```bash
npm run dev
```

El frontend correrá en:

```text
http://localhost:5173
```

---

# Configuración Backend

Ir a la carpeta backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor:

```bash
npm run dev
```

El backend correrá en:

```text
http://localhost:3000
```

---

# Variables de entorno Backend

Crear archivo `.env` dentro de:

```text
backend/.env
```

Configurar:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASS=

FRONTEND_URL=http://localhost:5173
```

---

# Configuración base de datos

Crear base de datos:

```sql
CREATE DATABASE Swinch;
```

Tabla users:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  reset_token TEXT NULL,
  reset_token_expires DATETIME NULL,
  password_changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

# Funcionalidades implementadas

## Registro de usuario

Permite crear usuario validando:

- email válido
- contraseña segura

Validaciones:

- mínimo 8 caracteres
- mínimo una mayúscula
- mínimo una minúscula
- mínimo un número
- mínimo un carácter especial

---

## Login

Autenticación segura usando:

- JWT
- Bcrypt

Incluye:

- captcha obligatorio

---

## Recuperación de contraseña

Flujo completo:

1. usuario solicita recuperación
2. backend genera token
3. se envía correo
4. usuario restablece contraseña

---

## Bloqueo por intentos fallidos

Después de 3 intentos fallidos:

- bloqueo temporal por 15 minutos

Actualmente implementado en frontend con localStorage.

---

## Expiración de sesión

Sesión expira después de:

```text
15 minutos
```

Implementado con:

- JWT expiration
- contador visual en Home

---

## Cambio obligatorio de contraseña

Política de seguridad:

```text
cada 3 meses
```

Si expira:

- el sistema obliga cambio de contraseña

---

# Flujo de recuperación de contraseña

Ruta backend:

```text
POST /api/auth/forgot-password
```

Ruta backend reset:

```text
POST /api/auth/reset-password/:token
```

Ruta frontend reset:

```text
/reset-password/:token
```

---

# Notas importantes

## Gmail + Nodemailer

Para usar recuperación de contraseña:

Configurar App Password de Gmail.

No usar contraseña normal.

Pasos:

Google Account → Seguridad → Verificación en 2 pasos → Contraseñas de aplicación

---

# Estructura del proyecto

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/

backend/
├── src/
│   ├── controllers/
│   ├── database/
│   ├── routes/
```

---

# Autor

Carlos Serna
