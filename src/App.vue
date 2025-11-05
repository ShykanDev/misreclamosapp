<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useNotif } from './stores/notif';
const notifStore = useNotif();
import 'animate.css';



</script>