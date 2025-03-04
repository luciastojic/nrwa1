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
    <div>
        <table>
            <thead>
                <tr>
                    <th>IME</th>
                    <th>PREZIME</th>
                    <td>EMAIL</td>
                    <th>ID TRGOVINE</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="osoba in osoblje" :value="osoba._id" :key="osoba._id">
                    <td>{{ osoba.first_name }}</td>
                    <td>{{ osoba.last_name }}</td>
                    <td>{{ osoba.email }}</td>
                    <td>{{ osoba.store_id }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="sub-button">
        <button @click="otvoriDialog">DODAJ OSOBLJE TRGOVINE</button>
        <ModalComponent v-if="dialogOtvoren" @zatvori="zatvoriDialog">
            <AddStaff @zatvori="zatvoriDialog"/>
            <button @click="zatvoriDialog" class="close">X</button>
        </ModalComponent>
    </div>
</template>
<script>
    import axios from 'axios';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
    import ModalComponent from '../components/ModalComponent.vue';
    import AddStaff from '../components/AddStaff.vue'

    export default{
        name:'Osoblje',
        components:{
            FontAwesomeIcon,
            ModalComponent,
            AddStaff
        },
        data(){
            return{
                osoblje:[],
                dialogOtvoren: false
            }
        },
        methods:{
            async dohvatiOsoblje(){
                try{
                    const response=await axios.get('http://localhost:3000/osoblje');
                    this.osoblje=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            otvoriDialog() {
                this.dialogOtvoren = true;
            },
            zatvoriDialog() {
                this.dialogOtvoren = false;
            }
        },
        mounted(){
            this.dohvatiOsoblje();
        }
    }
</script>
<style scoped>
    table {
        width: 80%; /* Prilagodite širinu tablice */
        margin: 20px auto; /* Centriranje tablice */
        border-collapse: collapse; /* Spajanje rubova ćelija */
    }

    th, td {
        padding: 10px; /* Dodavanje unutarnjeg razmaka u ćelijama */
        text-align: center; /* Poravnanje teksta u ćelijama */
        border: 1px solid #ddd; /* Dodavanje obruba ćelijama */
    }

    th {
        background-color: #f2f2f2; /* Pozadinska boja zaglavlja */
    }

    tr:nth-child(even) {
        background-color: #f9f9f9; /* Boja pozadine parnih redova */
    }
    .sub-button{
        margin-top: 25px;
    }
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
    .close {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 1.5rem;
    }
</style>