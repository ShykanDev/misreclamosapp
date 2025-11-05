import { defineStore } from "pinia"

export const useCreateStore = defineStore('create', {
    state: () => ({
        categorySelected: null as string | null,   
    }),
    actions: {
        setCategorySelected(category: string) {
            this.categorySelected = category
        },
    },
    getters: {
        getCategorySelected: (state) => state.categorySelected,
    },      
})