import {db} from '../../firebase';

const databaseRef = db.ref(db.getDatabase());
//const mangaRef = databaseRef.child('Manga');

export default class MangaController{
    
    async addManga(objetMange) {
        try {
           
            await db.set(db.ref(db.getDatabase(), '/Manga/' + objetMange.titre), {
                titre: objetMange.titre,
                status: objetMange.status,
                commentaire: objetMange.commentaire,
                image: objetMange.image,
                lien: objetMange.lien

            });

            console.log('Manga ajouté avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du manga', error);
        }
    
    }
    

    async updateManga(objetMange){
        try {
            
            await db.update(db.ref(db.getDatabase(), '/Manga/' + objetMange.titre), {
                titre: objetMange.titre,
                status: objetMange.status,
                commentaire: objetMange.commentaire,
                image: objetMange.image,
                lien: objetMange.lien

            });

            console.log('Manga update avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'update du manga', error);
        }
    }
    getAllManga() {
        const dbRef = db.ref(db.getDatabase());
        return db.get(db.child(dbRef, `Manga/`))
            
    }
    getOneManga(titre) {
       // const dbRef = db.ref(db.getDatabase());
        return db.get(db.child(databaseRef, `Manga/`+titre))
            
    }
    getAllMangaUpdate() {
        const dbRef = db.ref(db.getDatabase());
        return db.onValue(db.child(dbRef, `Manga/`))
            
    }
    suppManga(titre){
        const dbRef = db.ref(db.getDatabase());
        return db.remove(db.child(dbRef, `Manga/`+titre))
    }
    suppTodo(titre){
        const dbRef = db.ref(db.getDatabase());
        return db.remove(db.child(dbRef, `Todo/`+titre))
    }
    getDB(){
        const dbRef = db.ref(db.getDatabase());
        return db;
    }
    getRefManga(){
        return db.ref(db.getDatabase(),`Manga/`)
    }

    //!==============================================
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

    suppTask(titre){
        const dbRef = db.ref(db.getDatabase());
        return db.remove(db.child(dbRef, `ToDo/`+titre))
    }
    getAllTask() {
        const dbRef = db.ref(db.getDatabase());
        return db.get(db.child(dbRef, `ToDo/`))
            
    }
    getRefTask(){
        return db.ref(db.getDatabase(),`ToDo/`)
    }
}