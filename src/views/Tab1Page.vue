<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="relative">
        <ion-toolbar class="flex justify-between items-center px-4">
          <ion-buttons slot="start">
            <ion-back-button color="primary" defaultHref="/tabs/tab2"></ion-back-button>
          </ion-buttons>
          <ion-title
            class="absolute left-1/2 w-full text-center text-blue-800 -translate-x-1/2 -translate-y-1/2">Iniciar
            sesión</ion-title>
        </ion-toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="flex flex-col gap-4">
        <h3 class="text-center">Bienvenido de nuevo</h3>
        <!-- Input Fields -->
        <article class="flex flex-col gap-4 p-2">
          <!--<input class="p-2 !py-3 rounded-lg border border-gray-50 outline-none bg-gray-200/50" type="text" placeholder="Correo electrónico"> -->
          <ion-input aria-label="Custom input" label="Correo electrónico" labelPlacement="floating" fill="outline" placeholder="Custom input" class="custom" 
            :counter="true" :maxlength="20"></ion-input>
          <ion-input aria-label="Custom input" label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Custom input" class="custom" 
            :counter="true" :maxlength="20"></ion-input>
        </article>
        <!-- Button -->
        <button class="w-11/12 !mx-auto text-white bg-blue-900 !p-3.5 font-semibold !rounded-lg">Iniciar sesión</button>
        <p class="text-center">¿No tiene cuenta? <ion-button fill="clear"  color="primary">Registrarse</ion-button></p>

        <div class="flex justify-between">
          <p class="!text-sm text-left underline ml-2 text-gray-500">¿Olvidó su contraseña?</p>
        </div>

      </div>  
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonInput } from '@ionic/vue';

</script>

<style>
ion-input.custom {
  --color: #525252;
  --placeholder-color: #5c5c5c;
  --placeholder-opacity: 0.8;
  --border-radius: 30px !important;
  --border-width: 1px;
  --border-style: solid;
  --border-color: #ddd;
  --box-shadow: none;
  --outline-offset: 0;
  --outline-width: 0;
  --outline-style: none;
  --outline-color: transparent;
}
</style>
