<template>
    <ion-content class="flex flex-col items-center ion-padding justify-evenly h-[100vh] p-6 bg-white rounded-2xl shadow-lg md:ionpb">
      <!-- Image -->
      <div class="flex justify-center items-center mb-8">
        <img
          src="../../assets/improvements.jpg"
          alt="Comunidad de personas conectadas compartiendo experiencias"
          class="object-contain w-full sm:w-4xl md:w-2xl lg:w-2xl"
        >
      </div>
  
      <!-- Title -->
      <h2 class="mb-4 !text-3xl font-medium text-center text-blue-900">
        Sea parte del cambio
      </h2>
  
      <!-- Text -->
      <div class="flex flex-col items-center">
        <p class="max-w-xs text-lg text-center text-gray-600">
          Su voz importa. Al compartir su experiencia, ayuda a mejorar el servicio de las empresas y protege a otros consumidores. ¡Únase a nuestra comunidad ya!
        </p>
      </div>
  

      <article class="flex flex-col gap-2">

        <div class="flex">

      <!-- Button Login (CTA) -->
      <ion-button router-link="/tabs/tab1" class="w-11/12 !mx-auto text-white !p-3.5 font-semibold !rounded-lg" shape="round" fill="solid">Iniciar sesión</ion-button>
      <ion-button router-link="/tabs/tab1" class="w-11/12 !mx-auto text-blue-900 !p-3.5 font-semibold !rounded-lg" shape="round" fill="outline">Registrarse</ion-button>
        </div>


      <!-- Button Skip (CTA) -->
      <ion-button router-link="/tabs/tab1" class="w-11/12 !mx-auto !p-3.5 font-semibold !rounded-sm skip"  fill="clear">Omitir por ahora</ion-button>
      </article>

        <!-- Dots -->
      <article class="flex justify-center mt-5">
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-9 h-2 bg-blue-800 rounded-full"></div>
        </div>
      </article>
    </ion-content>
  </template>
  
  <script lang="ts" setup>
  import { IonContent, IonButton } from '@ionic/vue';
  </script>
    
    <style scoped>
    ion-content.ionpb {
        --padding-bottom: 120px;
    }

    ion-button.skip{
        --background: #ffffff;
        --color: #b4b4b4;
    }
  </style>
  