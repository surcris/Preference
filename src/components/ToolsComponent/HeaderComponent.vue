<template>
    <header>
        <div class="header-accueil" v-if="modeHeader == 2">
            <router-link :to="{ name: 'accueil' }">Accueil</router-link>
        </div>
        <div class="header-profil" v-if="modeHeader == 2">
            <router-link :to="{ name: 'profil' }">Profil</router-link>
        </div>
        <div class="header-auth" v-if="modeHeader == 1">
            <router-link :to="{ name: 'authentification' }">Connexion</router-link>
        </div>
        <div @click="deconnect()" class="header-deco" v-if="modeHeader == 2">
            <p>Déconnexion</p>
        </div>
    </header>
</template>

<script >
import { auth } from '../../../firebase';
import { useMyStore } from '../../stores/store';
export default {
    data(){
        return{
            myStore:useMyStore(),
            modeHeader:null,
            seKey: sessionStorage.getItem('akey'),
        }
    },
    methods:{
        deconnect() {
            //console.log(auth)
            auth.signOut(auth.getAuth())
                .then((response) => {
                    // Déconnexion réussie
                    sessionStorage.removeItem("akey");
                    console.log('Utilisateur déconnecté');
                    this.myStore.updateVariable(1);
                    this.modeHeader = this.myStore.modeHeaderStore;
                    this.$router.push('/authentification');
                })
                .catch((error) => {
                    // Gestion des erreurs de déconnexion
                    console.error('Erreur lors de la déconnexion', error);
                });
        }
    },
    mounted(){
        
    },
    created(){
        if (this.seKey != null) {
            this.myStore.updateVariable(2)
            this.modeHeader = this.myStore.modeHeaderStore
            //console.log(this.modeHeader)
        }else{
            this.myStore.updateVariable(1)
            this.modeHeader = this.myStore.modeHeaderStore
            //console.log(this.myStore.modeHeaderStore)
        }
    },
    watch:{
        'myStore.modeHeaderStore':function () {
            this.modeHeader = this.myStore.modeHeaderStore;
        }
    }
}
</script>
<style scoped>
header{
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    
}
header div{
    margin: 0 10px;
    
}
a,p{
    text-decoration: none;
    color: aliceblue;
    font-size: 22px;
    font-weight: 700;
}
</style>
