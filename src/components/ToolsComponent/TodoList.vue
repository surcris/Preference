<template>
    <div class="page-todo">
        <div class="container-todo">
            <div class="container-top-todo">
                <h1>To-Do List</h1>
                <i class="fa-solid fa-list-check"></i>
            </div>
            <div  class="barre-Add-todo">
                <input ref="taskInput" type="text" >
                <p @click="addTask()">Add</p>
            </div>
            <div class="container-list-task">
                <div v-for="(task,index) in listTask"  class="container-task">
                    <div class="container-task-left">
                        <div @click="task.complete = !task.complete" :style="task.complete ? styleIncompletTask : styleCompletTask"><i  class="fa-solid fa-check"></i></div>
                        <p :style="task.complete ? { textDecoration: 'line-through' } : { textDecoration: 'none' }">{{ task.task }}</p>
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
export default{
    data(){
        return{
            mangaC: new MangaController(),
            styleCompletTask: {
                    color: 'red',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    border:'1px solid red',
                },
            styleIncompletTask: {
                color: 'white',
                backgroundColor: 'red',
                border:'none',
            },
            listTask:[],
            todoReqC: new TodoController(),
            unsubscribe:null,
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
                this.mangaC.addTask(newTask)
                this.$refs.taskInput.value = "";
                
            }
            
        },
        suppTask(index){
            console.log(this.listTask[index].task)
            this.todoReqC.suppTask(this.listTask[index].task)
            //this.listTask.splice(index, 1)
            
        },
        async suppTask(titre) {
            //this.mangaC.suppManga(titre);
			//const dbRef = db.ref(db.getDatabase());
			try {
				await this.mangaC.suppTask(titre)
					.then(() => {
							
							console.log("Task supprimer et mis a jour de l'affichage");
						})
			} catch (error) {
				console.error(error);
			}
		},
        async getAllTask() {
            //const dbRef = db.ref(db.getDatabase(),`Manga/`);
            try {
                this.unsubscribe = this.mangaC.getDB().onValue(this.mangaC.getRefTask(), (snapshot) => {
                    //await this.todoReqC.getDB().onValue(this.todoReqC.getDBrefTodo(), (snapshot) => {
                    const data = snapshot.val();
                    if (data == null) {
                        console.log("Il n'y a pas de task")
                    }else{
                        this.listTask = data;
                        //console.log(this.listTask);
                    }
                    
                    
                });


            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted(){
		this.getAllTask();
		
    },
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
    height: 600px;
    width: 400px;
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
    height: 10%;
}
.container-top-todo i{
    font-size: 25px;
    margin-left: 10px;
    color: rgb(255, 0, 0);
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
    font-size: 25px;
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
    font-size: 25px;
    font-weight: 700;
    color: aliceblue;
    box-sizing: border-box;
}
.container-task{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px;
    font-size: 20px;
}
.container-task-left{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.container-task-left p{
    margin-left: 20px;
}
.container-task-left div{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: rgb(253, 0, 0);
    font-size: 18px;
    color: aliceblue;
}
</style>