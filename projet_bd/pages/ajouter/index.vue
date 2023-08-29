<template>
  <div>
    <button @click="GoToBack()">Retour</button>
    <AjoutForm :centres="centres"/>
  </div>

</template>

<script>
import axios from "axios";
import AjoutForm from "~/components/AjoutForm.vue";
export default {
  components: {AjoutForm},
  data() {
    return {
      centres: [],
      centre: '',
      auteur: '',
      localite: '',
      commentaire: '',
    }
  },
  mounted() {
    this.fetchCentre();
  },
  methods: {
    fetchCentre() {
      axios.get(`http://localhost:3006/api/getDataCentre`).then(response => {
        this.centres = response.data;
        console.log("Centres:", this.centres);
      })
    },
    GoToBack() {
      this.$router.push('/');
    }
  }
}
</script>



<style scoped>

</style>