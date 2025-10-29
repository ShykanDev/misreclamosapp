<template>
  <ion-page class="">
    <ion-header class="ion-no-border custom">
      <ion-toolbar class="">
        <ion-buttons slot="start">
          <ion-back-button color="danger" defaultHref="/tabs/initial"></ion-back-button>
        </ion-buttons>
        <ion-title
          class="text-rose-700 font-poppins">Iniciar
          sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bg-slate-900">
      <div class="flex flex-col gap-4">
        <h2 class="font-bold text-center text-amber-950 font-poppins">Bienvenido de nuevo</h2>
        <!-- Input Fields -->
        <article class="flex flex-col gap-4 p-2">
          <!--<input class="p-2 !py-3 rounded-lg border border-gray-50 outline-none bg-gray-200/50" type="text" placeholder="Correo electrónico"> -->
          <ion-input aria-label="Correo electrónico" color="danger" label="Correo electrónico" labelPlacement="floating"
            fill="outline" placeholder="correo@ejemplo.com" class="custom" :counter="true" :maxlength="40"
            v-model="email"></ion-input>
          <ion-input aria-label="contraseña" color="danger" label="Contraseña" labelPlacement="floating" fill="outline"
            placeholder="*******" class="custom" :counter="true" :maxlength="20" v-model="password"></ion-input>
        </article>
        <!-- Button -->
        <ion-button @click="handleLogin" class="font-semibold w-11/12 !mx-auto login" expand="block"
          style="text-transform: none;">Iniciar sesión</ion-button>
        <p class="text-center text-slate-500">¿No tiene cuenta?</p>
        <ion-button router-link="/tabs/register" fill="outline" color="danger" class="w-11/12 !mx-auto register"
          style="text-transform: none;">Registrarse</ion-button>

        <div class="flex justify-between">
          <p class="!text-sm text-left underline ml-2 text-gray-500" @click="showModal = true">¿Olvidó su contraseña?
          </p>
        </div>

        <ion-modal :is-open="showModal" @did-dismiss="showModal = false" ref="modal" trigger="open-modal">
          <ion-header class="ion-no-border">
            <ion-toolbar class="ion-padding">
              <ion-title>Recuperar contraseña</ion-title>
              <ion-buttons slot="start">
                <ion-button @click="showModal = false"><ion-icon :icon="arrowBack" color="danger" size="large"></ion-icon></ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">

            <ion-input label="Correo electrónico" label-placement="floating" ref="input" fill="outline" type="email"
              color="danger" placeholder="Ingrese su correo electrónico" class="custom" :counter="true" :maxlength="40"
              v-model="email" >
            </ion-input> 

            <ion-button @click="handleResetPassword" class="font-semibold w-11/12 !mx-auto login" expand="block"
              style="text-transform: none;">Enviar enlace de recuperación</ion-button> 
          </ion-content>
        </ion-modal>
        <!-- Loading Overlay -->
        <ion-loading :is-open="isLoading" v-model="isLoading" message="Cargando..." spinner="circles"></ion-loading>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonInput, IonButton, IonButtons, IonLoading, IonModal, useIonRouter } from '@ionic/vue';
import { ref } from 'vue';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { useLogginStore } from '@/stores/loggin';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { auth as FixedFirebaseAuth } from '@/main';
import { arrowBack} from 'ionicons/icons';

const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'center',
    y: 'top',
  },
  dismissible: true,
})

// Firebase auth
const auth = FixedFirebaseAuth;

// User input values
const email = ref('');
const password = ref('');
const showModal = ref(false)
//Ui value that contains boolean if user email is verified (if true then a popup will be shown)
const showVerifyEmail = ref(false)
const isUserEmailVerified = ref(false)
const isLoading = ref(false)
// Validate values to validate if user and password are not empty 
const validateValues = () => {
  if (email.value === '' || password.value === '') {
    return false
  }
  return true
}

const router = useIonRouter();
const handleLogin = () => {
  if (validateValues()) {
    isLoading.value = true
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log('userCredential.user.emailVerified =>', userCredential.user.emailVerified)
        if (!userCredential.user.emailVerified) {
          showVerifyEmail.value = true
          console.log('Email no verificado')
          return
        }
        const user = userCredential.user
        isUserEmailVerified.value = user.emailVerified
        useLogginStore().setUserEmailVerified(user.emailVerified)
        useLogginStore().setUserLoggedIn(true)
        notyf.success(`Le damos la bienvenida ${user.displayName}`)
        console.log(userCredential)
        email.value = ''
        password.value = ''
        router.navigate('/home','forward', 'push')
      })
      .catch((error) => {
        const errorCode = error.code
        notyf.error(`Error al iniciar sesión, error: ${errorCode}`)
        console.log(`ErrorCode: ${errorCode}`)
      }).finally(() => {
        isLoading.value = false
      })
  } else {
    console.log('Formulario inválido')
    notyf.error('Verifique los campos')
  }
}

const handleResetPassword = async () => {
  isLoading.value = true
  if(email.value === '') {
    notyf.error('Introduzca un correo electrónico')
    isLoading.value = false
    return
  }
  try {
    await sendPasswordResetEmail(auth, email.value)
    notyf.success(
      'Correo enviado, por favor verifique su bandeja de entrada, spam o correo no deseado',
    )
    console.log('Correo enviado')
    showModal.value = false
    email.value = ''
    notyf.success('Correo enviado, por favor verifique su bandeja de entrada, spam o correo no deseado')
  } catch (error) {
    console.log(error)
    notyf.error(`Error al enviar correo, error: ${error}`)
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
ion-content {
  --background: #FDF8F8;
}

ion-toolbar {
  --background: #FDF8F8;

}

ion-input.custom {
  --color: #A66367;
  --background: #F3E7E8;
  --placeholder-color: #A66367;
  --placeholder-opacity: 0.8;
  --border-radius: 10px !important;
  --border-width: 1px;
  --border-style: solid;
  --border-color: #ddd;
  --box-shadow: none;
  --outline-offset: 0;
  --outline-width: 0;
  --outline-style: none;
  --outline-color: #A66367;

}

ion-button.login {
  --border-radius: 10px;
  --background: #EA2832;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

ion-button.register {
  --border-radius: 10px;
  --background: #EA2832;
  --padding-top: 12px;
  --padding-bottom: 12px;
}
</style>
