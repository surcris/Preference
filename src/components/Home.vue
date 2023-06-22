<template>
	<div class="home-container">
		<div @click="activeModalFav" class="container-newCard">
			<div class="newCard-top">
				<img src="/images/add.png" alt="" >
			</div>
			<div class="newCard-bottom">
				<h3>Ajout</h3>
			</div>
			
		</div>

		<div v-for="fav in mesFav" class="container-FavCard">
			<div class="newCard-modif">
				<div @click="modifManga(fav)" class="icon-modif"><i class="fa-solid fa-pen"></i></div>
				<div @click="removeManga(fav.titre)" class="icon-supp"><i class="fa-solid fa-trash"></i></div>
			</div>
			<div @click="activeModalShowFav(fav)" class="newCard-top">
				<img src="/images/add.png" alt="" >
			</div>
			<div class="newCard-bottom">
				<h3>{{ fav.titre }}</h3>
			</div>
			
		</div>
		<div @click="myStore.etatbtnSearch" class="btn-search">
			<i class="fa-solid fa-magnifying-glass"></i>
		</div>
		
	</div>
	<Menu v-if="myStore.btnSearch" ></Menu>
	<TodoList v-if="myStore.modeTodo"></TodoList>
	<!--<SearchBarre  v-show="myStore.btnSearch" />-->
	<ModalAdd :manga="modifMangaObj" v-show="myStore.modeModalFav == true"/>
	<modalAffManga :manga="affMangaObj" v-if="myStore.modalShowFav == true"/>
</template>

<script lang='js'>
import { useMyStore } from '../stores/store';
import {auth,db} from '../../firebase';
import ModalAdd from './ToolsComponent/ModalAddFav.vue';
import modalAffManga from './ToolsComponent/modalAffManga.vue';
import MangaController from '../class/mangaController';
import UserController from '../class/userController';
import SearchBarre  from './ToolsComponent/SearchBarre.vue';
import Menu from './ToolsComponent/Menu.vue';
import TodoList from './ToolsComponent/TodoList.vue';
export default {
	components:{
		ModalAdd,
		modalAffManga,
		SearchBarre,
		Menu,
		TodoList,
	},
    data(){
        return{
            myStore:useMyStore(),
			mesFav:null,
			modalFav:null,
			modalShowFav:false,
			mangaC: new MangaController(),
			userC: new UserController(),
			dbRefManga: db.ref(db.getDatabase(),`Manga/`),
			unsubscribe:null,
			affMangaObj:null,
			modifMangaObj:null,
			
        }
    },
    methods: {
		addFavorie() {
			const user = auth.getAuth().currentUser;
			try {
				if (user!=null) {
					console.log(user.uid)
					//console.log(this.mesFav)
					console.log("Ajouter un manga")
				}
			} catch (error) {
				console.log(error)
			}
		},
		activeModalFav(){
			this.myStore.etatModalFav();
		},
		activeModalShowFav(fav){
			this.affMangaObj = fav;
			this.myStore.etatModalShowFav();
			
		},
		async getAllAff() {
			//const dbRef = db.ref(db.getDatabase(),`Manga/`);
			try {
				this.unsubscribe = await this.mangaC.getDB().onValue(this.mangaC.getRefManga(), (snapshot) => {
					const data = snapshot.val();
					this.mesFav = data;
				})
				

			} catch (error) {
				console.error(error);
			}
		},
		
		async removeManga(titre) {
			//const dbRef = db.ref(db.getDatabase());
			try {
				await this.mangaC.suppManga(titre)
					.then(() => {
							
							console.log("Contenu supprimer et mis a jour de l'affichage");
						})
			} catch (error) {
				console.error(error);
			}
		},
		modifManga(fav){
			
			this.modifMangaObj = fav;
			this.myStore.etatModalFav();
		},

		
		
	},
    mounted(){
		this.getAllAff();
		
    },
	watch:{
        "myStore.modeModalFav": {
            immediate: true,
            handler() {
				if(this.myStore.modeModalFav == false){
					this.modifMangaObj = null;
				}
                
                
            }
        }
    },
	created(){
		if (this.userC.maintainUser() == false) {
			this.$router.push("authentification");
			//this.modalFav = this.mesFav.modeModalFav;
		}
		
	},
	destroyed(){
		this.unsubscribe();
		//this.mangaC.off(this.mangaC.getRefManga())
	}
}

</script>

<style scoped >
.home-container{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.container-newCard, .container-FavCard{
	border: aliceblue solid 1px;
	width: 200px;
	height: 300px;
	display: flex;
	flex-direction: column;
	margin: 20px;
	border-radius: 5px;
	background-color: rgb(198, 212, 224);
	cursor: pointer;
	position: relative;
}
.container-newCard img,.container-FavCard img{
	
	width: 100px;
	height: 100px;
}
.newCard-modif div{
	display: flex;
	position: absolute;
	top: 0;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	height: 30px;
	width: 30px;
	opacity: 0;
	transition: opacity 500ms ease-out;
	
}
.newCard-modif .icon-modif{
	background-color: rgba(0, 0, 0,0.3);
	right: 1px;
}
.newCard-modif .icon-supp{
	background-color: rgba(255, 0, 0, 0.3);
	left: 1px;
}
.container-FavCard:hover .newCard-modif div{
	opacity: 1;
}
.newCard-top {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 70%;
}
.newCard-bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: fit-content;
}
.newCard-bottom h3{
	text-align: center;
	margin: 0;
}
p{
	margin: 0;
}
.btn-search{
	position: fixed;
	top: 100px;
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
.btn-search i{
	font-size: 25px;
}

</style>