import {auth,db} from '../../firebase';

export default class UserController{

    connectUser(email,password) {
        return auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
            // .then((userCredential) => {
            //     // Connexion réussie, récupérer l'utilisateur connecté
            //     const user = userCredential.user;
            //     console.log('Utilisateur connecté ');
            //     const uidCrypt = crypt.encryptData(user.uid);
            //     sessionStorage.setItem("akey", uidCrypt)
            //     this.myStore.updateVariable(2);

            //     this.$router.push('/accueil');

            // })
            // .catch((error) => {
            //     // Erreur lors de la connexion, gérer l'erreur
            //     console.error('Erreur de connexion :', error);
            // });
    }

    maintainUser() {
        //const auth = getAuth();
        try {
            if (sessionStorage.getItem("akey")) {
                auth.onAuthStateChanged(auth.getAuth(), (user) => {
                    if (user) {
                        // L'utilisateur est connecté
                        //console.log('Utilisateur connecté :', user.uid);
                        console.log('Utilisateur connecté');
                        // Vous pouvez effectuer des actions supplémentaires ici, comme mettre à jour l'état de votre application
                        return true;
                    } else {
                        // L'utilisateur n'est pas connecté
                        console.log('Utilisateur déconnecté');
                        // Vous pouvez effectuer des actions supplémentaires ici, comme réinitialiser l'état de votre application
                        return false;
                    }
                });
            }else{
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    getAuthUser(){
        return auth.getAuth();
    }
    getDB(){
        return db;
    }
}