<template>
  <tr v-for="(ligne, index) in tableau" :key="tableau.id">
    <td>{{ ligne.id }}</td>
    <td>{{ ligne.date }}</td>
    <td>{{ ligne.centre }}</td>
    <td>{{ ligne.auteur }}</td>
    <td>{{ ligne.localite }}</td>
    <td>{{ ligne.commentaire }}</td>
    <td>
      <button @click="deleteItem(ligne.id, index)">Supprimer</button>
    </td>
    <td>
      <NuxtLink :to="`/modifier/${ligne.id}`">MODIFIER</NuxtLink>
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