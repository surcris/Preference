
<script>
import { useMyStore } from '../../stores/store';
import UserController from '../../class/userController';
import MangaController from '../../class/todoController';
export default {
    props:['manga'],
    data(){
        return{
            myStore:useMyStore(),
			mangaC: new MangaController(),
            objManga:{
                titre:null,
                status: null,
                commentaire : null,
                tags:[],
                lien:[],
                image: null,
            },
            messageForm:null,
            lienCount:[
                {
                    lien:''
                }
            ],
            userC: new UserController(),
			tagsCates: ["Toonily", "1stkissmanga", "Aquamanga", "MangaTx","Zinmanga","Romance",
             "Action", "Réincarnation", "Return Time","Modern","Médiévale","Cultivation","Asian era","Villainess","Revenge","System"],
            tagsComp:[],

        }
    },
    methods:{
        isTagSelected(index) {
            console.log(this.$refs)
            this.tagsComp[index].active = !this.tagsComp[index].active;
            if (this.tagsComp[index].active) {
                this.$refs['btn-'+index][0].className = "btn-active"
                this.$refs['p-'+index][0].className = "p-active"
            }else{
                this.$refs['btn-'+index][0].className = "btn-notActive"
                this.$refs['p-'+index][0].className = "p-notActive"
            }
            

        },
        initTagTab(){
			for (let index = 0; index < this.tagsCates.length; index++) {
				this.tagsComp.push({tags:this.tagsCates[index],active:false}) 
				
			}
			//console.log(this.tagsComp)
		},
        async sendFav() {
            console.log(this.$refs)
            // console.log(this.lienCount)
            this.objManga.titre = this.$refs.titre.value;
            // this.objManga.commentaire = "";
            this.objManga.image = "";

            if (this.$refs.finis.checked) {
                this.objManga.status = this.$refs.finis.value;
            } else if (this.$refs.encours.checked) {
                this.objManga.status = this.$refs.encours.value;
            } else {
                this.objManga.status = null;
            }
            for (let index = 0; index < this.lienCount.length; index++) {
                
                if (this.lienCount[index].lien != "") {
                    
                    this.objManga.lien.push(this.lienCount[index].lien)
                    console.log(this.objManga.lien);
                }
            }
            for (let index = 0; index < this.tagsComp.length; index++) {
                if (this.tagsComp[index].active == true) {
                    this.objManga.tags.push(this.tagsComp[index].tags)
                }
            }
            // console.log(this.objManga.lien);
            try {
                if (navigator.onLine == true) {
                    //console.log("1");
                    const snapshot = await this.mangaC.getOneManga(this.objManga.titre);
                    const data = snapshot.val();
                    const user = this.userC.getAuthUser().currentUser;
                    // console.log(data);
                    //this.userC.maintainUser()
                    if (data == null && user != null) {
                        //console.log("2");
                        this.messageForm = null;
                        this.mangaC.addManga(this.objManga);

                        //Réinitialisation des valeurs de objManga
                        this.objManga.titre = null;
                        this.objManga.commentaire = null;
                        this.objManga.image = null;
                        this.objManga.status = null;
                        this.objManga.lien.length = 0;
                        

                        //Réinitialisation des valeurs des inputs
                        this.$refs.titre.value = '';
                        // this.$refs.commentaire.value = '';
                        // this.$refs.imglien.value = '';
                        this.$refs.finis.checked = false;
                        this.$refs.encours.checked = false;
                          
                        for (let index = 0; index < this.lienCount.length; index++) {
                            
                            this.$refs['lien'+index].value = '';
                        }
                        this.lienCount.length = 1;
                        
                        for (let index = 0; index < this.tagsComp.length; index++) {
                            this.tagsComp[index].active = false; 
                            
                        }
                        this.myStore.etatModalFav();
                    }else{
                        if (data!=null) {
                            this.messageForm = "Titre déjà enregistrer"
                        }else if(user==null){
                            this.messageForm = "Vous n'etes pas connecter"
                        }
                        
                    }
                    
                } else {
                    
                    this.messageForm = "Vous n'etes pas connecter a internet !!!"
                }

                
            } catch (error) {
                console.error(this.messageForm,error);
                
            }

        },
        modifFav() {
            
            // //console.log(this.$refs.finis)
            this.objManga.titre = this.$refs.titre.value;
            this.objManga.commentaire = "";
            this.objManga.image = this.$refs.imglien.value;

            if (this.$refs.finis.checked) {
                this.objManga.status = this.$refs.finis.value;
            } else if (this.$refs.encours.checked) {
                this.objManga.status = this.$refs.encours.value;
            } else {
                this.objManga.status = null;
            }
            
            for (let index = 0; index < this.lienCount.length; index++) {
                if (this.lienCount[index].lien != "") {
                    this.objManga.lien.push(this.lienCount[index].lien)
                }
            }
            for (let index = 0; index < this.tagsComp.length; index++) {
                if (this.tagsComp[index].active == true) {
                    this.objManga.tags.push(this.tagsComp[index].tags)
                }
            }
            // console.log(this.objManga.lien);
            this.mangaC.suppMangaTags(this.objManga.titre);
            this.mangaC.updateManga(this.objManga);
            

            //Réinitialisation des valeurs de objManga
            this.objManga.titre = null;
            this.objManga.commentaire = null;
            this.objManga.image = null;
            this.objManga.status = null;
            this.objManga.tags = [];
            this.objManga.lien.length = 0;
            

            //Réinitialisation des valeurs des inputs
            this.$refs.titre.value = '';
            this.$refs.commentaire.value = '';
            this.$refs.imglien.value = '';
            this.$refs.finis.checked = false;
            this.$refs.encours.checked = false;
            for (let index = 0; index < this.lienCount.length; index++) {
                this.$refs['lien' + index].value = '';
            }
            this.lienCount.length = 1;
            
            for (let index = 0; index < this.tagsComp.length; index++) {
                
                this.tagsComp[index].active = false; 
                
            }
            
            this.myStore.etatModalFav();
        },
        async mangaExist(titre) {
            try {
                const snapshot = await this.mangaC.getOneManga(titre);
                const data = snapshot.val();

                if (data === null) {
                    console.log("Titre non enregistré");
                    return false;
                } else {
                    console.log("Titre enregistré");
                    return true;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        addLien(){
            this.lienCount.push({lien:''}); 
            console.log(this.lienCount)
        },
        suppLien(){
            if (this.lienCount.length > 1) {
                this.lienCount.pop();
                console.log(this.lienCount)
            }
            console.log(this.lienCount)
        },
        closeModal(){
            this.myStore.etatModalFav();
            this.lienCount=1;
            this.messageForm = null;
            //Réinitialisation des valeurs des inputs
            this.$refs.titre.value = '';
            // this.$refs.commentaire.value = '';
            // this.$refs.imglien.value = '';
            this.$refs.finis.checked = false;
            this.$refs.encours.checked = false;
            this.lienCount.length = 1;
            this.$refs.lien.length = this.lienCount;
            this.$refs.lien[0].value = '';
            for (let index = 0; index < this.tagsComp.length; index++) {
                this.tagsComp[index].active = false; 
                
            }
            for (let index = 0; index < this.tagsComp.length; index++) {
                this.$refs['btn-' + index][0].className = "btn-notActive"

            }
        }
    },
    mounted(){
       
       this.initTagTab()
    },
    computed: {
        classClick() {
            return {
                color: 'red',
                border: '1px solid red'
            };
        }
    },
    watch:{
        tagsComp:{
            deep: true,
            handler(){
                for (let index = 0; index < this.tagsComp.length; index++) {
                    // if (this.tagsComp[index].active == true) {
                        
                    //     console.log(this.tagsComp[index].tags ,this.tagsComp[index].active )
                    // }
                    
                }
            }
        },
        manga: {
            immediate: true,
            handler() {
                if (this.manga != null) {
                    setTimeout(() => {
                        this.$refs.titre.value = this.manga.titre;
                        // this.$refs.commentaire.value = "";
                        // this.$refs.imglien.value = "";
                        if (this.manga.status == "En cours") {
                            this.$refs.encours.checked = true;
                        } else if (this.manga.status == "Finis") {
                            this.$refs.finis.checked = true;
                        } else {
                            this.$refs.finis.checked = false;
                            this.$refs.encours.checked = false;
                        }
                       
                        this.lienCount.pop()
                        
                        if (this.manga.lien) {
                            
                            for (let index = 0; index < this.manga.lien.length; index++) {
                                this.lienCount.push({lien:this.manga.lien[index]}); 
                                
                            }
                            console.log(this.lienCount)

                        } else {
                            this.manga["lien"] = "";
                        }
                        
                        for (let index = 0; index < this.tagsComp.length; index++) {
                            this.$refs['p-' + index][0].className = "p-notActive"

                        }
                        if (this.manga.tags) {
                            for (let i = 0; i < this.manga.tags.length; i++) {

                                for (let j = 0; j < this.tagsComp.length; j++) {

                                    if (this.manga.tags[i] === this.$refs['p-' + j][0].textContent) {
                                        this.$refs['p-' + j][0].className = "p-active";
                                        this.tagsComp[j].active = true;

                                    }

                                }

                            }
                        }
                        
                    }, 10);
                }
                
                
            }
        }
    }
}

</script>

<template>
	
    <div class="container-mobile-modalFav">
        <div @click="myStore.btnAccueil()" class="cross">X</div>
        <h3>Ajouter un Manga</h3>
        <div class="content-mobile-modalFav">
            <label for="">Titre</label>
            <input class="titre" ref="titre" type="text" placeholder="Titre">
            <div class="container-fieldset">
                <fieldset>
                    <legend >Status</legend>
                    <div class="content-checkbox">
                        <div >
                            <input ref="finis" type="checkbox" id="scales" name="scales" value="Finis">
                            <label for="scales">Finis</label>
                        </div>
                        <div>
                            <input ref="encours" type="checkbox" id="En cours" name="En cours" value="En cours">
                            <label for="En cours">En cours</label>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="div-buttonAdd">
                <div>
                    <label for="">Lien :</label>
                    <i class="fa-solid fa-circle-plus" @click="addLien()"></i>
                    <i class="fa-solid fa-circle-minus" @click="suppLien()"></i>
                    <!--
                        <button class="addLien" @click="addLien()">+</button>
                    <button class="suppLien" @click="suppLien()">-</button>
                    -->
                    
                </div>
                <div v-for="(count,index) in lienCount" :key="index">
                    <input :class="'lien'+index" :ref="'lien'+index" type="text" v-model="count.lien" 
                    >
                </div>
            </div>
            
            <div>
                <label for="">Tags :</label>
                <div class="container-tags">
                    <p v-for="(tag,index) in tagsCates" class="p-basic" :ref="'p-'+index" @click="isTagSelected(index)" > 
                    {{ tag }}
                    </p>
                </div>
            </div>
            <div class="validation">
                <button class="btn-valide" @click="manga == null ?  sendFav() : modifFav() ">Valider</button>
                <p>{{messageForm}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">

.container-modalFav .titre{
    
    height: 35px;
    font-size: 20px;
    font-weight: 500;
    border: 1px solid rgb(37, 37, 121);;
    border-radius: 5px;

}

.content-checkbox{
        
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

}
.content-checkbox div{
    margin: 5px ;
    
}
.content-checkbox label{
    font-size: 18px;
    margin-left: 2px;
}

.cross{
    display: flex;
    justify-content: end;
    cursor: pointer;
    margin-right: 5px;
    font-weight: bolder;
    font-size: larger;
}

.modalFav-contenu .titre{
    height: 35px;
    border-radius: 5px;
    font-size: 20px;
}

.div-buttonAdd{
    display: flex;
    flex-direction: column;
}
.div-buttonAdd div:nth-child(1){
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;

}
.div-buttonAdd div:nth-child(1) i{
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(37, 37, 121);
    font-size: 20px;
    margin-left: 5px;
}

[class*="lien"]{
    margin-bottom: 2px;
    height: 30px;
    width: 100%;
    border: solid rgb(37, 37, 121) 1px;
    border-radius: 5px;
    font-size: 20px;
    
}
.container-tags{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
}


.container-tags button{
    margin:  2px;
    padding: 0 5px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    /* border: 1px solid rgb(37, 37, 121); */
    /* color: rgb(37, 37, 121); */
    
}
.container-tags button:active{
    border: 1px solid red;
    color: red;
    
}
.container-tags .p-basic{
    margin:  2px;
    padding: 0 5px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid rgb(37, 37, 121);
    color: rgb(37, 37, 121);
    
}

textarea{
    resize: none;
    font-size: 20px;
    border-radius: 3px;
    height: 200px;
}
.btn-valide{
    margin-bottom: 10px;
    margin-left: 20px;
    font-family: 'Kodchasan';
    font-size: 18px;
    font-weight: 700;
    background-color: rgb(255, 255, 255);
    border: solid black 2px;
    border-radius: 5px;
    text-align: center;
}
.validation{
    display: flex;
    flex-direction: row;
}
.validation p{
    margin: 0 10px;
    font-size: 18px;
    font-weight: 700;
    color: rgb(250, 0, 0);
}
.container-mobile-modalFav{
    display: none;
    
}
/* //////////////////////////////////////// */


   
.container-mobile-modalFav{
    
    position: fixed;
    z-index: 0;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
    height: fit-content;

    width: 400px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    
}
@media (max-width: 450px) {
    .container-mobile-modalFav{
    
    position: fixed;
    z-index: 0;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
    height: fit-content;

    width: 90vw;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    
}

}


.content-mobile-modalFav{
    padding-top: 10px;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-self: center;
}
h3{
    margin-left: 5px;
    font-size: 25px;
}
.content-mobile-modalFav .titre{
    
    height: 35px;
    font-size: 20px;
    font-weight: 500;
    border: 1px solid rgb(37, 37, 121);;
    border-radius: 5px;

}
.content-mobile-modalFav .titre:focus{
    outline: none;
    
}
label{
    font-weight: 600;
}
.content-checkbox{
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

}
.content-checkbox div{
    margin: 5px ;
    
}
.content-checkbox label{
    font-size: 18px;
    margin-left: 2px;
}
.div-buttonAdd{
    display: flex;
    flex-direction: column;
}
.div-buttonAdd div:nth-child(1){
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;

}
label{
    font-size: 20px; 
}
.container-fieldset{
    padding: 10px 0;
}

.div-buttonAdd div:nth-child(1) i{
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(37, 37, 121);
    font-size: 20px;
    margin-left: 5px;
}
[class*="lien"]{
    border: 1px solid rgb(37, 37, 121);
    height: 35px;
}
.container-tags{
    color: rgb(37, 37, 121);
}
.container-tags .p-basic{
    margin:  2px;
    padding: 0 5px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid rgb(37, 37, 121);
    color: rgb(37, 37, 121);
    
}
/* .container-tags p:active{
    border-color: red;
    color: red;
} */
.p-active{
    margin:  2px;
    padding: 0 5px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid red;
    color: red;
}
.p-notActive{
    margin:  2px;
    padding: 0 5px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid rgb(37, 37, 121);
    color: rgb(37, 37, 121);
}
.validation{
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-valide{
    margin: 0;
    width: 70%;
    font-size: 18px;
    font-weight: 700;
    background-color: rgb(255, 255, 255);
    border: solid rgb(37, 37, 121) 1px;
    border-radius: 15px;
    text-align: center;
}


</style>