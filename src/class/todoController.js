import {db} from '../../firebase';

export default class TodoController{
    database = db.getDatabase();

    getDBref(name){
        return db.ref(this.database)
    }
    getDBrefName(name){
        return db.ref(this.database, 'ToDo/' + name)
    }
    getDBrefTodo(){
        return db.ref(this.database, '/ToDo/')
    }
    async addTask(objetMange){
        try {
           
            await db.set(db.ref(db.getDatabase(), '/ToDo/' + objetMange.task), {
                task: objetMange.task,
                complete: objetMange.complete,
                // dateCreation: objetMange.dateCreation,
                // dateComplete: objetMange.dateComplete,
                

            });

            console.log('Task ajouté avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la task', error);
        }
    }
    async suppTask(titre){
        try {
            const dbRef = db.ref(db.getDatabase());
            //const taskRef = db.ref(`ToDo/${titre}`);
            await db.remove(db.child(dbRef, `ToDo/${titre}`))
            //await taskRef.remove();
            console.log('Tâche supprimée :', titre);
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    }
    // async suppTask(name){
    //     try {
    //         const taskRef = db.ref(db.getDatabase(),'ToDo/' + name);
    //         //const tasksRef = ref(db, "tasks");
    //         await db.remove(taskRef);
    //         console.log('Tâche supprimée :', name);
    //     } catch (error) {
    //         console.error('Erreur lors de la suppression de la tâche :', error);
    //     }
    // }
    // async getAllTask() {
    //     try {
    //         const test = db.onValue(this.getDBrefTodo(), (snapshot) => {
    //             const data = snapshot.val();
    //             return data;
    //         });
    //     } catch (error) {
    //         console.error('Erreur :', error);
    //     }
            
    // }
    getDB(){
        return db;
    }

}