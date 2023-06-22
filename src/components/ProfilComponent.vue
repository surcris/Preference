<script>
//import { useMyStore } from '../stores/store';
import UserController from '../class/userController';

export default {
    data(){
        return{
            //myStore: useMyStore(),
            infoConnexion:{
                email:"",
                password:"",
            },
            userC: new UserController(),
        }
    },
    created(){
        if (this.userC.maintainUser() == false) {
			this.$router.push("authentification")
		}
    },
}
</script>

<template>
    <div class="profil-container">
        <h1>ffff</h1>
    </div>
    
</template>

<style scoped>
.profil-container{
    
    
}

</style>
