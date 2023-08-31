<template>
  <div>
    <div v-if="isDataSend"> {{lastAdded}}</div>
    <form method="get" action="#">
      <div>
        <div>
          <label for="centre">centre</label>
          <select name="centre" id="centre" v-model="centre">
            <option selected value="">-Veuillez choisir un centre-</option>
            <template v-for="(centre, index) in centres" :key="centre.id">
              <option :value="centre.id_centre">{{ centre.nom_centre }}</option>
            </template>
          </select>
        </div>

        <div>
          <label for="auteur">auteur</label>
          <input type="text" name="auteur" id="auteur" v-model="auteur">
        </div>

        <div>
          <label for="localite">localite</label>
          <input type="text" name="localite" id="localite" v-model="localite">
        </div>

        <div>
          <label for="commentaire">commentaire</label>
          <textarea name="commentaire" id="commentaire" cols="40" rows="10" v-model="commentaire"></textarea>
        </div>
        <button @click.prevent="addCourrier">AJOUTER</button>
      </div>
    </form>
  </div>

</template>
<script>
import axios from "axios";
import nuxtStorage from "nuxt-storage/nuxt-storage";

export default {
  name: 'AjoutForm',
  props: {
    centres: []
  },
  data() {
    return {
      centre: '',
      auteur: '',
      localite: '',
      commentaire: '',
      userId: null,
      isDataSend: false,
      lastAdded: []
    }
  },
  mounted() {
    this.getUserId()
  },
  methods: {
    addCourrier() {
      axios.post(`http://localhost:3006/api/addCourrier`, {
        centre:this.centre,
        auteur:this.auteur,
        localite:this.localite,
        commentaire:this.commentaire,
        userId:this.userId
      }).then(response => {
        this.lastAdded = [this.centre, this.commentaire, this.auteur, this.localite]
        if (response.status === 201) {
          this.centre = '';
          this.auteur = '';
          this.localite = '';
          this.commentaire = '';
          this.isDataSend = true;
        }
      })

    },
    getUserId () {
     this.userId = nuxtStorage.localStorage.getData('userId')
    }
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