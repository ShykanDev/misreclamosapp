<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="relative">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab1" />
        </ion-buttons>

        <ion-title class="absolute left-1/2 w-full text-center -translate-x-1/2 -translate-y-1/2">
          Home
        </ion-title>
      </ion-toolbar>


    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, iosTransitionAnimation, useIonRouter } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';


const router = useIonRouter();

</script>
