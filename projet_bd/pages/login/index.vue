<script>
import axios from "axios";

export default  {
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      axios.post(`http://localhost:3006/api/login`, {
        login: this.login,
        password: this.password,
      }).then(response => {
        console.log(response);
        if (response.status === 200) {
          axios.post(`http://localhost:3006/api/getUserInfos`, {
            login: this.login,
            password: this.password,
          }).then(response => {
            console.log(response.data)
          })
        }
      })
          .catch(error => {
            console.error("An error occurred:", error);
    })
  },
    goToBack() {
      this.$router.push('/')
    }
}
}
</script>

<template>
  <button @click="goToBack()">Retour</button>
  <form>
    <div>
      <label for="login">nom</label>
      <input type="text" v-model="login">
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input type="password" v-model="password">
    </div>
    <button @click.prevent="signIn">Connexion</button>
  </form>
</template>

<style scoped>

</style>