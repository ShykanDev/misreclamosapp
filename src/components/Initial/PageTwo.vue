<template>
    <ion-content class="flex flex-col justify-evenly items-center p-6 rounded-2xl shadow-lg ion-padding">
      <!-- Image -->
      <div class="flex justify-center items-center mb-8">
        <img
          src="../../assets/redMad200.png"
          alt="Persona escribiendo un comentario con megáfono"
          class="object-contain w-full sm:w-4xl md:w-2xl lg:w-2xl"
        >
      </div>
  
      <!-- Title -->
      <h2 class="mb-4 !text-3xl font-medium text-center text-rose-900">
        Regístrese, comente y alerte a otros
      </h2>
  
      <!-- Text -->
      <div class="flex flex-col items-center">
        <p class="max-w-xs text-lg text-center text-gray-600">
          ¿Tuvo una mala experiencia? Regístrese, escriba su reclamo y ayude a otros a evitar el mismo problema. También puede valorar empresas y servicios positivos.
        </p>
      </div>
  
      </ion-content>
  </template>
  
  <script lang="ts" setup>
  import { IonContent } from '@ionic/vue';
  </script>
  
  <style scoped>
  </style>
  