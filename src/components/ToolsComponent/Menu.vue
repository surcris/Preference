<template>
    
	<!-- <div @click="myStore.etatmodeTodo()" class="btn-todo " >
		<i class="fa-solid fa-clipboard-list"></i>
	</div>
	<div @click="myStore.etatactionBdd()" class="btn-calc" >
		<i class="fa-solid fa-calculator"></i>
	</div>-->
	
		<div class="menu-container-mobile">
			<div v-if="myStore.etathome == false" @click="myStore.btnAccueil()" class="btn-mobile-todo " >
				<i class="fa-solid fa-house"></i>
				<p>Accueil</p>
			</div>
			<div @click="myStore.etatmodeTodo(); myStore.btnMenu(); 
			myStore.etatBtnHome(); myStore.modeModalFav = false;" class="btn-mobile-todo " >
				<i class="fa-solid fa-clipboard-list"></i>
				<p>ToDo List</p>
			</div>
			<!-- 
			<div @click="myStore.etatactionBdd()" class="btn-mobile-calc" >
				<i class="fa-solid fa-calculator"></i>
				<p>Calculatrice</p>
			</div>-->
			<div @click="myStore.btnAjoutManga" class="btn-mobile-calc" >
				<i class="fa-solid fa-circle-plus"></i>
				<p>Ajout Manga</p>
			</div>
			<div @click="deconnect" class="btn-mobile-calc" >
				<i class="fa-solid fa-right-from-bracket"></i>
				<p>Déconnexion</p>
			</div>
		</div>
	
</template>

<script>
import { auth } from '../../../firebase';
import { useMyStore } from '../../stores/store';
export default{
    data(){
        return{
            myStore:useMyStore(),
			animate:false
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
	
}
</script>

<style scoped>
.containe-search{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0,0.4);
}
.btn-todo , .btn-calc{
	position: fixed;
	z-index: 2;
	right: 15px;
	height: 50px;
	width: 50px;
	border: solid rgb(46, 46, 46) 1px;
	background-color: rgb(223, 223, 223);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn-todo{
    top: 160px;
}
.btn-calc{
	
	top: 220px;
	
}
.btn-todo i ,.btn-calc i{
	font-size: 25px;
}


.menu-container-mobile{
	
	position: absolute;
	z-index: 10;
	top: 55px;
	height: fit-content;
	width: 200px;
	background-color: rgb(223, 223, 223);
	border-radius: 5px;
	padding: 2px 0;
	
}

.menuMobile-enter-from{
    opacity: 0;
	
}
.menuMobile-enter-to{
    opacity: 1;
	
}
.menuMobile-enter-active{
    transition: all 500ms ease;
}
.menuMobile-leave-from{
    opacity: 1;
	
}
.menuMobile-leave-to{
    opacity: 0;
	
}
.menuMobile-leave-active{
    transition:all 500ms ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.btn-todo{
    top: 160px;
}
.btn-calc{
	
	top: 220px;
	
}
.btn-todo i ,.btn-calc i{
	font-size: 25px;
}

/* @media (max-width: 450px) { */

	.menu-container-mobile{
		display: block;
		

	}
	.btn-todo  , .btn-calc {
		display: none;
	}
	[class*="btn-mobile"] {
		height: 50px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 4px ;
		transition: all 0.5s;
	}
	[class*="btn-mobile"]:hover {
		background-color: rgb(153, 153, 153);
		border-radius: 5px;
		color: rgb(143, 0, 0);
	}
	[class*="btn-mobile"]:hover p{
		font-size: 20px;
		font-weight: 700;
		
	}
	[class*="btn-mobile"] i{
		height: 45px;
		width: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
/* } */

</style>