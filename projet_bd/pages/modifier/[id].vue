<template>
  <div>
    <form>
      <div>
        <label for="centre">Centre</label>
        <select name="centre" id="centre" v-model="Courrier.centre_courrier">
          <template v-for="(Centre, index) in Centres" :key="Centre.id">
            <option :value="Centre.id_centre">{{ Centre.nom_centre }}</option>
          </template>
        </select>

      </div>
      <div>
        <label for="auteur">Auteur</label>
        <input type="text" name="auteur" id="auteur" v-model="Courrier.auteur_courrier" :placeholder="Courrier.auteur_courrier">
      </div>
      <div>
        <label for="localite">Localite</label>
        <input type="text" name="localite" id="localite" v-model="Courrier.localite_courrier" :placeholder="Courrier.localite_courrier">
      </div>
      <div>
        <label for="commentaire">Commentaire</label>
        <input type="text" name="commentaire" id="commentaire" v-model="Courrier.commentaire_courrier"
               :placeholder="Courrier.commentaire_courrier">
      </div>
      <div>
        <button @click.prevent="updateCourrier()">Mettre à Jour</button>
        <button @click.prevent="rollBack()">RETOUR</button>
      </div>

    </form>


  </div>
</template>

<script>
import axios from 'axios';
import {useRoute} from 'vue-router'; // Import de useRoute depuis Vue Router

export default {
  data() {
    return {
      Courrier: {
        id_courrier: '',
        centre_courrier: '',
        auteur_courrier: '',
        localite_courrier: '',
        commentaire_courrier: ''
      },

      Centres: [],
    }
  },
  mounted() {
    this.fetchCourrier();
    this.fetchCentre();

  },
  methods: {
    // fonction recuperation d'un courrier par son id
    fetchCourrier() {
      const route = useRoute();
      const idCourrier = route.params.id;
      axios.get(`http://localhost:3006/api/getSpecificCourrier/${idCourrier}`).then(response => {
        this.Courrier = response.data;
        console.log(this.Courrier);
      })
    },
    // focntion maj courrier
    updateCourrier() {
      const idCourrier = this.Courrier.id_courrier;

      axios.put(`http://localhost:3006/api/updateCourrier/${idCourrier}`, {
        centre: this.Courrier.centre_courrier,
        auteur: this.Courrier.auteur_courrier,
        localite: this.Courrier.localite_courrier,
        commentaire: this.Courrier.commentaire_courrier,
      }).then(response => {
        if (response.status === 201) {
          this.rollBack();
        }
      })

    },
    // fonction qui permet de recuper les données des centres
    fetchCentre() {
      axios.get(`http://localhost:3006/api/getDataCentre`).then(response => {
        this.Centres = response.data;
        console.log("Centres:", this.centres);

      })
    },
    rollBack() {
      this.$router.push({
        path: '/'
      })
    }
  },
}
</script>