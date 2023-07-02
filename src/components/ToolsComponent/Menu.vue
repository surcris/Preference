<template>
    
        <div @click="myStore.etatmodeTodo()" class="btn-todo">
			<i class="fa-solid fa-clipboard-list"></i>
		</div>
        <div @click="myStore.etatactionBdd()" class="btn-calc">
			<i class="fa-solid fa-calculator"></i>
		</div>
    
</template>

<script>
import { useMyStore } from '../../stores/store';
export default{
    data(){
        return{
            myStore:useMyStore(),
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

</style>