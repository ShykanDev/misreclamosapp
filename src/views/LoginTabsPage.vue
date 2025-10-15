<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="tab1" href="/tabs/login">
          <ion-icon aria-hidden="true" :icon="logInOutline" />
          <ion-label>Ingresar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/register">
          <ion-icon aria-hidden="true" :icon="personAddOutline" />
          <ion-label>Registrarse</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/initial">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, logInOutline, personAddOutline, square, triangle } from 'ionicons/icons';
</script>
