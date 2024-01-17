const express = require('express');
const app = express();
const cors = require('cors');
//const monmodule = require('./monmodule');
const dbConnection = require('./db');//Importe la connexion à la base 
const createTable = require('./ct');//Importe la création des tables
const setupRoutes = require('./route');//Importe les routes

// app.get('/hello', function(request, response) {
//     monmodule.direBonjour();
//     monmodule.direBye();
// });

app.use(express.json());
app.use(cors());

createTable(dbConnection);//Appel les fonctions de créations des tables
setupRoutes(dbConnection, app);//Apel les routes

app.listen(5000, ()=> {
	console.log('Server is listening @5000') ;
});