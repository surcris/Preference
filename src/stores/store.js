import { defineStore } from 'pinia';



export const useMyStore = defineStore('myStore', {
  state: () => ({
    modeHeaderStore: 1,
    modeModalFav:false,
    modalShowFav:false,
    modeSend:true,
    btnSearch:false,
    modeTodo:false,
    sousTask:false,
    actionBdd:true,
  }),
  actions: {
    updateVariable(newValue) {
      this.modeHeaderStore = newValue;
    },
    etatModalFav() {
      this.modeModalFav = !this.modeModalFav;
      console.log(this.modeModalFav)
    },
    etatModalShowFav() {
      this.modalShowFav = !this.modalShowFav;
      //console.log(this.modalShowFav)
    },
    etatbtnSearch() {
      this.btnSearch = !this.btnSearch;
      console.log(this.btnSearch)
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
  },
});