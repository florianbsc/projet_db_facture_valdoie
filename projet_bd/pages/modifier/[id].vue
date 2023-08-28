<template>
    <div>
        <form>
            <div>
                <label for="centre">Centre</label>
                <select name="centre" id="centre" v-model="Courrier.centre">
                    <template v-for="(Centre, index) in Centres" :key="Centre.id">
                <option :value="Centre.id">{{ Centre.nom }}</option>
              </template>
                </select>
                
            </div>
            <div>
                <label for="auteur">Auteur</label>
                <input type="text" name="auteur" id="auteur" v-model="Courrier.auteur" :placeholder="Courrier.auteur">
            </div>
            <div>
                <label for="localite">Localite</label>
            <input type="text" name="localite" id="localite" v-model="Courrier.localite" :placeholder="Courrier.localite">
        </div>
            <div>
                <label for="commentaire">Commentaire</label>
                <input type="text" name="commentaire" id="commentaire" v-model="Courrier.commentaire" :placeholder="Courrier.commentaire">
            </div>
            <div><button @click.prevent="updateCourrier()">Mettre à Jour</button>
            <button @click.prevent="rollBack()">RETOUR</button></div>
            
        </form>


    </div>
</template> 

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'; // Import de useRoute depuis Vue Router

export default {
    data() {
        return {
            Courrier: {
                
                centre: '',
                auteur: '',
                localite: '',
                commentaire: ''
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
            const idCourrier = this.Courrier.id;

            axios.put(`http://localhost:3006/api/updateCourrier/${idCourrier}`, {
                centre: this.Courrier.centre,
                auteur: this.Courrier.auteur,
                localite: this.Courrier.localite,
                commentaire: this.Courrier.commentaire,
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
    rollBack () {
        this.$router.push({
                    path: '/'})
    }
    },
}
</script>