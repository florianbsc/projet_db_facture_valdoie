// courrierController.js
require('dotenv').config()

const mysql = require("mysql");
const crypto = require("crypto");
const connection = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

//fonctin pour recuper toutes les données constituant la basse de données
function getCourrier(req, res) {
    const query = 'SELECT * FROM courrier, centre WHERE courrier.centre_courrier = centre.id_centre';
    connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        } else {
            res.status(200).json(results);
        }
    });
};

// fonction pour recupere une donné specifique
function getSpecififcCourrier (req, res) {
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
};

//fonction qui
function login (req, res) {
const { login, password } = req.body;

// Recherchez l'utilisateur dans la base de données
connection.query('SELECT * FROM utilisateur WHERE login_user = ?', [login], (err, users) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la connexion');
    }

    // Si aucun utilisateur trouvé, renvoyer un message d'erreur
    if (users.length === 0) {
        return res.status(401).send('Utilisateur non trouvé');
    }

    const user = users[0]; // Prenez le premier utilisateur trouvé

    // Convertir le mot de passe fourni en MD5
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    // Comparer le mot de passe MD5 stocké avec celui fourni
    if (hashedPassword === user.mdp_user) {
        return res.send('Connecté avec succès');
    } else {
        return res.status(401).send('Mot de passe incorrect');
    }
});
};

// API pour supprimer un élément par son ID
//fonction pour supprimer un donnée spéficique avec son ID
function deleteItem (req, res) {
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
};

//fonction pour recuper la table centre
function getDataCentre (req, res) {
const query = 'SELECT * FROM centre';
connection.query(query, (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
        res.status(200).json(results);
    }
});
};

//fonction pour ajt un courrier
function addCourrier(req, res) {
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
};

//fonction qui lie l'id du courrier a l'id de l'utilisatuer
function getCourrierByUser (req, res) {
    const userId = req.params.id;
    const query = 'SELECT * FROM courrier WHERE user_courrier = ?';
    connection.query(query,[userId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des courriers utilisateurs' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Courrier utilisateur non trouvé' });
            } else {
                res.status(200).json(result);
            }
        }
    });
};

//fonction pour MAJ le courrier
function updateCourrier(req, res) {
    const courrierId = req.params.id;
    const { centre, auteur, localite, commentaire } = req.body;
    const query = `UPDATE courrier SET centre_courrier = ${centre}, auteur_courrier = "${auteur}", localite_courrier = "${localite}", commentaire_courrier = "${commentaire}" WHERE id_courrier = ${courrierId} `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
        } else {
            res.status(201).json({ message: 'Courrier MAJ avec succès !' });
        }
    });
};







module.exports = {
    updateCourrier, getCourrier, getSpecififcCourrier, login, deleteItem, getDataCentre, addCourrier, getCourrierByUser
};


