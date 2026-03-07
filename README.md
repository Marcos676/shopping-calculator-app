# Applicacion de seguimiento de compras con descuento
Esta aplicacion permite a los usuarios ingresar el precio original de un producto, el porcentaje de descuento y la cantidad de productos que desean comprar. Luego, la aplicación calcula el precio final después del descuento y muestra el total a pagar.
Además, los usuarios pueden guardar su historial de compras para futuras referencias y crear una cuenta para acceder a sus compras guardadas.

## Funcionalidades
- Calculo de descuento: La aplicación calcula el precio final después de aplicar el descuento al precio original.
- Carrito de compras: Permite a los usuarios agregar múltiples productos al carrito y muestra el total acumulado.
- Edición de productos: Los usuarios pueden editar los detalles de los productos en el carrito, como el nombre, precio original, el porcentaje de descuento y la cantidad.
- Borrar productos: Los usuarios pueden eliminar productos del carrito si ya no desean comprarlos.
- Guardar historial: Los usuarios pueden guardar su historial de compras para futuras referencias.
- Registro de usuarios: Permite a los usuarios crear una cuenta para acceder a sus compras guardadas y su historial.

## Tecnologias usadas
### Cliente
- React
- JavaScript
- HTML
- CSS
### Servidor
- Node.js
- Express
- Sequelize
- MySQL

## Como usarlo?
1. Realizar un clonado `git clone` `https://github.com/Marcos676/porcent-react-app`
2. Navegar a la carpeta del proyecto usando `cd porcent-react-app`
### Para el servidor
1. Navegar a la carpeta del servidor usando `cd server`
2. Abrir editor de código y hacer en la terminal `npm install`
3. Crear un archivo `.env` basado en el archivo `.env.example`
4. Ejecutar `npm run deploy` para crear la base de datos y migrar los modelos
5. Ejecutar `npm run start` para iniciar el servidor
### Para el cliente
1. Navegar a la carpeta del cliente usando `cd client`
2. Abrir editor de código y hacer en la terminal `npm install`
3. Ejecutar el proyecto usando `npm start`
4. Abrir el navegador y acceder a `http://localhost:3000` para usar la aplicación

## Detalles del proyecto
### Estructura del código
- El proyecto está dividido en dos partes principales: el cliente (frontend) y el servidor (backend).
- El cliente está construido con React y se encarga de la interfaz de usuario y la interacción con el usuario.
- El servidor está construido con Node.js y Express, y se encarga de manejar las solicitudes del cliente, interactuar con la base de datos y gestionar la lógica de negocio.
#### Librerías utilizadas del cliente
- React Router: Para manejar la navegación entre diferentes páginas de la aplicación.
- React Hooks: Para manejar el estado local y los efectos secundarios en los componentes de React.
- React cookie: Para manejar las cookies de autenticación y mantener la sesión del usuario activa.
- React router dom: Para manejar la navegación entre diferentes rutas de la aplicación.
#### Librerías utilizadas del servidor
- Express: Para crear el servidor y manejar las rutas y solicitudes HTTP.
- Sequelize: Para interactuar con la base de datos MySQL de manera más sencilla y estructurada.
- MySQL2: Para conectar el servidor con la base de datos MySQL.
- Dotenv: Para manejar las variables de entorno y mantener la configuración del proyecto segura.
- Jsonwebtoken: Para manejar la autenticación de usuarios mediante tokens JWT.
- Cookie parser: Para manejar las cookies de autenticación y mantener la sesión del usuario activa.
- Argon2: Para encriptar las contraseñas de los usuarios y mejorar la seguridad de la aplicación.
- Express-validator: Para validar los datos ingresados por el usuario y evitar errores en el cálculo del descuento.
- Cors: Para permitir solicitudes desde el cliente al servidor sin problemas de CORS.

### Base de datos
- La base de datos utilizada es MySQL, y se maneja a través de Sequelize.
- La base de datos contiene tablas para usuarios y el historial de compras con el nombre de Tickets.
- La tabla de usuarios almacena información como el nombre de usuario, correo electrónico y contraseña encriptada.
- La tabla de tickets almacena información sobre las compras realizadas por los usuarios, incluyendo el nombre que se le da a la compra, un compo JSON con los detalles de los productos comprados, y la fecha de la compra.

### Seguridad
- Las contraseñas de los usuarios se encriptan utilizando Argon2 para mejorar la seguridad de la aplicación.
- La autenticación de usuarios se maneja mediante tokens JWT (access tokens y refreshTokens) en cookies seguras, lo que permite mantener la sesión del usuario activa sin necesidad de almacenar información sensible en el cliente.
- Se utilizan las librerías `express-validator` y `cors` para validar los datos ingresados por el usuario y evitar errores en el cálculo del descuento, así como para permitir solicitudes desde el cliente al servidor sin problemas de CORS.