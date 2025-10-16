<template>
   <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Restablecer contraseña</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Restablecer contraseña</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-item>
                    <ion-label position="floating">Correo electrónico</ion-label>
                    <ion-input type="email" v-model="email"></ion-input>
                </ion-item>
                <ion-button expand="block" @click="resetPassword()">Restablecer contraseña</ion-button>
            </ion-card-content>
        </ion-card>
    </ion-content>
   </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<style scoped>

</style>