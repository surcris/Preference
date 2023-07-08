import { defineStore } from 'pinia';



export const useMyStore = defineStore('myStore', {
  state: () => ({
    modeHeaderStore: 1,
    modeModalFav:false,
    modeMenu:false,
    modalShowFav:false,
    modeSend:true,
    btnSearch:false,
    modeTodo:false,
    sousTask:false,
    actionBdd:true,
    etathome:true,
    storeManga:[],
  }),
  actions: {
    updateVariable(newValue) {
      this.modeHeaderStore = newValue;
    },
    etatBtnHome() {
      this.etathome = !this.etathome;
      //console.log(this.modeModalFav)
    },
    etatModalFav() {
      this.modeModalFav = !this.modeModalFav;
      //console.log(this.modeModalFav)
    },
    etatModalShowFav() {
      this.modalShowFav = !this.modalShowFav;
      //console.log(this.modalShowFav)
    },
    etatbtnSearch() {
      this.btnSearch = !this.btnSearch;
      //console.log(this.btnSearch)
    },
    etatmodeTodo() {
      this.modeTodo = !this.modeTodo;
      //console.log(this.modalShowFav)
    },
    etatSousTask() {
      this.sousTask = !this.sousTask;
      //console.log(this.sousTask)
    },
    etatactionBdd() {
      this.actionBdd = !this.actionBdd;
      //console.log(this.actionBdd)
    },
    btnMenu() {
      this.modeMenu = !this.modeMenu;
      // console.log(this.modeMenu)
    },
    btnAccueil(){
			this.modeMenu = false;
      this.etathome = true;

      this.modeModalFav = false;
      this.modalShowFav = false;
      this.modeTodo = false;
      //this.modalShowFav = false;
			
		},
    btnAjoutManga(){
			this.etatModalFav();
			this.modeMenu = false;
			this.etathome = true;
			this.modeTodo = false;
			
		}
  },
});