<template>
<ion-content class="flex flex-col items-center ion-padding justify-evenly h-[100vh] p-6 bg-white rounded-2xl shadow-lg">
  <!-- Image-->
  <div class="flex justify-center items-center mb-8">
    <img
      src="../../assets/talkingV2.jpg"
      alt="Personas leyendo comentarios sobre productos"
      class="object-contain w-full sm:w-4xl md:w-2xl lg:w-2xl"
    >
  </div>

  <!-- Title-->
  <h2 class="mb-4 !text-3xl font-medium text-center text-blue-900">
    Compare y descubra experiencias reales
  </h2>


  <div class="flex flex-col items-center">
    <!-- Text -->
    <p class="max-w-xs text-lg text-center text-gray-600">
      En <strong>MisReclamos</strong>, usted puede leer y compartir experiencias reales sobre empresas, productos y servicios. Así evita malos ratos y toma decisiones informadas.
    </p>
  </div>

  <!-- Dots-->
   <article class="flex justify-center mt-5">
    <div class="flex gap-2 items-center">
    <div class="w-9 h-2 bg-blue-800 rounded-full"></div>
    <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
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