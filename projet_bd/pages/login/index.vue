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
  <button class="alert" @click="goToBack()">Retour</button>
  <form>
    <h1>Connexion</h1>
    <div>
      <label for="login">Identifiant</label>
      <input type="text" v-model="login">
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input type="password" v-model="password">
    </div>
    <button class="interaction" @click.prevent="signIn">Se connecter</button>
  </form>
</template>

<style lang="scss" scoped>
.alert {
  margin: 20px;
}
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(217, 217, 217, 0.2);
    justify-content: center;
    max-width: max-content;
    padding: 20px;
    border-radius: 16px;
    margin: auto;
    transform: translateY(25%);
    h1 {
      margin-bottom: 40px;
    }
    div {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      label, input {
        margin-bottom: 10px;
      }
      input {
        min-width: 444px;
      }

    }
    button {
      margin: 30px 0;
    }
  }
  

</style>