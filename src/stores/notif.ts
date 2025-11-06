import { defineStore } from "pinia";

export const useNotif = defineStore("notif", {
  state: () => ({
    show: false,
    title: "Success",
    subtitle: "Your changes were saved successfully",
    type: "success",
    timeout: 4000,
    timer: null as number | null, // 👈 aquí guardamos el ID del timeout
  }),

  actions: {
    setShow(value: boolean) {
      // si hay un timeout activo, lo limpiamos
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.show = value;

      if (value) {
        // creamos un nuevo timeout
        this.timer = window.setTimeout(() => {
          this.show = false;
          this.timer = null;
        }, this.timeout);
      }
    },

    setTitle(title: string) {
      this.title = title;
    },
    setSubtitle(subtitle: string) {
      this.subtitle = subtitle;
    },
    setType(type: string) {
      this.type = type;
    },
    setTimeOut(ms: number) {
      this.timeout = ms;
    },
    success(titleVal:string, subtitleVal:string){
        this.type = 'success' 
        this.setShow(true)
        this.title = titleVal;
        this.subtitle = subtitleVal;
    },
    error(titleVal:string, subtitleVal:string){
        this.type = 'error' 
        this.setShow(true)
        this.title = titleVal;
        this.subtitle = subtitleVal;
    },
    warning(titleVal:string, subtitleVal:string){
        this.type = 'warning' 
           this.setShow(true)
        this.title = titleVal;
        this.subtitle = subtitleVal;
    },
    info(titleVal:string, subtitleVal:string){
        this.type = 'info' 
           this.setShow(true)
        this.title = titleVal;
        this.subtitle = subtitleVal;
    }
  },

  getters: {
    getShow: (s) => s.show,
    getTitle: (s) => s.title,
    getSubtitle: (s) => s.subtitle,
    getType: (s) => s.type,
    getTimeOut: (s) => s.timeout,
    getTimer: (s) => s.timer,
  },
});
