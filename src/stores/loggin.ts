import { defineStore } from 'pinia'

export const useLogginStore = defineStore('loggin', {
  state: () => ({
    isUserEmailVerified: false,
    isUserLoggedIn: false,
  }),
  actions: {
    setUserEmailVerified(value: boolean) {
      this.isUserEmailVerified = value
    },
    setUserLoggedIn(value: boolean) {
      this.isUserLoggedIn = value
    },
  },
  getters: {
    getIsUserEmailVerified: (state) => state.isUserEmailVerified,
    getIsUserLoggedIn: (state) => state.isUserLoggedIn,
  },
  persist: true,
})
