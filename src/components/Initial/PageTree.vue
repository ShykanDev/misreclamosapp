<template>
  <ion-content class="flex flex-col justify-evenly items-center p-6 rounded-2xl shadow-lg md:ionpb">
    <div class="min-h-full">

   

    <!-- Title -->
    <h2 class="mb-4 !text-3xl font-medium text-center text-rose-900">
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
    <ion-button router-link="/tabs/login" color="danger" class="w-11/12 !mx-auto text-white !p-3.5 font-semibold !rounded-lg loggin" shape="round" fill="solid" style="text-transform:none">Iniciar sesión</ion-button>
    <ion-button router-link="/tabs/register" color="danger" class="w-11/12 !mx-auto text-blue-600 !p-3.5 font-semibold !rounded-lg register" shape="round" fill="outline" style="text-transform:none">Registrarse</ion-button>
      </div>



    </article>
     <!-- Image -->
    <div class="flex justify-center items-center mb-8">
      <DotLottieVue src="https://lottie.host/38821f7b-59b0-4b2c-8987-28e474517500/P1W1qaLltJ.lottie" autoplay loop></DotLottieVue>
    </div>
    <!-- Button Skip (CTA) -->
    <ion-button router-link="/tabs/home" class="w-12/12 !mx-auto !p-3.5 font-semibold !rounded-sm skip"  fill="clear">Omitir por ahora</ion-button>
  </div>

  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonButton } from '@ionic/vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>
  
  <style scoped>
  ion-content.ionpb {
      --padding-bottom: 120px;
  }
  ion-button.loggin {
    --background:#2163fd;
    --color: #ffffff;
    --border-radius: 10px !important;
  }
  ion-button.skip{
      --background: #ffffff;
      --color: #b4b4b4;
      --border-radius: 1rem;
  }
  ion-button.register{
    --background: #ffffff;
    --color:  #2163fd;
    --border-radius: 10px !important;
  }
  ion-content{
    --background: #FDF8F8;
  }
</style>
