<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title class="text-center">
                    <span class="font-medium text-center text-rose-900">MisReclamos.com</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide"><PageOne></PageOne></div>
    <div class="swiper-slide"><PageTwo></PageTwo></div>
    <div class="swiper-slide"><PageTree></PageTree></div>
    ...
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>


  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import PageOne from '@/components/Initial/PageOne.vue';
import PageTree from '@/components/Initial/PageTree.vue';
import PageTwo from '@/components/Initial/PageTwo.vue';
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, onIonViewDidEnter } from '@ionic/vue';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



onIonViewDidEnter(() => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    modules: [Navigation, Pagination], // Asegúrate de incluir los módulos
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});
</script>

<style scoped>
.swiper {
  width: 100%; 
  height: 100%;
}
</style>