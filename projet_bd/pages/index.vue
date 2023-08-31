<template>
  <div>
    <div>
      <button v-if="user.id" @click="deconnectUser()">Deconnexion</button>
      <button v-else @click="goToLogin()">Connexion</button>
      <div v-if="user.login">Bonjour {{user.login}}</div>
    </div>
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
      <ligneTableau :tableau="tableau" :user-id="user.id" :user-niveau="user.niveau"/>
      <tr>
        <td>
          <button v-if="user.niveau === '2' || user.niveau === '3'" @click="goToAjouter()">Ajouter</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
import axios from "axios";
import LigneTableau from "~/components/LigneTableau.vue";
import nuxtStorage from "nuxt-storage/nuxt-storage";

export default {
  computed: {
    nuxtStorage() {
      return nuxtStorage
    }
  },
  components: {LigneTableau},
  data() {
    return {
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
  methods: {
    fetchData() {
      axios.get('http://localhost:3006/api/getData').then(response => {
        this.tableau = response.data;
        console.log("tableau:", this.tableau);
        return this.tableau.sort((a, b) => a.id_courrier - b.id_courrier)
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