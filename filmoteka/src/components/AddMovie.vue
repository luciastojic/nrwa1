<template>
    <div class="container">
        <form @submit.prevent="dodajFilm" class="form">
            <h1 class="title">DODAJ FILM</h1>
            <div class="main-div">
                <div class="sub-div">
                    <label for="title">NASLOV</label>
                    <input type="text" v-model="noviFilm.title" id="title">
                </div>
                <div class="sub-div">
                    <label for="description">OPIS RADNJE</label>
                    <input type="text" v-model="noviFilm.description" id="description">
                </div>
                <div class="sub-div">
                    <label for="release_year">GODINA IZDANJA</label>
                    <input type="number" v-model="noviFilm.release_year" id="release_year">
                </div>
                <div class="sub-div">
                    <label for="language">PRIJEVOD</label>
                    <select v-model="noviFilm.language" id="language">
                        <option value="" disabled selected>ODABERITE PRIJEVOD</option>
                        <option v-for="jezik in jezici" :value="jezik._id" :key="jezik._id">{{ jezik.name }}</option>
                    </select>
                </div>
                <div class="sub-div">
                    <label for="original_language">JEZIK</label>
                    <select v-model="noviFilm.original_language" id="original_language">
                        <option value="" disabled selected>ODABERITE JEZIK FILMA</option>
                        <option v-for="jezik in jezici" :value="jezik._id" :key="jezik._id">{{ jezik.name }}</option>
                    </select>
                </div>
                <div class="sub-div">
                    <label for="rental_duration">BROJ DANA IZNAJMLJENOG VIDEA</label>
                    <input type="number" v-model="noviFilm.rental_duration" id="rental_duration">
                </div>
                <div class="sub-div">
                    <label for="rental_rate">CIJENA IZNAJMLJIVANJA</label>
                    <input type="number" v-model="noviFilm.rental_rate" id="rental_rate">
                </div>
                <div class="sub-div">
                    <label for="length">DUŽINA FILMA</label>
                    <input type="number" v-model="noviFilm.length" id="length">
                </div>
                <div class="sub-div">
                    <label for="replacment_cost">UKUPNA CIJENA IZNAJMLJIVANJA</label>
                    <input type="number" v-model="noviFilm.replacment_cost" id="replacment_cost">
                </div>
                <div class="sub-div">
                    <label for="rating">RATING</label>
                    <input type="number" v-model="noviFilm.rating" id="rating">
                </div>
                <div class="sub-div">
                    <label for="special_features">DODATNI OPIS</label>
                    <input type="text" v-model="noviFilm.special_features" id="special_features">
                </div>
                <div class="sub-button">
                    <button type="submit" class="responsive-button">DODAJ FILM</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddMovie',
        data(){
            return{
                jezici:[],
                noviFilm:{
                    title:'',
                    description:'',
                    release_year:null,
                    language:'',
                    original_language:'',
                    rental_duration:null,
                    rental_rate:null,
                    length:null,
                    replacment_cost:null,
                    rating:null,
                    special_features:''
                }
            }
        },
        methods:{
            async dodajFilm(){
                try{
                    const response=await axios.post('http://localhost:3000/filmovi',this.noviFilm);
                    if(response.status===201){
                        this.noviFilm={
                            title:'',
                            description:'',
                            release_year:null,
                            language:'',
                            original_language:'',
                            rental_duration:null,
                            rental_rate:null,
                            length:null,
                            replacment_cost:null,
                            rating:null,
                            special_features:''
                        };
                        alert('Film dodan');
                    }else{
                        alert('Došlo je do greške prilikom dodavanja');
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async dobaviJezik(){
                try{
                    const response=await axios.get('http://localhost:3000/jezici');
                    this.jezici=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.dobaviJezik();
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