<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button style="" tab="tab1" href="/tabs/login">
          <ion-icon aria-hidden="true" :icon="logInOutline" />
          <ion-label class="font-poppins">Ingresar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="register" href="/tabs/register">
          <ion-icon aria-hidden="true" :icon="personAddOutline" />
          <ion-label class="font-poppins">Registrarse</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label class="font-poppins">Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="create" href="/tabs/create">
          <ion-icon aria-hidden="true" :icon="addCircleOutline" />
          <ion-label class="font-poppins">Crear</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label class="font-poppins">Mi cuenta</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
      
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { addCircleOutline, addCircleSharp, homeOutline, logInOutline, personAddOutline, personCircleOutline} from 'ionicons/icons';
</script>

<style scoped>
ion-tab-bar {
  --background: #f0f0f0; /* Background color of the tab bar */
  --border-top: none; /* Remove top border */
  --height: 60px; /* Height of the tab bar */
}

ion-tab-button {
  --background-focused: #e0e0e0; /* Background when button is focused */
  --color: #888; /* Default text/icon color */
  --color-selected: var(--ion-color-danger); /* Color when selected */
  --padding-end: 10px; /* Padding on the right */
  --padding-start: 10px; /* Padding on the left */
}
</style>