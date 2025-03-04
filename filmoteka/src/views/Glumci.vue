<template>
    <header>
        <h1>FILMOTEKA</h1>
        <p>IZNAJMLJIVANJE FILMOVA I SERIJA</p>
    </header>
    <div class="navbar">
        <a href="/">POČETNA</a>
        <div class="dropdown">
            <button class="dropbtn">
                FILMOVI
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </button>
            <div class="dropdown-content">
                <a href="/filmovi">FILMOVI</a>
                <a href="/dodajfilm">DODAJ FILM</a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">
                GLUMCI
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </button>
            <div class="dropdown-content">
                <a href="/glumci">GLUMCI</a>
                <a href="/dodajglumca">DODAJ GLUMCA</a>
                <a href="/glavniglumci">FILMOVI GLUMCA</a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">
                TRGOVINE
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </button>
            <div class="dropdown-content">
                <a href="/trgovine">TRGOVINE</a>
                <a href="/dodajtrgovinu">DODAJ TRGOVINU</a>
                <a href="/osoblje">OSOBLJE TRGOVINE</a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn">
                KUPCI
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </button>
            <div class="dropdown-content">
                <a href="/kupci">KUPCI</a>
                <a href="/dodajkupca">DODAJ KUPCA</a>
            </div>
        </div>
    </div>
    <div class="grid-container">
        <div class="grid-item" v-for="glumac in glumci" :value="glumac._id" :key="glumac._id">
            {{ glumac.first_name }} {{ glumac.last_name }}
        </div>
    </div>
</template>
<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

    import axios from 'axios';

    library.add(faCaretDown);

    export default{
        name:'Glumci',
        components:{
            FontAwesomeIcon
        },
        data(){
            return{
                glumci:[]
            }
        },
        methods:{
            async dohvatiGlumce(){
                try{
                    const response=await axios.get('http://localhost:3000/glumci');
                    this.glumci=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.dohvatiGlumce();
        }
    };

</script>
<style scoped>
    header{
        text-align: center;
        font-weight: bold;
        background-color: gray;
        margin-top: 0;
    }
    .navbar{
        overflow: hidden;
        background-color: #333;
        font-family: Arial;
    }
    .navbar a{
        float: left;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    .dropdown {
        float: left;
        overflow: hidden;
    }
    .dropdown .dropbtn {
        font-size: 16px;
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit; /* Important for vertical align on mobile phones */
        margin: 0; /* Important for vertical align on mobile phones */
    }
    .navbar a:hover, .dropdown:hover .dropbtn {
        background-color: red;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }
    .dropdown-content a:hover {
        background-color: #ddd;
    }

/* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }
    .grid-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 5 stupaca */
        gap: 10px; /* Razmak između okvira */
        width: 500px; /* Prilagodite širinu kontejnera */
        border: 1px solid #ccc; /* Opcija: Dodajte obrub kontejneru */
    }

    .grid-item {
        border: 1px solid #ddd; /* Obod za svaki okvir */
        padding: 10px;
        text-align: center; /* Centriranje teksta */
        overflow: hidden; /* Spriječava prelijevanje teksta izvan okvira */
        box-sizing: border-box; /* Uključuje padding i border u ukupnu veličinu okvira */
    }
</style>