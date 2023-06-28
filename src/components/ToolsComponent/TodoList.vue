<template>
    <div class="page-todo">
        <div class="container-todo">
            <div class="container-top-todo">
                <div class="container-titre">
                    <h1>To-Do List</h1>
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <div @click="myStore.etatmodeTodo()" class="container-close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div  class="barre-Add-todo">
                <input @keypress.enter="myStore.sousTask ? addSousTask() : addTask()"  ref="taskInput" type="text" >
                <p @click="myStore.sousTask ? addSousTask() : addTask()">Add</p>
            </div>
            <div class="container-list-task">
                <div v-for="(task,index) in listTask"  class="container-task">
                    <div @click=""  class="container-task-left">
                        <div class="task-icon"  @click="modifEtatTask(index)" >
                            <i :style="task.complete ? styleIncompletTask : styleCompletTask"  class="fa-solid fa-check"></i>
                        </div>
                        <p @click="sousTaskAndEtat(index)"  :style="task.complete ? { textDecoration: 'line-through' } : { textDecoration: 'none' }" >{{ task.task }}</p>
                    </div>
                    <div @click="suppTask(index)" class="container-task-right"><i class="fa-solid fa-xmark"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TodoController from '../../class/todoController'
import MangaController from '../../class/mangaController';
import { useMyStore } from '../../stores/store';
import UserController from '../../class/userController';
export default{
    data(){
        return{
            myStore:useMyStore(),
            mangaC: new MangaController(),
            userC: new UserController(),
            styleCompletTask: {
                    color: 'white',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    
                },
            styleIncompletTask: {
                color: 'white',
                boxSizing: 'border-box',
                backgroundColor: 'red',
                
            },
            listTask:[],
            //todoReqC: new TodoController(),
            unsubscribe:null,
            tempo_index:null,
        }
    },
    methods:{
        addTask(){
            if (this.$refs.taskInput.value != "") {
                
                const newTask = {
                    task: this.$refs.taskInput.value,
                    complete: false
                };
                //console.log(this.listTask)
                //this.listTask.push(newTask);
                if (this.myStore.actionBdd) {
                    this.mangaC.addTask(newTask);
                }
                
                this.$refs.taskInput.value = "";
                
            }
            
        },
        sousTaskAndEtat(index){
            this.myStore.etatSousTask();
            this.getIndex(index);
        },
        getIndex(index){
            if (this.myStore.sousTask) {
                this.tempo_index = index;
                console.log(this.tempo_index)
            }else{
                this.tempo_index = null;
            }
            
        },
        addSousTask(){
            console.log("sousTask")
            if (this.tempo_index != null) {
                //this.listTask[this.tempo_index].add(this.tempo_index)
                this.listTask[this.tempo_index].sousTask = this.$refs.taskInput.value;
                this.mangaC.updateTask(this.listTask[this.tempo_index])
                console.log(this.listTask[this.tempo_index])
            }
            this.myStore.etatSousTask();
        },
        suppTask(index){
            //console.log(this.listTask[index].task)
            this.suppTaskBdd(this.listTask[index].task)
            if (this.myStore.actionBdd == false) {
                this.listTask.splice(index, 1)
            }
        },
        async suppTaskBdd(titre) {
            //this.mangaC.suppManga(titre);
			//const dbRef = db.ref(db.getDatabase());
            
			try {
                if (navigator.onLine == true && this.myStore.actionBdd) {
                    await this.mangaC.suppTask(titre)
					.then(() => {
							
							console.log("Task supprimer et mis a jour de l'affichage");
						})
                }
			} catch (error) {
				console.error(error);
			}
		},
        async getAllTask() {
            //const dbRef = db.ref(db.getDatabase(),`Manga/`);
            try {
                if (navigator.onLine == true && this.myStore.actionBdd) {
                    const user = this.userC.getAuthUser().currentUser;
                    await this.mangaC.getDB().onValue(this.mangaC.getRefTask(), (snapshot) => {
                        //await this.todoReqC.getDB().onValue(this.todoReqC.getDBrefTodo(), (snapshot) => {

                        const data = snapshot.val();
                        if (data == null) {
                            console.log("Il n'y a pas de task")
                        } else {

                            this.listTask = data;
                            //console.log(data);
                        }


                    });
                }

            } catch (error) {
                console.error(error);
            }
        },
        modifEtatTask(index){
            //objTask.complete = !objTask.complete;
            this.listTask[index].complete = !this.listTask[index].complete
            console.log(this.listTask[index])
            this.mangaC.updateTask(this.listTask[index])
        }
    },
    mounted(){
        
		
		
    },
    watch:{
        "myStore.actionBdd": {
            immediate: true,
            handler() {
				if(this.myStore.modeModalFav == true){
					this.getAllTask();
                    console.log('couco')
				}
                
                
            }
        },
		
    },
    created(){
        
        if (navigator.onLine) {
            if (sessionStorage.getItem("akey") == null && this.userC.getAuthUser().currentUser == null) {
                this.$router.push("authentification");
                console.log('redirect');
            }else{
                
                this.getAllTask();
            }
            
        } 
        
       
    }
}
</script>

<style scoped>
.page-todo{
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
.container-todo{
    position: fixed;
    height: 50vh;
    width: 30vh;
    top: 100px;
    left: 40px;
    z-index: 2;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 0 10px;
    overflow: hidden;
}
.container-top-todo{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 10px;
    height: fit-content;
}
.container-titre{
    display: flex;
    flex-direction: row;
    align-items: center;
    
}
.container-titre h1{
    margin: 0;
    font-size: 25px;
    font-size-adjust: 0.5;
}
.container-titre i{
    font-size: 20px;
    margin-left: 10px;
    color: rgb(255, 0, 0);
}
.container-close {
   position: absolute;
   top: 0;
   right: 5px;
}
.container-close i{
    font-size: 25px;
    margin-left: 10px;
    color: rgb(107, 1, 1);
}
.container-list-task{
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
}
.barre-Add-todo{
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 10%;
    background-color: rgb(219, 219, 219);
    border-radius: 50px;
}
.barre-Add-todo input{
    width: 70%;
    height: 40px;
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 20px;
    color: rgb(114, 114, 114);
}
.barre-Add-todo p{
    margin: 0;
    width: 25%;
    height: 100%;
    border-radius: 55px;
    background-color: rgb(255, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    color: aliceblue;
    box-sizing: border-box;
}
.container-task{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    height: 50px;
    margin: 0 10px;
    font-size: 18px;
    margin-top: 5px;

}
.container-task-left{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
.container-task-left p{
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
    width: 85%;
}
.container-task-left .task-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    height:100%;
    
    
}
.container-task-left div i{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height:30px;
    font-size: 15px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid red;
}

</style>