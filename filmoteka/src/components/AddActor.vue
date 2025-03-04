<template>
    <div class="container">
        <form class="form" @submit.prevent="dodajGlumca">
            <h1 class="title">DODAJ GLUMCA</h1>
            <div class="main-div">
                <div class="sub-div">
                    <label for="first_name">IME</label>
                    <input type="text" v-model="noviGlumac.first_name" id="first_name">
                </div>
            </div>
            <div class="main-div">
                <div class="sub-div">
                    <label for="last_name">PREZIME</label>
                    <input type="text" v-model="noviGlumac.last_name" id="last_name">
                </div>
                <div class="sub-button">
                    <button type="submit" class="responsive-button">DODAJ GLUMCA</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddActor',
        data(){
            return{
                noviGlumac:{
                    first_name:'',
                    last_name:''
                }
            }
        },
        methods:{
            async dodajGlumca(){
                try{
                    const response=await axios.post('http://localhost:3000/glumci',this.noviGlumac);
                    if(response.status===201){
                        this.noviGlumac={
                            first_name:'',
                            last_name:''
                        };
                        alert('Glumac dodan');
                    }else{
                        alert('Došlo je do greške prilikom dodavanja');
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            }
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