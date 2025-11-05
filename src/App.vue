<template>
  <ion-app >
    <GlobalToast />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, onIonViewDidEnter } from '@ionic/vue';
import 'animate.css';
import GlobalToast from './components/Global/GlobalToast.vue';

onIonViewDidEnter(() => {
  console.log('IonViewDidEnter');
});


</script>