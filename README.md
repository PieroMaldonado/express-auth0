# restaurant-booking-app
## Descripción
Este proyecto contempla un login donde se autentica y luego autoriza a un usuario administrador para realizar las funciones de varios CRUD contemplados. Para lograr esto se usó `node.js`, `Express` y `MySQL`

## Instalar el proyecto
1. Instalar `MySQL` y crear una base de datos con el nombre `restaurantdb`
2. Descargar el script de la DB y ejecutarlo
3. Clonar el repositorio
4. Instalar [node.js](https://nodejs.org/en/download/ "node.js") y luego ejecutar el comando `npm install` en la raiz del proyecto

5. Configurar los archivos de conexión en la ruta `/config`<br>
  5.1. host     : '`localhost`', // MYSQL HOST NAME<br>
  5.2 user     : '`root`', // MYSQL USERNAME<br>
  5.3 password : '`admin`', // MYSQL PASSWORD<br>
  5.4 database : '`biblioteca`' // MYSQL DB NAME

## Ejecutar el proyecto
Ejecutar el comando `nodemon start` o `npm start`
<br>Primero se debe registrar un nuevo usuario y logearse; una vez logeado el usuario ya podrá acceder a las funciones del CRUD extendido
