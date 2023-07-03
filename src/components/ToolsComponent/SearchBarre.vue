<template>
    <div ref="mazone" class="containe-search">
        <div  class="input-search">
            <input type="text" >
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
    
</template>

<script>
import { useMyStore } from '../../stores/store';


export default {
    
    data(){
        return{
            myStore:useMyStore(),
        }
    },
    methods:{
        

    },
    mounted(){
        
        this.$refs.mazone.addEventListener("click", (event)=>{
            const xInPixels = `${event.x}px`;
            const yInPixels = `${event.y}px`;
            if (event.y > 70) {
                this.myStore.etatbtnSearch()
            }
            //console.log(xInPixels,yInPixels)
            
        });
    }
}

</script>

<style scoped lang="css">
.containe-search{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0,0.4);
    
}

.input-search{
	position: fixed;
	top: 35px;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 50px;
	width: 50%;
	border-radius: 30px;
	background-color: azure;
	display: flex;
	justify-content: center;
	align-items: center;
}
.input-search input{
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

.input-search i{
	margin-left: 10px;
	font-size: 25px;
}
</style>