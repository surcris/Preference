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
                <p v-bind:ref="'btn-add'" @click="myStore.sousTask ? addSousTask() : addTask()">Add</p>
            </div>
            <div class="container-list-task">
                <div v-for="(task,index) in listTask" class="container-task">
                    <div class="container-task-top">
                        <div @click=""  class="container-task-left">
                            <div class="task-icon"  @click="modifEtatTask(index)" >
                                <i :style="task.complete ? styleIncompletTask : styleCompletTask"  class="fa-solid fa-check"></i>
                            </div>
                            <div class="task-Para-icon">
                                <p @click="sousTaskAndEtat(index)"  :style="task.complete ? { textDecoration: 'line-through' } : { textDecoration: 'none' }" >{{ task.task }}</p>
                                <i :ref="'btnSoustask'+index" @click="aff(index)" v-if="task.sousTask" class="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <div @click="suppTask(index)" class="container-task-right"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                    <div v-if="!hiddenTasks.includes(index)" :class="'container-soustask-'+index">
                        <div v-for="(st,indexST) in task.sousTask" class="souscontainer">
                            <div class="soustask-icon"  @click="modifEtatSousTask(index,indexST)" >
                                <i :style="st.complete ? styleIncompletTask : styleCompletTask" class="fa-solid fa-check"></i>
                            </div>
                            <p>{{ indexST+1 }} - {{ st.titre }}  </p>
                            <div @click="suppSousTask(index,indexST)" class="soustask-right"><i class="fa-solid fa-xmark"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TodoController from '../../class/todoController';
