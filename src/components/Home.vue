<template>
	<div class="home-container">
		<div class="tags-home">
			<p @click="tag.active = !tag.active" :style="tag.active ? 
			{backgroundColor:'red'} :{backgroundColor:'transparent'} "
			:ref="'btn-p'"
			v-for="(tag,index) in tagsComp"  >{{ tag.tags }}</p>
			
			
		</div>
		<div class="main-content">
			<div @click="activeModalFav" class="container-newCard">
				<div class="newCard-top">
					<img src="/images/add.png" alt="" >
				</div>
				<div class="newCard-bottom">
					<h3>Ajout</h3>
				</div>
				
			</div>

			<div v-for="(fav,index) in mesFav" :key="index" :ref="index" :class="'container-FavCard-'">
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
	</div>
	<Menu v-if="myStore.btnSearch" ></Menu>
	<TodoList v-if="myStore.modeTodo"></TodoList>
	<SearchBarre @getFiltre="getEmitFiltre"  v-if="myStore.btnSearch" :mangas="mesFav" />
	<ModalAdd :manga="modifMangaObj" v-show="myStore.modeModalFav == true"/>
	<modalAffManga :manga="affMangaObj" v-if="myStore.modalShowFav == true"/>
</template>


<script lang='js'>
import { useMyStore } from '../stores/store';
//import {auth,db} from '../../firebase';
import ModalAdd from './ToolsComponent/ModalAddFav.vue';
import modalAffManga from './ToolsComponent/modalAffManga.vue';
import MangaController from '../class/todoController';
import CryptController from '../class/crypt';
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
			tagsSites: ["Toonily", "1stkissmanga", "Aquamanga", "MangaTx","Zinmanga"],
			tagsCates: ["Romance", "Action", "Réincarnation", "Return Time","Modern","Médiévale","Cultivation","Asian era"],
			tagsComp:[],
			colors: ["red", "#48D1CC", "green", "orange", "#483D8B", "yellow", "pink"],
			unsubscribe:null,
			affMangaObj:null,
			modifMangaObj:null,
			randomColor: 0,
			user:null,
			cryptTool:new CryptController()
        }
    },
    methods: {
		getEmitFiltre(res){
			console.log(res)
			
			if (res == "") {
				for (const key in this.$refs) {
					// affiche tous les manga 
					this.$refs[key][0].style.display = "flex";
				}
			} else {
				for (const key in this.$refs) {
					for (let index = 0; index < res.length; index++) {
						if (key.includes(res[index].titre)) {
							// affiche les manga qui correspondant au titre
							this.$refs[key][0].style.display = "flex";
							console.log('yes', key);
							break;
						} else {
							// masque les manga qui ne correspondant pas au titre	
							this.$refs[key][0].style.display = "none";
						}
					}
				}
			}
				
		},
		showCard(listTags){
			
			let l_titre = [];
			
			// détecte les manga qui ont le tags sélectionner 
			for (const fav in this.mesFav) {
				for (let index_f = 0; index_f < this.mesFav[fav].tags.length; index_f++) {
					for (let index_L = 0; index_L < listTags.length; index_L++) {
						// vérifie si le tag soit indentique au tag du manga
						if (listTags[index_L] === this.mesFav[fav].tags[index_f]) {
							// vérifie que le manga ne soit pas déja dans la liste si non ajout le manga dans la liste et 
							if (!l_titre.includes(this.mesFav[fav].titre)) {
								l_titre.push(this.mesFav[fav].titre);
							}
						}

					}

				}
			}
			// masque les manga qui ne correspondant pas au tag
			for (const key in this.$refs) {
				if (key !== "btn-p" && !l_titre.includes(key)) {
					this.$refs[key][0].style.display = "none";
				}
			}
			// affiche les manga correspondant au tag
			for (let index = 0; index < l_titre.length; index++) {
				const refKey = l_titre[index];
				if (this.$refs[refKey]) {
					this.$refs[refKey][0].style.display = "flex";

				}
			}
			
		},
		initTags(){
			for (let index = 0; index < this.tagsSites.length; index++) {
				this.tagsComp.push({tags:this.tagsSites[index],active:false}) 
				
			}
			for (let index = 0; index < this.tagsCates.length; index++) {
				this.tagsComp.push({tags:this.tagsCates[index],active:false}) 
				
			}
			//console.log(this.tagsComp)

			
		},
		addFavorie() {
			const user = userC.getAuthUser().currentUser;
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
		async getDataInit(){
			
			try {
				if (this.user) {
					await this.mangaC.getAllTask()
						.then((snapshot) => {
							if (!snapshot.exists()) {
								console.log("Pas de données disponibles");
							}else{
								console.log("Données disponible");
							}
						})
				}
			} catch (error) {
				console.error(error);
			}
		},
		async getAllAff() {
			
			try {
				if (this.user.uid == this.cryptTool.decrypt(sessionStorage.getItem("akey"))) {
					this.unsubscribe = await this.mangaC.getDB().onValue(this.mangaC.getRefManga(), (snapshot) => {
						const data = snapshot.val();
						this.mesFav = data;
						//console.log(this.mesFav)
					})
				}
			} catch (error) {
				console.error(error);
			}
		},
		
		async removeManga(titre) {
			
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
		getRandomColor() {
			const colors = ["red", "blue", "green", "orange", "purple", "yellow", "pink"];
			const randomIndex = Math.floor(Math.random() * colors.length);
			this.randomColor++;
			if (this.randomColor > colors.length) this.randomColor = 0;
			console.log(this.randomColor)
			return colors[this.randomColor];
		},
		getTagStyle(index) {
			// this.randomColor++;
			const colors = ["red", "blue", "green", "orange", "purple", "yellow", "pink"];
			// if (this.randomColor > colors.length) this.randomColor = 0;
			console.log(index)
			return {
				border: '2px solid '+colors[index],
				padding: "5px",
				fontSize: '20px',
				color: colors[index],
				borderRadius: "20px",
				backgroundColor: "transparent",
				margin: "5px"
			};
		},
		
		
	},
	computed: {
		
	},
    async mounted(){
		await new Promise((resolve) => {
			const interval = setInterval(() => {
				this.user = this.userC.getAuthUser().currentUser;
				if (this.user) {
					clearInterval(interval);
					resolve();
				}
			}, 100);
		});
		
		if ( navigator.onLine) {
			if (this.user) {
				this.initTags()
				this.getAllAff();
				
			} else {
				console.log("Utilisateur non connecté");
			}
		} else {
			console.log("Vous n'êtes pas connecté à Internet");
		}
	
    },
	watch:{
        "myStore.modeModalFav": {
            immediate: true,
            handler() {
				if(this.myStore.modeModalFav == false){
					this.modifMangaObj = null;
				}
                
                
            }
        },

		tagsComp: {
            deep: true,
            handler() {
				let l_cate = [];
				for (const tag of this.tagsComp) {
					
					if (tag.active) {
						//console.log(tag.titre);
						if (!l_cate.includes(tag.tags)) {
							l_cate.push(tag.tags);
							console.log("Tags sélectionner : ",l_cate);
						}
						this.getEmitFiltre();
					}
				}
				if (l_cate.length == 0) {
					console.log("vide");
					// affiche tous les mange s'il n'y a pas de tags de séléctionner.
					for (const key in this.$refs) {
						if (key !== "btn-p") {
							this.$refs[key][0].style.display = "flex";
							//console.log("1",key)
						}
					}
				}else{
					this.showCard(l_cate);
				}
                
            }
        },
		
    },
	async created(){
		

		if (sessionStorage.getItem("akey") == null ) {
			this.$router.push("authentification");
			console.log('redirect')
		}
		
	},
	destroyed(){
		this.unsubscribe();
		console.log("Destruction")
		//this.mangaC.off(this.mangaC.getRefManga())
	}
}

</script>

<style scoped >
.home-container{
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
}
.tags-home{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding-top: 15px;
}
.tags-home p{
	border: 2px solid aliceblue;
	padding: 5px;
	font-size: 20px;
	color: aliceblue; 
	border-radius: 20px;
	background-color: transparent;
	margin: 5px;
	cursor: pointer;
}
.main-content{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.container-newCard, [class*="container-FavCard"] {
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
.container-newCard img,[class*="container-FavCard"] img{
	
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
[class*="container-FavCard"]:hover .newCard-modif div{
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