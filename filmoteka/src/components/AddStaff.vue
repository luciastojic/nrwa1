<template>
    <div class="container">
        <form class="form" @submit.prevent="dodajOsoblje">
            <h1 class="title">DODAJ OSOBLJE</h1>
            <div>
                <div class="sub-div">
                    <label for="first_name">IME</label>
                    <input type="text" v-model="novoOsoblje.first_name" id="first_name">
                </div>
                <div class="sub-div">
                    <label for="last_name">PREZIME</label>
                    <input type="text" v-model="novoOsoblje.last_name" id="last_name">
                </div>
                <div class="sub-div">
                    <label for="address_id">ADRESA</label>
                    <select v-model="novoOsoblje.address_id" id="address_id">
                        <option value="" disabled selected>ODABERI ADRESU OSOBLJA</option>
                        <option v-for="adresa in adrese" :value="adresa._id" :key="adresa._id">{{ adresa.address }}</option>
                    </select>
                </div>
                <div class="sub-div">
                    <label for="email">EMAIL</label>
                    <input type="email" v-model="novoOsoblje.email" id="email">
                </div>
                <div class="sub-div">
                    <label for="store_id">TRGOVINA</label>
                    <select v-model="novoOsoblje.store_id" id="store_id">
                        <option value="" disabled selected>ODABERI TRGOVINU OSOBLJA</option>
                        <option v-for="trgovina in trgovine" :value="trgovina._id" :key="trgovina._id">{{ trgovina.name }}</option>
                    </select>
                </div>
                <div class="sub-button">
                    <button type="submit" class="responsive-button">DODAJ OSOBLJE</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddStaff',
        data(){
            return{
                adrese:[],
                trgovine:[],
                novoOsoblje:{
                    first_name:'',
                    last_name:'',
                    address_id:'',
                    email:'',
                    store_id:''
                }
            }
        },
        methods:{
            async dodajOsoblje(){
                try{
                    const response=await axios.post('http://localhost:3000/osoblje',this.novoOsoblje);
                    if(response.status===201){
                        this.novoOsoblje={
                            first_name:'',
                            last_name:'',
                            address_id:'',
                            email:'',
                            store_id:''
                        };
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async dohvatiAdrese(){
                try{
                    const response=await axios.get('http://localhost:3000/adrese');
                    this.adrese=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru')
                }
            },
            async dohvatiTrgovine(){
                try{
                    const response=await axios.get('http://localhost:3000/trgovine');
                    this.trgovine=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru')
                }
            }
        },
        mounted(){
            this.dohvatiAdrese();
            this.dohvatiTrgovine();
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