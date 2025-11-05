import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        userId: '',
    }),
    actions: {
        setName(name: string) {
            this.name = name;
        },
        setUserId(userId:string){
            this.userId = userId
        },
        resetUser(){
            this.name = '';
            this.userId = '';
        }
    },
    getters:{
        getName(state){
                return state.name
        },
        getUserID(state){
            return state.userId
        }
    },
});
