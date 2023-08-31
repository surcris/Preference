<template>
    <header>
        <div @click="myStore.btnMenu()" class="icon-menu">
            <i class="fa-solid fa-bars-staggered"></i>
        </div>
        
        <div v-if="myStore.etathome && myStore.modeModalFav == false" @click="myStore.etatbtnSearch" class="icon-search">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <!-- <div class="header-accueil" v-if="modeHeader == 2">
            <router-link :to="{ name: 'accueil' }">Accueil</router-link>
        </div>
        <div @click="myStore.btnAjoutManga" v-if="modeHeader == 2" class="header-Ajout" >
            <p>Ajout Manga</p>
        </div>
        <div class="header-profil" v-if="modeHeader == 2">
            <router-link :to="{ name: 'profil' }">Profil</router-link>
        </div> 
        <div class="header-auth" v-if="modeHeader == 1">
            <router-link :to="{ name: 'authentification' }">Connexion</router-link>
        </div>
        <div @click="deconnect()" class="header-deco" v-if="modeHeader == 2">
            <p>Déconnexion</p>
        </div>-->
        <!--
        
        -->
        
    </header>
    <transition name="barre">
        <div v-if="myStore.btnSearch">
            <div  class="input-search">
                <div class="top-search">
                    <input type="text" v-model="valInput" placeholder="Search...">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div v-if="valInput" class="result-search">
                    <p v-for="resultat in searchResults">{{ resultat.titre }}</p>
                </div>
            </div>
        </div>
    </transition>
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
            valInput:"",
            filteredResults:"",
            barre:false,
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
    computed: {
        searchResults() {
            // Effectuer la logique de recherche et retourner les résultats pertinents
            if (this.myStore.storeManga && this.valInput != "") {
                const MAX_RESULTS = 5;
                const myArray = Object.values(this.myStore.storeManga);
                //console.log(myArray)
                this.filteredResults = myArray
                    .filter(manga => manga.titre.toLowerCase().includes(this.valInput))
                    .slice(0, MAX_RESULTS)

                console.log(this.filteredResults)
                return this.filteredResults;
            }


        }
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
        },
        filteredResults:{
            immediate: true,
            handler() {
                console.log(this.$refs)

                //this.$emit("getFiltre",this.filteredResults)
            }
        }
    }
}
</script>
<style scoped>
header{
    height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    
}
[class*='icon']{
    display: none;
}
header [class*='header']{
    margin: 0 10px;
    
}

a,p{
    text-decoration: none;
    color: aliceblue;
    font-size: 22px;
    font-weight: 700;
}
.barre-enter-from{
    opacity: 0;
}
.barre-enter-to{
    opacity: 1;
}
.barre-enter-active{
    transition: all 500ms ease;
}
.barre-leave-from{
    opacity: 1;
}
.barre-leave-to{
    opacity: 0;
}
.barre-leave-active{
    transition: all 500ms ease;
}
.input-search{
	position: fixed;
    z-index: 2;
	top: 5px;
	left: 50%;
	transform: translate(-50%, 0%);
	width: 50%;
	display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
    border-radius: 24px ;
    background-color: rgb(255, 255, 255);
    
}

.top-search {
    padding: 0 5px;
    width: 100%;
    height: 50px;
    
	display: flex;
	justify-content: center;
	align-items: center;
}
.top-search input{
	width: 90%;
	height: 60%;
	border:none;
	background-color: transparent;
	border-bottom:1px solid black ;
	font-size: 18px;
	outline: none;
    font-family: 'Kodchasan';
    font-weight: 600;
}

.top-search i{
	margin-left: 10px;
	font-size: 25px;
}
.result-search{
    width: 95%;
    height: fit-content;
    background-color: transparent;
    border-radius:  0 0 5px 5px;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: flex-start;
    
}
.result-search p{
    padding: 5px 0;
    width: 100%;
    padding-left: 5px;
    font-size: 18px;
    color: rgb(49, 49, 49);
    margin-bottom: 5px;
}
.result-search p:hover{
    border-radius: 5px;
    background-color: rgb(172, 172, 172);
    color: #ffffff;

}
/* @media (max-width: 450px) { */
    header [class*='header']{
        display: none;
    }
    header{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    [class*='icon']{
        width: 40px;
        height: 40px;
        border: 1px solid rgb(175, 175, 175);
        margin: 5px;
        padding: 0px;
        display: block;
        border-radius: 50px;
        display: flex;
    }
    [class*='icon'] i{
       
        margin: auto;
        font-size: 20px;
        color: rgb(255, 255, 255);
    }
    .input-search{
        border-radius: 15px;
    }
    .top-search {
        padding: 0 10px;
        width: 100%;
        height: 40px;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .result-search p:hover{
        border-radius: 15px;
        background-color: rgb(172, 172, 172);
        color: #ffffff;

    }
    
/* } */
</style>
