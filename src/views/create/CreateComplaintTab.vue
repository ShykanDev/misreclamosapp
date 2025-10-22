<template>
    <ion-page>
        <ion-header>    
            <ion-toolbar>
                <ion-title>Crear Reclamo</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Crear Reclamo</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label position="floating">Nombre</ion-label>
                        <ion-input></ion-input>
                        <ion-button router-link="/home">Go to Home</ion-button>
                    </ion-item>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
</script>

<style scoped>

</style>