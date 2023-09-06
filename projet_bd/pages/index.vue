<template>
  <div class="main">
    <div class="connection">
      <button class="alert" v-if="user.id" @click="deconnectUser()">Deconnexion</button>
      <button class="interaction" v-else @click="goToLogin()">Connexion</button>
      <div v-if="user.login">Bonjour <span style="font-weight: bold">{{ user.login }}</span></div>
    </div>
    <div v-if="user.id">

    </div>

    <table>
      <thead>
      <tr>
        <th @click="sortTableBy('id_courrier','number')">Numero</th>
        <th @click="sortTableBy('date_courrier', 'string')">Date</th>
        <th @click="sortTableBy('nom_centre', 'string')">Centre</th>
        <th @click="sortTableBy('auteur_courrier', 'string')">Auteur</th>
        <th @click="sortTableBy('localite_courrier', 'string')">Localite</th>
        <th @click="sortTableBy('commentaire_courrier', 'string')">Commentaire</th>
      </tr>
      </thead>
      <tbody>
      <ligneTableau :tableau="tableau" :user-id="user.id" :user-niveau="user.niveau"
                    :is-user-activated="isUserActivated"/>
      </tbody>
    </table>
    <div v-if="user.niveau === '2' || user.niveau === '3' && user.id">

        <button class="interaction" @click="goToAjouter()">Ajouter
        </button>

        <button class="interaction" @click="isUserActivated = !isUserActivated">
          {{ isUserActivated ? 'Afficher tout les courriers' : 'Afficher uniquement ses propres courriers' }}
        </button>
    </div>
  </div>


</template>

<script>
import axios from "axios";
import LigneTableau from "~/components/LigneTableau.vue";
import nuxtStorage from "nuxt-storage/nuxt-storage";

export default {
  components: {LigneTableau},
  data() {
    return {
      isActive: false,
      isUserActivated: false,
      tableau: [],
      centre: '',
      auteur: '',
      localite: '',
      commentaire: '',
      user: [
        {
          id: null,
          niveau: null,
          login: null,
        }
      ]
    }
  },
  mounted() {
    this.fetchData();
    this.userData()
  },
  computed: {},
  methods: {
    fetchData() {
      axios.get('http://localhost:3006/api/getData').then(response => {
        this.tableau = response.data;
        console.log("tableau:", this.tableau);
      });
    },
    goToAjouter() {
      this.$router.push('/ajouter/');
    },
    goToLogin() {
      this.$router.push('/login/');
    },
    deconnectUser() {
      nuxtStorage.localStorage.clear();
      this.user.id = null
      this.user.niveau = null
      this.user.login = null
    },
    userData() {
      if (nuxtStorage.localStorage.getData('userId') !== null) {
        this.user.id = nuxtStorage.localStorage.getData('userId')
        this.user.niveau = nuxtStorage.localStorage.getData('rights')
        this.user.login = JSON.parse(nuxtStorage.localStorage.getData('userLogin'))
      }
    },
    sortTableBy(key, dataType) {
      this.tableau.sort((a, b) => {
        if (dataType === 'string') {
          return a[key].localeCompare(b[key]);
        } else if (dataType === 'number') {
          return parseFloat(a[key]) - parseFloat(b[key])
        }
      })
    },
  }


};

</script>

<style lang="scss" scoped>

table {
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
}

th {
  cursor: pointer;
  text-align: left;
}

.connection {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}


</style>