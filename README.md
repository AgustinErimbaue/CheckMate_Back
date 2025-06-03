# To-Do API

API RESTful para gestión de usuarios y tareas (To-Do), desarrollada con **Node.js**, **Express**, **MongoDB** y **JWT** para autenticación.

---

## Características

- Registro, login y logout de usuarios
- CRUD de tareas personales
- Autenticación con JWT
- Asociación de tareas a usuarios
- Pruebas automáticas con Jest y Supertest
- Soporte para despliegue en Render

---

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo

   ```

2. **Instala las dependencias:**

npm install

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:

   ```env
   PORT=8080
   MONGO_URI=tu_cadena_de_conexion_mongodb
   JWT_SECRET=tu_secreto_jwt
   ```

4. **Inicia la aplicación:**
   ```bash
   npm start
   ```

---

## Uso

- **Registro de usuario:** `POST /api/auth/register`
- **Login de usuario:** `POST /api/auth/login`
- **Logout de usuario:** `POST /api/auth/logout`
- **Crear tarea:** `POST /api/todos`
- **Obtener tareas:** `GET /api/todos`
- **Actualizar tarea:** `PUT /api/todos/:id`
- **Eliminar tarea:** `DELETE /api/todos/:id`

---

## Pruebas

Para ejecutar las pruebas automáticas, utiliza:

```bash
npm test
```

---

## Despliegue en Render

1. Crea una nueva aplicación web en Render.
2. Conecta tu repositorio de GitHub.
3. Establece las variables de entorno en la configuración de la aplicación en Render.
4. Inicia el despliegue.

---

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un **issue** o un **pull request** para discutir cambios potenciales.

---


## Contacto

- Tu Nombre - [tu.email@ejemplo.com](agustibernabe@gmail.com)
- GitHub: [tu-usuario](https://www.linkedin.com/in/agustinerimbaue/)
- LinkedIn: [tu-perfil](https://www.linkedin.com/in/tu-perfil/)
