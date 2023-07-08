<template>
	<div class="container-modalAffFav">
		<div class="modalAffFav">
            <div @click="myStore.etatModalShowFav" class="cross">X</div>
            <div class="modalAffFav-contenu">
               <!----> <h3>{{ manga.titre }}</h3>
                <p>{{ manga.status }}</p>
                
                <div v-for="lien in manga.lien">
                    <a :href="lien">{{ lien }}</a>
                </div>
                <p>{{ manga.commentaire }}</p>
                <p v-for="tag in manga.tags">{{tag}}</p>
            </div>
            
        </div>
	</div>
</template>

<script>
import { useMyStore } from '../../stores/store';

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
                clp : null,
                image: null,
            }
        }
    },
    methods:{
        

    },
    mounted(){
        //console.log(this.manga)
       // this.manga;
    }
}

</script>

<style scoped lang="css">
.container-modalAffFav{
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
.modalAffFav{
    height: fit-content;
    width: 35%;
    background-color: aliceblue;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
}
.modalAffFav-contenu{
    display: flex;
    flex-direction: column;
    padding: 10px 20px ;
}
.modalAffFav-contenu label , legend{
    font-weight: 1000;
    font-size: 22px;
}
.modalAffFav-contenu div label{
    font-weight: 500;
    font-size: 20px;
}
.cross{
    display: flex;
    justify-content: end;
    cursor: pointer;
    margin-right: 5px;
    font-weight: bolder;
    font-size: larger;
}

.modalAffFav-contenu input[type="text"]{
    height: 35px;
    border-radius: 5px;
    font-size: 20px;
}
.modalAffFav-contenu input[type="file"]{
    height: 35px;
    
    font-weight: 500;
    font-size: 20px;
    margin-top: 2px;
}
textarea{
    resize: none;
    font-size: 20px;
    border-radius: 3px;
    height: 200px;
}
button{
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
@media (max-width: 450px) {
    .modalAffFav{
        height: fit-content;
        width: 90%;
        background-color: aliceblue;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
    }
}
</style>