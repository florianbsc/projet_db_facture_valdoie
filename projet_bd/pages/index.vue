<template>
  <div>
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
      <ligneTableau :tableau="tableau"/>
        <tr>
          <td><button @click="goToAjouter()">Ajouter</button></td>
        </tr>
      </tbody>
    </table>
</div>



</template>

<script>
import axios from "axios";
import LigneTableau from "~/components/LigneTableau.vue";
import AjoutForm from "~/components/AjoutForm.vue";

export default{
  components: {LigneTableau},
data() {
  return {
    tableau: [],
    centre: '',
    auteur: '',
    localite: '',
    commentaire: '',
  }

},
mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3006/api/getData').then(response => {
        this.tableau = response.data;
        console.log("tableau:", this.tableau);
      });
    },
    goToAjouter() {
      this.$router.push('/ajouter/');
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