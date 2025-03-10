# BackendTesorosIndia

Estructura del proyecto BackendTesorosIndia, desarrollado con Node.js y Express.

## Descripción de Carpetas y Archivos

### `config/`
Contiene archivos de configuración para la base de datos, autenticación y variables de entorno.

### `controllers/`
Los controladores manejan la lógica de las rutas y actúan como intermediarios entre las solicitudes HTTP y los servicios.

### `models/`
Define los modelos de la base de datos utilizando Mongoose (para MongoDB) o Sequelize (para SQL).

### `repositories/`
Encapsula la lógica de acceso a la base de datos, separando la lógica de negocio de la interacción directa con la base de datos.

### `services/`
Contiene la lógica de negocio de la aplicación, separada de los controladores para facilitar el mantenimiento y las pruebas.

### `routes/`
Define las rutas de la API y las asocia con los controladores correspondientes.

### `middleware/`
Incluye middlewares personalizados para autenticación, manejo de errores y validación de datos.

### `utils/`
Utilidades y funciones de ayuda, como el envío de correos electrónicos, generación de tokens y logging.

### `tests/`
Carpeta dedicada a pruebas unitarias y de integración para controladores, servicios y repositorios.

### `app.js`
Archivo principal de la aplicación donde se configura Express y se inicializa el servidor.

---

Este archivo `README.md` proporciona una visión general de la estructura del proyecto y su organización. Puedes personalizarlo según las necesidades específicas de tu equipo o proyecto.
