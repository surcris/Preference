<template>
    <div class="container-formco">
        <form @submit.prevent="connectUser()">
            <div class="form-input" >
                <input type="text" name="email"  class="form-control  my-2"  placeholder="Email" v-model="infoConnexion.email">
                <input type="password" name="mdp" class="form-control  my-2"  placeholder="Mot de passe" v-model="infoConnexion.password">
            </div>
            <div class="form-check">
                <input type="checkbox" name="" id="">
                <label for="scales">Se souvenir de moi</label>
            </div>
            
            <div class="form-submit">
                <button  type="submit" class="btn btn-primary my-2">Valider</button>
            </div>
            <div class="form-line"></div>
        </form>
    </div>
</template>

<script >
import app from '../../firebase';
import {auth} from '../../firebase';
import crypt from "./../class/crypt.js"
import { useMyStore } from '../stores/store';

export default {
    data(){
        return{
            myStore: useMyStore(),
            infoConnexion:{
                email:"",
                password:"",
            },
            
        }
    },
    methods:{
        connectUser(){
            //console.log(auth)
            auth.signInWithEmailAndPassword(auth.getAuth(),this.infoConnexion.email, this.infoConnexion.password)
                .then((userCredential) => {
                    // Connexion réussie, récupérer l'utilisateur connecté
                    const user = userCredential.user;
                    console.log('Utilisateur connecté ');
                    const uidCrypt = crypt.encryptData(user.uid);
                    sessionStorage.setItem("akey",uidCrypt)
                    this.myStore.updateVariable(2);
                    
                    this.$router.push('/accueil');
                    
                })
                .catch((error) => {
                    // Erreur lors de la connexion, gérer l'erreur
                    console.error('Erreur de connexion :', error);
                });
        },
    },
    mounted(){
        
    },
    created(){
        if ( sessionStorage.getItem('akey') != null) {
            this.$router.push('/accueil'); 
        }
    },
}
</script>

<style scoped>
.container-formco{
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
}
form{
    width: 20%;
}
.form-input{
    display: flex;
    flex-direction: column;
    
}
.form-input input{
    margin: 10px 0px;
    padding: 10px 0px;
    text-align: center;
    background-color: rgba(4, 45, 50, 0.8);
    border-radius: 5px;
    border: none;
    font-weight: 400;
    font-size: 24px;
    color: #fff;
}
.form-input input::placeholder{
    font-family: 'Kodchasan', sans-serif;
    opacity: 0.5;
    color: white;
    font-weight: 800;
    font-size: 24px;
}
.form-check{
    font-family: 'Kodchasan', sans-serif;
    display: flex;
    align-items: center;
    color: white;
}
.form-check input{
    height: 15px;
    width: 15px;
}
.form-submit{
    width: 100%;
    padding: 10px 0px;
    display: flex;
    justify-content: center
}
.form-submit button{
    cursor: pointer;
    background: linear-gradient(90deg, #4D194D 35.91%, #000000 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    width: 100%;
    height: 40px;
    color: white;
    border: none;
    font-family: 'Kodchasan', sans-serif;
    font-weight: 700;
    font-size: 16px;
}


.form-line{
    border-bottom: #fff solid 1px;
}

</style>
