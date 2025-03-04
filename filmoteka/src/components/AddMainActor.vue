<template>
    <div class="container">
        <form class="form" @submit.prevent="dodajGlavnogGlumca">
            <h1 class="title">DODAJ GLAVNOG GLUMCA</h1>
            <div class="main-div">
                <div class="sub-div">
                    <label for="film_id">FILM</label>
                    <select v-model="noviGlavniGlumac.film_id" id="film_id">
                        <option value="" disabled selected>ODABERI FILM</option>
                        <option v-for="film in filmovi" :value="film._id" :key="film._id">{{ film.title }}</option>
                    </select>
                </div>
                <div class="sub-div">
                    <label for="actor_id">GLUMAC</label>
                    <select v-model="noviGlavniGlumac.actor_id" id="actor_id">
                        <option value="" disabled selected>ODABERI GLUMCA</option>
                        <option v-for="glumac in glumci" :value="glumac._id" :key="glumac._id">{{ glumac.first_name }} {{ glumac.last_name }}</option>
                    </select>
                </div>
                <div class="sub-button">
                    <button type="submit" class="responsive-button">DODAJ GLAVNOG GLUMCA</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddMainActor',
        data(){
            return{
                filmovi:[],
                glumci:[],
                noviGlavniGlumac:{
                    actor_id:'',
                    film_id:''
                }
            }
        },
        methods:{
            async dodajGlavnogGlumca(){
                try{
                    const response=await axios.post('http://localhost:3000/glavniglumci',this.noviGlavniGlumac);
                    if(response.status===201){
                        this.noviGlavniGlumac={
                            actor_id:'',
                            film_id:''
                        };
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async dohvatiGlumce(){
                try{
                    const response=await axios.get('http://localhost:3000/glumci');
                    this.glumci=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async dohvatiFilmove(){
                try{
                    const response=await axios.get('http://localhost:3000/filmovi');
                    this.filmovi=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.dohvatiFilmove();
            this.dohvatiGlumce();
        }
    }
</script>
<style scoped>
    body{
        font-family: Arial, sans-serif;
        margin: 0;
        background-color: whitesmoke;
    }
    .container{
        background-color: whitesmoke;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    .form{
        background-color: black;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        color: white;
    }
    .title{
        font-size: 28px;
        margin-bottom: 20px;
        color: white;
    }
    .sub-div{
        margin-bottom: 10px;
        padding-left: 15px;
    }
    .sub-button{
        margin-top: 25px;
    }
</style>