import { useMyStore } from '../../stores/store';
import UserController from '../../class/userController';
export default{
    data(){
        return{
            myStore:useMyStore(),
            todo: new TodoController(),
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
            styleNone:{
                display:'none'
            },
            styleFlex:{
                display:'flex'
            },
            listTask:[],
            //todoReqC: new TodoController(),
            unsubscribe:null,
            tempo_index:null,
            hiddenTasks: [],
        }
    },
    methods:{
        aff(index) {
            if (!this.hiddenTasks.includes(index)) {
                this.hiddenTasks.push(index);
            } else {
                const taskIndex = this.hiddenTasks.indexOf(index);
                if (taskIndex > -1) {
                    this.hiddenTasks.splice(taskIndex, 1);
                }
            }
        },
        addTask(){
            if (this.$refs.taskInput.value != "") {
                
                const newTask = {
                    task: this.$refs.taskInput.value,
                    complete: false
                };
                
                if (this.myStore.actionBdd) {
                    this.todo.addTask(newTask);
                    
                }
                
                this.$refs.taskInput.value = "";
                
            }
            
        },
        sousTaskAndEtat(index){
            this.myStore.etatSousTask();
            this.getSTIndex(index);

        },
        getSTIndex(index){
            if (this.myStore.sousTask) {
                this.tempo_index = index;
                //console.log(this.tempo_index);
                this.$refs['btn-add'].innerText = "Add-ST";
            }else{
                this.tempo_index = null;
                this.$refs['btn-add'].innerText = "Add";
            }
            
        },
        addSousTask(){
            console.log("sousTask")
            let tabSoustask = [];
            if (this.tempo_index != null) {
                //this.listTask[this.tempo_index].add(this.tempo_index)
                tabSoustask.push({titre:this.$refs.taskInput.value,complete:false})
                if (this.listTask[this.tempo_index].sousTask) {
                    this.listTask[this.tempo_index].sousTask.push({titre:this.$refs.taskInput.value,complete:false});
                    
                }else{
                    this.listTask[this.tempo_index].sousTask = tabSoustask;
                }
                
                this.todo.updateTask(this.listTask[this.tempo_index])
                
                this.sousTaskAndEtat(this.tempo_index)
                
            }
            this.$refs.taskInput.value = "";
            
        },
        suppSousTask(index,indexST){
            
            
            if (index != null) {
                //console.log(this.listTask[index].sousTask[indexST])
                this.listTask[index].sousTask.splice(indexST, 1);
                this.suppSousTaskBdd(this.listTask[index].task,indexST)
                
            }
            if (this.myStore.sousTask == true) {
                this.myStore.etatSousTask();
            }
            
        },
        suppTask(index){
            
            this.suppTaskBdd(this.listTask[index].task)
            
        },
        async suppTaskBdd(titre) {
            //this.mangaC.suppManga(titre);
			//const dbRef = db.ref(db.getDatabase());
            
			try {
                if (navigator.onLine == true && this.myStore.actionBdd) {
                    await this.todo.suppTask(titre)
					.then(() => {
							
							console.log("Task supprimer et mis a jour de l'affichage");
						})
                }
			} catch (error) {
				console.error(error);
			}
		},
        async suppSousTaskBdd(task,soustask) {
            //this.mangaC.suppManga(titre);
			//const dbRef = db.ref(db.getDatabase());
            
			try {
                if (navigator.onLine == true && this.myStore.actionBdd) {
                    await this.todo.suppSousTask(task,soustask)
					.then(() => {
                            console.log('Sous-élément supprimé avec succès');
                        })
                        .catch((error) => {
                            console.error('Erreur lors de la suppression du sous-élément:', error);
                        });
                }
			} catch (error) {
				console.error(error);
                
			}
		},
        async getAllTask() {
            //const dbRef = db.ref(db.getDatabase(),`Manga/`);
            
            
            try {
                const user = this.userC.getAuthUser().currentUser;
                if (navigator.onLine == true && user) {
                   
                    await this.todo.getDB().onValue(this.todo.getRefTask(), (snapshot) => {
                        //await this.todoReqC.getDB().onValue(this.todoReqC.getDBrefTodo(), (snapshot) => {
                        //console.log("getTask")
                        const data = snapshot.val();
                        if (data == null) {
                            console.log("Il n'y a pas de task en bdd")
                        } else {
                            this.listTask = [];
                            for (let key in data) {
                                this.listTask.push(data[key])
                            }
                            
                        }


                    });
                }

            } catch (error) {
                console.error(error);
            }
        },
        showSousTask(){

        },
        modifEtatTask(index){
            //objTask.complete = !objTask.complete;
            this.listTask[index].complete = !this.listTask[index].complete
            console.log(this.listTask[index])
            this.todo.updateTask(this.listTask[index])
        },
        modifEtatSousTask(index,indexST){
            //objTask.complete = !objTask.complete;
            this.listTask[index].sousTask[indexST].complete = !this.listTask[index].sousTask[indexST].complete
            console.log(this.listTask[index].sousTask[indexST].complete)
            this.todo.updateTask(this.listTask[index])
        }
    },
    mounted(){
        
		if (navigator.onLine) {
            this.getAllTask();
        }
		
    },
    watch:{
        "myStore.actionBdd": {
            immediate: true,
            handler() {
				if(this.myStore.actionBdd == true){
					this.getAllTask();
                    //console.log('mytr')
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
                
                //this.getAllTask();
            }
            
        } 
        
       
    }
}
</script>

<style scoped>
.hidden {
  display: none;
}
.showFlex {
  display: flex;
}
.showBlock {
  display: block;
}
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
    height: 60vh;
    width: 50vh;
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
    flex-direction: column;

}
.container-task-top{
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
.container-task-left .task-icon i{
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

.task-Para-icon{
    display: flex;
    align-items: center;
    width: 100%;
}

[class*="container-soustask"] {
    width: 100%;
    
}
[class*="container-soustask"] .souscontainer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 99%;
    background-color: rgb(232, 232, 232);
    border-radius: 2px;
}
.souscontainer{
    margin: 2px 0;
    padding: 2px 0;
}
.souscontainer p{
    width: 70%;
    padding-left: 5px;
    
}
.souscontainer .soustask-right{
    margin-right: 8px;
    color: rgb(184, 1, 1);
}
.soustask-icon i{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height:25px;
    font-size: 15px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid red;
    
}

@media (max-width: 1550px ) {
    .container-todo{
        position: fixed;
        height: 60vh;
        width: 50vh;
        top: 100px;
        left: 40px;
        z-index: 2;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        padding: 0 10px;
        overflow: hidden;
    }
}

@media (max-width: 450px) {
    .page-todo{
        position: fixed;
        height: 60vh;
        width: 100vw;
        top: 55px;
        left: 0;
        
        overflow: auto;
        
       
        display: flex;
        
        justify-content: center;
        align-items: center;
    }
    .container-todo{
        position: fixed;
        height: 60vh;
        width: 100vw;
        top: 55px;
        left: 0;
        z-index: 2;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        padding: 0 10px;
        overflow: hidden;
    }
}
</style>