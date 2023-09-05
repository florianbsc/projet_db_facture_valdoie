<script>
import axios from "axios";
import nuxtStorage from "nuxt-storage/nuxt-storage";

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
        console.log(response.data.userInfo);
        if (response.status === 200) {
            nuxtStorage.localStorage.setData('rights', `${JSON.stringify(response.data.userInfo.id_niveau)}`)
            nuxtStorage.localStorage.setData('userId', `${JSON.stringify(response.data.userInfo.id_user)}`)
            nuxtStorage.localStorage.setData('userLogin', `${JSON.stringify(response.data.userInfo.login_user)}`)
            this.$router.push('/')
        }
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