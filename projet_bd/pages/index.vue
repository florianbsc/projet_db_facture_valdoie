<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>date</th>
          <th>centre</th>
          <th>auteur</th>
          <th>localite</th>
          <th>commentaire</th>
        </tr>      
      </thead>
      <tbody>
        <tr v-for="(ligne, index) in tableau" :key="tableau.id">
          <td>{{ ligne.id }}</td>
          <td>{{ ligne.date }}</td>
          <td>{{ ligne.centre }}</td>
          <td>{{ ligne.auteur }}</td>
          <td>{{ ligne.localite }}</td>
          <td>{{ ligne.commentaire }}</td>
          <td><button @click="deleteItem(ligne.id, index)">Supprimer</button></td>
          <td><NuxtLink :to="`/modifier/${ligne.id}`">MODIFIER</NuxtLink></td>
        </tr>
        <tr>
          <td><button>Ajouter</button></td>
        </tr>
      </tbody>
    </table>
    
    <form method="get" action="#">
				<div>
					<div>
						<label for="centre">centre</label>
            <select name="centre" id="centre" v-model="centre" >
              <option default value="null">-Veuillez choisir un centre-</option>
              <template v-for="(centre, index) in centres" :key="centre.id">
                <option :value="centre.id">{{ centre.nom }}</option>
              </template>
            </select>
					</div>

					<div>
						<label for="auteur">auteur</label>
						<input type="text" name="auteur" id="auteur" v-model="auteur">
					</div>

          <div>
						<label for="localite">localite</label>
						<input type="text" name="localite" id="localite" v-model="localite" >
					</div>

					<div>
						<label for="commentaire">commentaire</label>
						<textarea name="commentaire" id="commentaire" cols="40" rows="10" v-model="commentaire"></textarea>
					</div>
          <button @click.prevent="addCourrier()">ENVOYER</button>
				</div>
			</form>


</div>



</template>

<script>
import axios from "axios";
import fs from "fs";

export default{
data() {
  return {
    tableau: [],
    centres:[],
    centre: '',
    auteur: '',
    localite: '',
    commentaire: '',
  }

},
mounted() {
    this.fetchData();
    this.fetchCentre();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3006/api/getData').then(response => {
        this.tableau = response.data;
        console.log("tableau:", this.tableau);
      });
    },
    deleteItem(id, index) {
      axios.delete(`http://localhost:3006/api/deleteItem/${id}`).then(response => {
        if (response.status === 200) {
          // Suppression réussie, mise à jour de l'affichage
          this.tableau.splice(index, 1);
        }
      });
    },

    fetchCentre() {
      axios.get(`http://localhost:3006/api/getDataCentre`).then(response => {
        this.centres = response.data;
        console.log("Centres:", this.centres);

      })
    },

    addCourrier() {
      axios.post(`http://localhost:3006/api/addCourrier`, {
        centre:this.centre, 
        auteur:this.auteur,
        localite:this.localite,
        commentaire:this.commentaire,
      }).then(response => {
        if (response.status === 201) {
          this.centre = '';
          this.auteur = '';
          this.localite = '';
          this.commentaire = '';
        }
      })
      
    }
  }


};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope&family=Montserrat+Alternates&family=Roboto&display=swap');

table, form {
  margin: 0;
  font-size: 1em;
  font-family: 'Manrope', sans-serif;

}

td {
  
  width: 350px;
  text-align: justify;
  padding: 16px;
  margin: auto;

}


</style>