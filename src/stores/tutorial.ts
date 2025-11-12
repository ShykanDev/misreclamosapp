import { defineStore } from "pinia"

export const useTutorialStore = defineStore ('tutorial', {
    state: () => ({
        pageActive: '',
        tutorialCompleted: false,

    }),
    actions: {
        setPageActive(page: string) {
            this.pageActive = page
        },
        setTutorialCompleted(completed: boolean) {
            this.tutorialCompleted = completed
        }
    },
    getters:{
        getPageActive: (state) => state.pageActive,
        getTutorialCompleted: (state) => state.tutorialCompleted
    },
    persist:true
})
        