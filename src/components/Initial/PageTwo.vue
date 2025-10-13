<template>
    <ion-content class="flex flex-col items-center ion-padding justify-evenly h-[100vh] p-6 bg-white rounded-2xl shadow-lg">
      <!-- Image -->
      <div class="flex justify-center items-center mb-8">
        <img
          src="../../assets/reclamo.jpg"
          alt="Persona escribiendo un comentario con megáfono"
          class="object-contain w-full sm:w-4xl md:w-2xl lg:w-2xl"
        >
      </div>
  
      <!-- Title -->
      <h2 class="mb-4 !text-3xl font-medium text-center text-blue-900">
        Regístrese, comente y alerte a otros
      </h2>
  
      <!-- Text -->
      <div class="flex flex-col items-center">
        <p class="max-w-xs text-lg text-center text-gray-600">
          ¿Tuvo una mala experiencia? Regístrese, escriba su reclamo y ayude a otros a evitar el mismo problema. También puede valorar empresas y servicios positivos.
        </p>
      </div>
  
      <!-- Dots -->
      <article class="flex justify-center mt-5">
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-9 h-2 bg-blue-800 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </article>
    </ion-content>
  </template>
  
  <script lang="ts" setup>
  import { IonContent } from '@ionic/vue';
  </script>
  
  <style scoped>
  </style>
  