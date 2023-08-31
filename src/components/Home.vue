<template>
	<div v-if="myStore.etathome" class="home-container">
		<div class="header-tag">
			<div @click="etatTagHome = !etatTagHome" class="header-tag-content">
				<p>Catégorie</p>
				<Transition name="chevron">
					<div>
						<i  class="fa-solid fa-chevron-down"></i>
					</div>
				</Transition>
			</div>
			
		</div>
		<Transition name="tagsChev">
			<div v-if="etatTagHome">
				<div class="tags-home" :ref="'tags-home'" >
					<p :style="tag.active ? {backgroundColor:'red'} : {backgroundColor:'transparent'} "
					@click="tag.active = !tag.active" 
					:ref="'btn-p'+index"
					v-for="(tag,index) in tagsComp"  >{{ tag.tags }}</p>
				</div>
			</div>
		</Transition>
		<div v-if="myStore.btnSearch"><h3>{{ messageFiltre }}</h3></div>
		<div class="main-content">
			
			<div @click="activeModalFav" class="container-newCard">
				<div class="newCard-top">
					<img src="/images/add.png" alt="" >
				</div>
				<div class="newCard-bottom">
					<h3>Ajout</h3>
				</div>
				
			</div>
			
			<div v-for="(fav,index) in mesFav" :key="index" :ref="'manga '+index" :class="'container-FavCard-'">
				<div class="fav-background">
					<div class="newCard-modif">
						<div @click="modifManga(fav)" class="icon-modif"><i class="fa-solid fa-pen"></i></div>
						<div @click="removeManga(fav.titre)" class="icon-supp"><i class="fa-solid fa-trash"></i></div>
					</div>
					<div @click="activeModalShowFav(fav)" class="newCard-top">
						<img src="/images/poulet.png" alt="" >
					</div>
					<div @click="activeModalShowFav(fav)" class="newCard-bottom">
						<h3>{{ fav.titre }}</h3>
					</div>
				</div>
			</div>
			
		</div>
	</div>
	
	<Menu v-if="myStore.modeMenu"></Menu>
	<TodoList v-if="myStore.modeTodo"></TodoList>
	<SearchBarre @getFiltre="getEmitFiltre"  v-if="myStore.btnSearch" :mangas="mesFav" />
	<ModalAdd :manga="modifMangaObj" v-if="myStore.modeModalFav"/>
	<modalAffManga :manga="affMangaObj" v-if="myStore.modalShowFav == true"/>

	<!--
		<Transition name="menuTrans">
		<div v-if="myStore.modeMenu" >
			<Menu></Menu>
		</div>
	</Transition>
	-->
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
			tagsCates: ["Romance", "Action", "Réincarnation", "Return Time","Modern","Médiévale","Cultivation","Asian era","Villainess","Revenge","System"],
			tagsComp:[],
			colors: ["red", "#48D1CC", "green", "orange", "#483D8B", "yellow", "pink"],
			unsubscribe:null,
			affMangaObj:null,
			modifMangaObj:null,
			randomColor: 0,
			user:null,
			cryptTool:new CryptController(),
			messageFiltre:"",
			etatTagHome:false,
        }
    },
    methods: {
		isTagSelected(index) {
            console.log(this.tagsComp[index])
			
            this.tagsComp[index].active = !this.tagsComp[index].active;
            if (this.tagsComp[index].active) {
                // this.$refs['btn-'+index][0].className = "btn-active"
                this.$refs['btn-p'+index][0].style.backgroundColor = "red"
            }else{
                // this.$refs['btn-'+index][0].className = "btn-notActive"
                this.$refs['btn-p'+index][0].style.backgroundColor = "transparent"
            }
            console.log(this.$refs['btn-p'+index])

        },
		getEmitFiltre(res){
			// console.log(res)
			if (res != null) {
				if (res == "") {
					this.messageFiltre = "Aucun résultat";
					for (const key in this.$refs) {
						// affiche tous les manga 
						//console.log(this.$refs[key])
						this.$refs[key][0].style.display = "flex";
					}
				} else {
					this.messageFiltre = res.length + " résultat"
					for (const key in this.$refs) {
						for (let index = 0; index < res.length; index++) {
							if (key.includes(res[index].titre)) {
								// affiche les manga qui correspondant au titre
								this.$refs[key][0].style.display = "flex";
								// Sort de la boucle actuellement utilisé
								break;
							} else {
								// masque les manga qui ne correspondant pas au titre	
								this.$refs[key][0].style.display = "none";
							}
						}
					}
				}
			}
			
				
		},
		showTagHome(){
			this.etatTagHome = !this.etatTagHome;
			// console.log(this.$refs['tags-home'])
			if (this.etatTagHome) {
				this.$refs['tags-home'].style.display = "flex";
			}else{
				this.$refs['tags-home'].style.display = "none";
			}
			
		},
		showCard(listTags){
			console.log(this.$refs)
			let l_titre = [];
			// console.log(this.mesFav)
			// détecte les manga qui ont le tags sélectionner 
			for (const fav in this.mesFav) {
				if (this.mesFav[fav].tags) {
					for (let index_f = 0; index_f < this.mesFav[fav].tags.length; index_f++) {
						for (let index_L = 0; index_L < listTags.length; index_L++) {
							// vérifie si le tag soit indentique au tag du manga
							if (listTags[index_L] === this.mesFav[fav].tags[index_f]) {
								// vérifie que le manga ne soit pas déja dans la liste si non ajout le manga dans la liste et 
								if (!l_titre.includes("manga " + this.mesFav[fav].titre)) {
									l_titre.push("manga " + this.mesFav[fav].titre);
								}
							}

						}

					}
				}
			}
			console.log(l_titre)
			// masque les manga qui ne correspondant pas au tag
			for (const key in this.$refs) {
				// console.log(key,l_titre.includes(key))
				if (key.startsWith("manga") && !l_titre.includes(key)) {
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
						this.myStore.storeManga = data;
						//console.log("store",this.myStore.storeManga)
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
			this.myStore.btnAjoutManga()
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
							//console.log("Tags sélectionner : ",l_cate);
						}
						this.getEmitFiltre();
					}
				}
				if (l_cate.length == 0) {
					// console.log("vide");
					// affiche tous les mange s'il n'y a pas de tags de séléctionner.
					for (const key in this.$refs) {
						if (key.startsWith("manga") ) {
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
.header-tag{
	color: white;
	width: 100%;
	display: none;
	align-items: center;
	justify-content: center;
}
.header-tag-content{
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.header-tag-content p{
	font-weight: 300;
	font-size: 18px;
}
.chevron-enter-from{
    transform: rotate(0);
}
.chevron-enter-to{
    transform: rotate(180deg);
}
.chevron-enter-active{
    transition: all 500ms ease;
}
.chevron-leave-from{
    transform: rotate(180deg);
}
.chevron-leave-to{
    transform: rotate(0);
}
.chevron-leave-active{
    transition: all 500ms ease;
}

.tagsChev-enter-from{
    opacity: 0;
	height: 0;
}
.tagsChev-enter-to{
    opacity: 1;
	height: max-content;
}
.tagsChev-enter-active{
    transition: all 1s ease;
}
.tagsChev-leave-from{
    opacity: 1;
	height: max-content;
}
.tagsChev-leave-to{
    opacity: 0;
	height: 0;
}
.tagsChev-leave-active{
    transition:all 0s ease;
}
.tags-home{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding-top: 15px;
}

.menuTrans-enter-from{
    opacity: 0;
	
}
.menuTrans-enter-to{
    opacity: 1;
	
}
.menuTrans-enter-active{
    transition: all 500ms ease;
}
.menuTrans-leave-from{
    opacity: 1;
	
}
.menuTrans-leave-to{
    opacity: 0;
	
}
.menuTrans-leave-active{
    transition:all 500ms ease;
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
	
	margin: 5px;
	cursor: pointer;
}
.main-content{
	max-width: 100vw;
	gap: 5px;
	display: grid;
	grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
	justify-items: center;
}
.fav-background{
	border: aliceblue solid 1px;
	width: 200px;
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 0;
	/* margin: 20px; */
	border-radius: 5px;
	background-color: rgb(198, 212, 224);
	cursor: pointer;
	position: relative;
}

.container-newCard {
	border: aliceblue solid 1px;
	width: 200px;
	height: 300px;
	display: flex;
	flex-direction: column;
	/* margin: 20px; */
	border-radius: 5px;
	background-color: rgb(198, 212, 224);
	cursor: pointer;
	position: relative;
}
.container-newCard img,[class*="container-FavCard"] img{
	
	width: 100%;
	height: auto;
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

@media (max-width: 450px)  {
	.main-content{
		max-width: 100vw;
		gap: 5px;
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
		justify-items: center;
	}
	.header-tag{
		display: flex;
		margin: 5px 0;
	}
	.tags-home{
		
		padding-top: 0px;
	}
	.tags-home p{
		border: 1px solid aliceblue;
		padding: 2px 5px;
		font-size: 15px;
		color: aliceblue; 
		border-radius: 20px;
		
		margin: 1px 2px;
		cursor: pointer;
	}
	
	.container-newCard{
		display: none;
	}
	
	[class*="container-FavCard"]{
		width: 100%;
		height: fit-content;
		padding: 5px;
		
	}
	[class*="container-FavCard"] .fav-background{
		max-height:10%;
		height: 190px;
	}
	[class*="container-FavCard"] h3{
		font-size: 15px;
		
		text-overflow: ellipsis; 
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
	
	.fav-background{
		position: relative;
	}
	.newCard-modif{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
	.newCard-modif div{
		
		opacity: 1;
	}
	.newCard-top{
		min-height: fit-content;
		
	}
	.fav-background{
		width: 100%;
		max-height: 160px;
		box-sizing: border-box;
		padding: 0;
		margin: 0px;
	}
	
}
</style>