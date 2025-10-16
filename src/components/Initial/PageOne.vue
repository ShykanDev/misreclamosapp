<template>
<ion-content class="flex flex-col gap-4 items-center p-6 rounded-2xl shadow-lg ion-padding" >
  <!-- Image-->
  <div class="flex justify-center items-center mb-8">

    <img
          src="../../assets/redMad200.png"
          alt="Persona escribiendo un comentario con megáfono"
          class="object-contain w-full sm:w-4xl md:w-2xl lg:w-2xl"
        >
  </div>

  <!-- Title-->
  <h2 class="mb-4 !text-3xl font-medium text-center text-rose-900">
    Compare y descubra experiencias reales
  </h2>
  <div class="flex flex-col items-center">
    <!-- Text -->
    <p class="max-w-xs text-lg text-center text-gray-600">
      En <strong>MisReclamos</strong>, usted puede leer y compartir experiencias reales sobre empresas, productos y servicios. Así evita malos ratos y toma decisiones informadas.
    </p>
  </div>
</ion-content>


</template>

<script lang="ts" setup>
import { IonContent } from '@ionic/vue';
</script>

<style scoped>
</style>