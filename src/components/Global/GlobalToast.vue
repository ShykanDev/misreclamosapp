<template>
   <ion-toast 
   :is-open="notifStore.getShow"
    :animated="true" 
    :message="notifStore.getSubtitle ?? 'Error al mostrar notificación'"
    :color="notifStore.getType === 'success' ? 'light' : notifStore.getType === 'error' ? 'danger' : notifStore.getType === 'warning' ? 'warning' : 'info'"
    duration="5000"
    position="top"
    :icon="notifStore.getType === 'success' ? checkmarkCircleOutline : notifStore.getType === 'error' ? closeCircleOutline : notifStore.getType === 'warning' ? alertCircleOutline : informationCircleOutline"
    @didDismiss="notifStore.setShow(false)"
    swipe-gesture="vertical"
    :buttons="toastButtons"
   ></ion-toast>
</template>

<script lang="ts" setup>
import { useNotif } from '@/stores/notif';
import { IonToast } from '@ionic/vue';
import { alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, informationCircleOutline } from 'ionicons/icons';
const notifStore = useNotif();

const toastButtons = [
  {
    text: 'Cerrar',
    role: 'cancel',
   
  }
]

</script>

<style scoped>

</style>