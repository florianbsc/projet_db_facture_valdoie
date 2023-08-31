<template>
  <tr v-for="(ligne, index) in tableau" :key="tableau.id_courrier">
    <td>{{ ligne.id_courrier }}</td>
    <td v-html="formatDate(ligne.date_courrier)"></td>
    <td>{{ ligne.nom_centre }}</td>
    <td>{{ ligne.auteur_courrier }}</td>
    <td>{{ ligne.localite_courrier }}</td>
    <td>{{ ligne.commentaire_courrier }}</td>
    <td>
      <button v-if="userNiveau === '3'" @click="deleteItem(ligne.id_courrier, index)">Supprimer</button>
      <button v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier" @click="deleteItem(ligne.id_courrier, index)">Supprimer</button>
    </td>
<!--
    lien vers la page de modification des mails
-->
    <td>
      <NuxtLink v-if="userNiveau === '3'" :to="`/modifier/${ligne.id_courrier}`">MODIFIER</NuxtLink>
      <NuxtLink v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier" :to="`/modifier/${ligne.id_courrier}`">MODIFIER</NuxtLink>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: 'ligneTableau',
  props: {
    tableau: {},
    userId: null,
    userNiveau: null
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
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('D/MM/YYYY')
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