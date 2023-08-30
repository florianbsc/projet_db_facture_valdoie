// recuperaction des données dans la base de données en sql pour les afficher sur un page internet en local

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const courrierController = require('./courrierController'); // Assurez-vous que le chemin est correct
const crypto = require('crypto'); // Importez le module crypto pour gérer le hachage MD5


require('dotenv').config()
console.log('DOTENV config :', process.env)


const app = express();
const port = process.env.PORT || 3006;



// varriables d'environement
// il faudra les mettrent dans un fichier .env et mettre que les lien dans le code

const connection = mysql.createConnection({

host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,

});

connection.connect();
app.use(cors());
app.use(express.json()); // Ajoutez ce middleware pour analyser les données JSON du corps


//fonctin pour recuper toutes les données constituant la basse de données
app.get('/api/getData', courrierController.getCourrier)


// fonction pour recupere une donné specifique
app.get('/api/getSpecificCourrier/:id', courrierController.getSpecififcCourrier)


// API pour supprimer un élément par son ID
//fonction pour supprimer un donnée spéficique avec son ID
app.delete('/api/deleteItem/:id',courrierController.deleteItem )


//fonction pour recuper la table centre
app.get('/api/getDataCentre',courrierController.getDataCentre)


//fonction pour ajt un courrier
app.post('/api/addCourrier', courrierController.addCourrier)


//fonction qui lie l'id du courrier a l'id de l'utilisatuer
app.get('/api/getCourrierByUser/:id', courrierController.getCourrierByUser)


//fonction pour MAJ le courrier
app.put('/api/updateCourrier/:id', courrierController.updateCourrier);

app.post(`/api/login/`, courrierController.login);

app.post(`/api/getUserInfos/`, courrierController.getUserInfos)

//fonction message d'indication d'etat du serveur en marche
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

