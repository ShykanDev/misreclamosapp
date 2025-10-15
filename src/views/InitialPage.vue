<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title class="text-center">
                    <span class="font-medium text-center text-blue-900">MisReclamos.com</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="embla" ref="emblaRef">
                <div class=" embla__container h-[85dvh]">
                   <PageOne class="embla__slide" />
                    <PageTwo class="embla__slide" />
                    <PageTree class="embla__slide" />
                </div>
            </div>
            <!--Dots-->
            <article class="flex gap-1 justify-center mt-3">
                <div class="w-2 h-2 rounded-full cursor-pointer" @click="goToPage(0)" :class="selectedScrollSnap === 0 ? 'bg-blue-800 transition-all duration-500 ease-out w-9' : 'bg-gray-300'"></div>
                <div class="w-2 h-2 rounded-full cursor-pointer" @click="goToPage(1)" :class="selectedScrollSnap === 1 ? 'bg-blue-800 transition-all duration-500 ease-out w-9' : 'bg-gray-300'"></div>
                <div class="w-2 h-2 rounded-full cursor-pointer" @click="goToPage(2)" :class="selectedScrollSnap === 2 ? 'bg-blue-800 transition-all duration-500 ease-out w-9' : 'bg-gray-300'"></div>
            </article>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import PageOne from '@/components/Initial/PageOne.vue';
import PageTree from '@/components/Initial/PageTree.vue';
import PageTwo from '@/components/Initial/PageTwo.vue';
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, onIonViewDidEnter, onIonViewDidLeave} from '@ionic/vue';
import emblaCarouselVue from 'embla-carousel-vue'
import { nextTick, onMounted, ref } from 'vue';
const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false }); // Desestructuración correcta
const selectedScrollSnap = ref(0);

const onSelect = () => {
  if (!emblaApi.value) return;
  selectedScrollSnap.value = emblaApi.value.selectedScrollSnap();
};

const goToPage = (index: number) => {
  if (!emblaApi.value) return;
  emblaApi.value.scrollTo(index);
};

// Inicializa el carousel cuando la vista está activa
onIonViewDidEnter(async () => {
  await nextTick(); // Espera a que el DOM esté listo
  if (!emblaApi.value) return;

  // Reinicia el carousel
  emblaApi.value.reInit();
  emblaApi.value.on('select', onSelect);
  onSelect();
});

// Limpia los listeners al salir de la vista
onIonViewDidLeave(() => {
  if (!emblaApi.value) return;
  emblaApi.value.off('select', onSelect);
});
</script>

<style scoped>
.embla {
    overflow: hidden;
}

.embla__container {
    display: flex;
}

.embla__slide {
    flex: 0 0 100%;
    min-width: 0;
}
</style>