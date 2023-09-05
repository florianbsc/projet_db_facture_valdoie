<template>
  <template v-for="(ligne, index) in tableau" :key="tableau.id_courrier">
    <tr v-if="isUserActivated && parseInt(userId) === ligne.user_courrier">
      <td>{{ ligne.id_courrier }}</td>
      <td v-html="formatDate(ligne.date_courrier)"></td>
      <td>{{ ligne.nom_centre }}</td>
      <td>{{ ligne.auteur_courrier }}</td>
      <td>{{ ligne.localite_courrier }}</td>
      <td>{{ ligne.commentaire_courrier }}</td>
      <td>
        <button class="alert" v-if="userNiveau === '3'" @click="deleteItem(ligne.id_courrier, index)">Supprimer</button>
        <button class="alert" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="deleteItem(ligne.id_courrier, index)">Supprimer
        </button>
      </td>
      <td>
        <button class="interaction" v-if="userNiveau === '3'" @click="this.$router.push(`/modifier/${ligne.id_courrier}`)">Modifier</button>
        <button class="interaction" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier" @click="this.$router.push(`/modifier/${ligne.id_courrier}`)">Modifier</button>
      </td>
    </tr>
    <tr v-else-if="!isUserActivated">
      <td>{{ ligne.id_courrier }}</td>
      <td v-html="formatDate(ligne.date_courrier)"></td>
      <td>{{ ligne.nom_centre }}</td>
      <td>{{ ligne.auteur_courrier }}</td>
      <td>{{ ligne.localite_courrier }}</td>
      <td>{{ ligne.commentaire_courrier }}</td>
      <td>
        <button class="alert" v-if="userNiveau === '3'" @click="deleteItem(ligne.id_courrier, index)">Supprimer</button>
        <button class="alert" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="deleteItem(ligne.id_courrier, index)">Supprimer
        </button>
      </td>
      <td>
        <button class="interaction" v-if="userNiveau === '3'" @click="this.$router.push(`/modifier/${ligne.id_courrier}`)">Modifier</button>
        <button class="interaction" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier" @click="this.$router.push(`/modifier/${ligne.id_courrier}`)">Modifier</button>
      </td>
    </tr>

  </template>

</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: 'ligneTableau',
  props: {
    tableau: {},
    userId: null,
    userNiveau: null,
    isUserActivated: false,
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