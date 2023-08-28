// recuperaction des données dans la base de données en sql pour les afficher sur un page internet en local

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
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
app.get('/api/getData', (req, res) => {
  const query = 'SELECT * FROM courrier, centre WHERE courrier.centre_courrier = centre.id_centre';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ajoutez ceci dans votre fichier server.js
// fonction pour recupere une donné specifique
app.get('/api/getSpecificCourrier/:id', (req, res) => {
    const courrierId = req.params.id;
    const query = 'SELECT * FROM courrier WHERE id_courrier = ?';
   
    connection.query(query, [courrierId], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du courrier' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: 'Courrier non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  });
  
  
  

// API pour supprimer un élément par son ID
//fonction pour supprimer un donnée spéficique avec son ID
app.delete('/api/deleteItem/:id', (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM courrier WHERE id_courrier = ?';
   
    connection.query(query, [itemId], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'élément' });
      } else {
        res.status(200).json({ message: 'Élément supprimé avec succès' });
      }
    });
  });

//fonction pour recuper la table centre
app.get('/api/getDataCentre', (req, res) => {
    const query = 'SELECT * FROM centre';
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      } else {
        res.status(200).json(results);
      }
    });
  });

//fonction pour ajt un courrier
  app.post('/api/addCourrier', (req, res) => {
    const {centre,auteur,localite,commentaire} = req.body;
    const query = `INSERT INTO courrier (centre_courrier,auteur_courrier,localite_courrier,commentaire_courrier) VALUES (${centre}, "${auteur}", "${localite}", "${commentaire}")`;
    connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de l\'ajout des données' });
        } else {
          res.status(201).json({message:'Courrier ajouté avec succes !'});
        }
      });
  });


//fonction pour MAJ
app.put('/api/updateCourrier/:id', (req, res) => {
    const courrierId = req.params.id;
    const {centre,auteur,localite,commentaire} = req.body;
    const query = `UPDATE courrier SET centre_courrier = ${centre}, auteur_courrier = "${auteur}", localite_courrier = "${localite}", commentaire_courrier = "${commentaire}" WHERE id_courrier = ${courrierId} `;
    connection.query(query, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
        } else {
          res.status(201).json({message:'Courrier MAJ avec succes !'});
        }
      });
  });

//fonction message d'indication d'etat du serveur en marche
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});


