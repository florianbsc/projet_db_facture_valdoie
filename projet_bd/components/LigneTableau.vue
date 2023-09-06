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
        <button class="alert crud" v-if="userNiveau === '3'" @click="deleteItem(ligne.id_courrier, index)"><img
            src="/cross.svg"
            alt=""></button>
        <button class="alert crud" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="deleteItem(ligne.id_courrier, index)"><img src="/cross.svg"
                                                                   alt="">
        </button>
      </td>
      <td>
        <button class="interaction crud" v-if="userNiveau === '3'"
                @click="this.$router.push(`/modifier/${ligne.id_courrier}`)"><img src="/modify.svg" alt="">
        </button>
        <button class="interaction crud" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="this.$router.push(`/modifier/${ligne.id_courrier}`)"><img src="/modify.svg" alt="">
        </button>
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
        <button class="alert crud" v-if="userNiveau === '3'" @click="deleteItem(ligne.id_courrier, index)">
          <img src="/cross.svg" alt="">
        </button>
        <button class="alert crud" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="deleteItem(ligne.id_courrier, index)"><img src="/cross.svg"
                                                                   alt="">
        </button>
      </td>
      <td>
        <button class="interaction crud" v-if="userNiveau === '3'"
                @click="this.$router.push(`/modifier/${ligne.id_courrier}`)"><img src="/modify.svg" alt="">
        </button>
        <button class="interaction crud" v-else-if="userNiveau === '2' && parseInt(userId) === ligne.user_courrier"
                @click="this.$router.push(`/modifier/${ligne.id_courrier}`)"><img src="/modify.svg" alt="">
        </button>
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
<style lang="scss" scoped>

td {
  &:nth-child(8n+1) {
    border-radius: 16px 0 0 16px;
    padding: 0 20px;
  }

  &:nth-child(8n) {
    border-radius: 0 16px 16px 0;
  }
}

tr {
  height: 56px;

  &:nth-child(2n+1) {
    background: rgba(217, 217, 217, 0.3);
  }
}

</style>