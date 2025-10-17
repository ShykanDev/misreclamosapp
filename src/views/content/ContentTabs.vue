<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
            <ion-tab-button style="" tab="home" href="/content/home">
                <ion-icon aria-hidden="true" :icon="home" />
                <ion-label class="font-poppins">Inicio</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="publish" href="/content/publish">
            <v-icon name="oi-diff-added" />
                <ion-label class="font-poppins">Publicar</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="profile" href="/content/profile">
                <ion-icon aria-hidden="true" :icon="personOutline" />
                <ion-label class="font-poppins">Mi cuenta</ion-label>
            </ion-tab-button>

        </ion-tab-bar>
    </ion-tabs>
</template>

<script lang="ts" setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { home, personOutline } from 'ionicons/icons';

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

<style scoped>

</style>