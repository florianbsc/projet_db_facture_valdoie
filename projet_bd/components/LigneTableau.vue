<template>
  <tr v-for="(ligne, index) in tableau" :key="tableau.id">
    <td>{{ ligne.id_courrier }}</td>
    <td>{{ ligne.date_courrier }}</td>
    <td>{{ ligne.nom_centre }}</td>
    <td>{{ ligne.auteur_courrier }}</td>
    <td>{{ ligne.localite_courrier }}</td>
    <td>{{ ligne.commentaire_courrier }}</td>
    <td>
      <button @click="deleteItem(ligne.id_courrier, index)">Supprimer</button>
    </td>
    <td>
      <NuxtLink :to="`/modifier/${ligne.id_courrier}`">MODIFIER</NuxtLink>
    </td>
  </tr>
</template>
<script>
import axios from "axios";

export default {
  name: 'ligneTableau',
  props: {
    tableau: {}
  },
  methods: {
    deleteItem(id, index) {
      axios.delete(`http://localhost:3006/api/deleteItem/${id}`).then(response => {
        if (response.status === 200) {
          // Suppression réussie, mise à jour de l'affichage
          this.tableau.splice(index, 1);
        }
      });
    },
  }
}
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