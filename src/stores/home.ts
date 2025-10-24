import { defineStore } from "pinia";

export const useHomeStore = defineStore('home', {
    state: () => ({
        categorySelected:''
    }),
    actions: {
        setCategorySelected(category: string) {
            this.categorySelected = category
        }
    },
    getters:{
        getCategorySelected: (state) => state.categorySelected,
    }        
});