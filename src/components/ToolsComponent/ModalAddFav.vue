<template>
	<div class="container-modalFav">
		<div class="modalFav">
            <div @click="closeModal()" class="cross">X</div>
            <div class="modalFav-contenu">
                <label for="">Titre</label>
                <input class="titre" ref="titre" type="text" >
                <fieldset>
                    <legend >Status</legend>
                    <div>
                        <input ref="finis" type="checkbox" id="scales" name="scales" value="Finis">
                        <label for="scales">Finis</label>
                    </div>
                    <div>
                        <input ref="encours" type="checkbox" id="En cours" name="En cours" value="En cours">
                        <label for="En cours">En cours</label>
                    </div>
                </fieldset>
                <div class="div-buttonAdd">
                    <label for="">Lien :</label>
                    <button class="addLien" @click="addLien()">+</button>
                    <button class="suppLien" @click="suppLien()">-</button>
                </div>
                <div >
                    <input class="lien" ref='lien' type="text" v-for="count in lienCount" :key="count" :value="manga == null ? '' : manga.lien[count-1] ">
                </div>
                <label for="">Commentaire</label>
                <textarea ref="commentaire" name="" id="" cols="30" rows="10" ></textarea>
                <label for="avatar">Choisir une image:</label>
                <input ref="imglien" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
            </div>
            <div class="validation">
                <button class="btn-valide" @click="manga == null ?  sendFav() : modifFav() ">Valider</button>
                <p>{{messageForm}}</p>
            </div>
        </div>
	</div>
</template>

<script>
import { useMyStore } from '../../stores/store';

import MangaController from '../../class/mangaController';
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
                lien:[],
                image: null,
            },
            messageForm:null,
            lienCount:1,
        }
    },
    methods:{
        async sendFav() {
            
            this.objManga.titre = this.$refs.titre.value;
            this.objManga.commentaire = this.$refs.commentaire.value;
            this.objManga.image = this.$refs.imglien.value;

            if (this.$refs.finis.checked) {
                this.objManga.status = this.$refs.finis.value;
            } else if (this.$refs.encours.checked) {
                this.objManga.status = this.$refs.encours.value;
            } else {
                this.objManga.status = null;
            }
            for (let index = 0; index < this.lienCount; index++) {
                if (this.$refs.lien[index].value != "") {
                    this.objManga.lien.push(this.$refs.lien[index].value)
                }
            }
            //console.log(this.objManga);
            //let verifExist = 
            //console.log(this.mangaExist(this.objManga.titre))
            try {
                const snapshot = await this.mangaC.getOneManga(this.objManga.titre);
                const data = snapshot.val();

                if (data === null) {
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
                    this.$refs.commentaire.value = '';
                    this.$refs.imglien.value = '';
                    this.$refs.finis.checked = false;
                    this.$refs.encours.checked = false;
                    this.lienCount = 1;
                    this.$refs.lien.length = this.lienCount;

                    this.$refs.lien[0].value = '';
                } else {
                    this.messageForm = "Titre déjà enregistrer"
                    
                }
            } catch (error) {
                console.error(error);
                
            }

            // if (this.mangaExist(this.objManga.titre) == false) {
                
            // }else{
                
            // }
            //this.myStore.etatModalFav();
            //console.log(this.$refs.lien.length);
        },
        modifFav() {
            
            // //console.log(this.$refs.finis)
            this.objManga.titre = this.$refs.titre.value;
            this.objManga.commentaire = this.$refs.commentaire.value;
            this.objManga.image = this.$refs.imglien.value;

            if (this.$refs.finis.checked) {
                this.objManga.status = this.$refs.finis.value;
            } else if (this.$refs.encours.checked) {
                this.objManga.status = this.$refs.encours.value;
            } else {
                this.objManga.status = null;
            }
            
            for (let index = 0; index < this.lienCount; index++) {
                if (this.$refs.lien[index].value != "") {
                    this.objManga.lien.push(this.$refs.lien[index].value)
                }
            }
            //console.log(this.objManga);
            this.mangaC.updateManga(this.objManga);
            

            //Réinitialisation des valeurs de objManga
            this.objManga.titre = null;
            this.objManga.commentaire = null;
            this.objManga.image = null;
            this.objManga.status = null;
            this.objManga.lien.length = 0;
            

            //Réinitialisation des valeurs des inputs
            this.$refs.titre.value = '';
            this.$refs.commentaire.value = '';
            this.$refs.imglien.value = '';
            this.$refs.finis.checked = false;
            this.$refs.encours.checked = false;
            this.lienCount = 1;
            this.$refs.lien.length = this.lienCount;
            this.$refs.lien[0].value = '';
            
            // //console.log(this.$refs.lien.length);
            this.myStore.etatModalFav()
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
            this.lienCount++; 
        },
        suppLien(){
            if (this.lienCount > 1) {
                this.lienCount--;
            }
            
        },
        closeModal(){
            this.myStore.etatModalFav();
            this.lienCount=1;
            this.messageForm = null;
            //Réinitialisation des valeurs des inputs
            this.$refs.titre.value = '';
            this.$refs.commentaire.value = '';
            this.$refs.imglien.value = '';
            this.$refs.finis.checked = false;
            this.$refs.encours.checked = false;
            this.lienCount = 1;
            this.$refs.lien.length = this.lienCount;
            this.$refs.lien[0].value = '';
        }
    },
    mounted(){
       // this.mangaC.getAllManga();
    },
    watch:{
        manga: {
            immediate: true,
            handler() {
                if (this.manga != null) {
                    this.$refs.titre.value = this.manga.titre;
                    this.$refs.commentaire.value = this.manga.commentaire;
                    this.$refs.imglien.value = this.manga.image;
                    if (this.manga.status == "En cours") {
                        this.$refs.encours.checked = true;
                    } else if (this.manga.status == "Finis") {
                        this.$refs.finis.checked = true;
                    } else {
                        this.$refs.finis.checked = false;
                        this.$refs.encours.checked = false;
                    }

                    this.$refs.lien.length = 0;
                    this.lienCount = this.manga.lien.length;
                    
                    
                }
                
            }
        }
    }
}

</script>

<style scoped lang="css">
.container-modalFav{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    top: 0;
    left: 0;
    overflow: auto;
    
    background-color: rgb(0, 0, 0,0.4);
    display: flex;
    
    justify-content: center;
    align-items: center;
}
.modalFav{
    height: fit-content;
    width: 35%;
    background-color: aliceblue;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
}
.modalFav-contenu{
    display: flex;
    flex-direction: column;
    padding: 10px 20px ;
}
.modalFav-contenu label , legend{
    font-weight: 1000;
    font-size: 22px;
}
.modalFav-contenu div label{
    font-weight: 1000;
    font-size: 22px;
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
.modalFav-contenu input[type="file"]{
    height: 35px;
    
    font-weight: 500;
    font-size: 20px;
    margin-top: 2px;
}
.div-buttonAdd{
    padding: 10px 0;
    display: flex;
}
.div-buttonAdd button{
    
    margin-left: 10px;
    font-family: 'Kodchasan';
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
    display: flex;
    padding-bottom: 3px;
}
.div-buttonAdd .addLien{
    background-color: rgb(0, 255, 34);
    border: solid black 2px;

}
.div-buttonAdd .suppLien{
    background-color: rgb(255, 0, 0);
    border: solid black 2px;
}
.lien{
    margin-bottom: 2px;
    height: 30px;
    width: 100%;
    border: solid black 2px;
    border-radius: 5px;
    font-size: 20px;
    
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
</style>