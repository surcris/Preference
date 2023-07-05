<template>
    
    <div  class="input-search">
        <div class="top-search">
            <input type="text" v-model="valInput" >
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div v-if="valInput != ''" class="result-search">
            <p v-for="resultat in searchResults">{{ resultat.titre }}</p>
        </div>
    </div>

</template>

<script>
import { useMyStore } from '../../stores/store';


export default {
    props:['mangas'],
    data(){
        return{
            myStore:useMyStore(),
            valInput:"",
            filteredResults:"",
        }
    },
    methods:{
        

    },
    mounted(){
        
        
        // this.$refs.mazone.addEventListener("click", (event)=>{
        //     const xInPixels = `${event.x}px`;
        //     const yInPixels = `${event.y}px`;
        //     if (event.y > 70) {
        //         this.myStore.etatbtnSearch()
        //     }
        //     //console.log(xInPixels,yInPixels)
            
        // });
    },
    computed: {
        searchResults() {
            // Effectuer la logique de recherche et retourner les résultats pertinents
            if (this.mangas && this.valInput != "") {
                const MAX_RESULTS = 5;
                const myArray = Object.values(this.mangas);
                //console.log(myArray)
                this.filteredResults = myArray
                    .filter(manga => manga.titre.toLowerCase().includes(this.valInput))
                    .slice(0, MAX_RESULTS)

                // console.log(this.filteredResults)
                return this.filteredResults;
            }
            
            
        }
    },
    watch:{
        valInput:{
            immediate: true,
            handler() {
                //console.log(this.valInput)
            }
        },
        filteredResults:{
            immediate: true,
            handler() {
                //console.log("send")
                this.$emit("getFiltre",this.filteredResults)
            }
        }
    }
}

</script>

<style scoped lang="css">


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
	font-size: 25px;
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
    padding-bottom: 5px;
}
.result-search p{
    padding: 5px 0;
    width: 100%;
    padding-left: 5px;
}
.result-search p:hover{
    border-radius: 5px;
    background-color: rgb(163, 163, 163);
    font-weight: 600;
}
</style>