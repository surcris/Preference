import { defineStore } from 'pinia';



export const useMyStore = defineStore('myStore', {
  state: () => ({
    modeHeaderStore: 1,
    modeModalFav:false,
    modalShowFav:false,
    modeSend:true,
    btnSearch:false,
    modeTodo:false,
  }),
  actions: {
    updateVariable(newValue) {
      this.modeHeaderStore = newValue;
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
      //console.log(this.modalShowFav)
    },
    etatmodeTodo() {
      this.modeTodo = !this.modeTodo;
      //console.log(this.modalShowFav)
    },
  },
});