<template>
    <div class="container">
        <form class="form" @submit.prevent="dodajNovuTrgovinu">
            <h1 class="title">DODAJ TRGOVINU</h1>
            <div>
                <div class="sub-div">
                    <label for="name">NAZIV TRGOVINE</label>
                    <input type="text" v-model="novaTrgovina.name" id="name">
                </div>
                 <div class="sub-div">
                    <label for="address_id">ADRESA TRGOVINE</label>
                    <select v-model="novaTrgovina.address_id" id="address_id">
                        <option value="" disabled selected>ODABERI ADRESU TRGOVINE</option>
                        <option v-for="adresa in adrese" :value="adresa._id" :key="adresa._id">{{ adresa.address }}</option>
                    </select>
                </div>
            </div>
            <div class="sub-button">
                <button type="submit" class="responsive-button">DODAJ TRGOVINU</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        name:'AddStore',
        data(){
            return{
                adrese:[],
                novaTrgovina:{
                    name:'',
                    address_id:''
                }
            }
        },
        methods:{
            async dodajNovuTrgovinu(){
                try{
                    const response=await axios.post('http://localhost:3000/trgovine',this.novaTrgovina);
                    if(response.status===201){
                        this.novaTrgovina={
                            name:'',
                            address_id:''
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
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.dohvatiAdrese();
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