<template>
  <ion-app>
    <div class="flex fixed top-16 z-50 justify-end w-full ion-padding font-spline-sans">
      <transition appear leave-active-class="animate__animated animate__backOutUp"
        enter-active-class="animate__animated animate__bounceInDown">
        <article v-if="notifStore.getShow" :key="notifStore.getTimer ?? Math.random()"
          class="relative w-11/12 h-full bg-white rounded-md shadow-2xl">
          <aside :class="{
            'bg-green-400': notifStore.getType === 'success',
            'bg-rose-400': notifStore.getType === 'error',
            'bg-yellow-400': notifStore.getType === 'warning',
            'bg-blue-400': notifStore.getType === 'info',
          }" class="absolute left-0 w-3 h-full rounded-l-md"></aside>

          <div class="flex gap-4 justify-start items-center py-2 ml-7 h-full">
            <section>
              <v-icon v-show="notifStore.getType === 'success'" name="bi-check-circle-fill" :class="{
                'text-green-400': notifStore.getType === 'success',
                'text-rose-400': notifStore.getType === 'error',
                'text-yellow-400': notifStore.getType === 'warning',
                'text-blue-400': notifStore.getType === 'info',
              }" class="animate-jump animate-delay-[0.9s] animate-duration-[.6s]" scale="1.9" />
              <v-icon v-show="notifStore.getType === 'error'" name="io-close-circle" :class="{
                'text-green-400': notifStore.getType === 'success',
                'text-rose-400': notifStore.getType === 'error',
                'text-yellow-400': notifStore.getType === 'warning',
                'text-blue-400': notifStore.getType === 'info',
              }" class="animate-jump animate-delay-[0.9s] animate-duration-[.6s]" scale="1.9" />
            </section>

            <section class="flex flex-col justify-between h-full">
              <p class="font-semibold text-gray-800">{{ notifStore.getTitle }}</p>
              <p class="text-sm text-gray-500">{{ notifStore.getSubtitle }}</p>
            </section>
          </div>

          <section @click="notifStore.setShow(false)" class="absolute top-1 right-1">
            <v-icon name="io-close" class="cursor-pointer text-slate-400" scale="1.2" />
          </section>
        </article>
      </transition>
    </div>



 
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useNotif } from './stores/notif';
const notifStore = useNotif();
import 'animate.css';



</script>