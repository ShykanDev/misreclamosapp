<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-title class="text-center text-blue-800">Registrarse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="">
  <!-- Overlay de carga -->
  <ion-loading
    v-model="isLoading"
    message="Cargando..."
    spinner="circles"
  ></ion-loading>

  <!-- Contenedor principal -->
  <div class="flex justify-center min-h-screen">
    <!--Card-->
    <ion-card class="w-full bg-white ion-padding"> 
      <!-- Header con degradado azul -->
      <ion-card-header class="mb-6 text-center">
        <ion-card-title class="text-2xl">
          Cree su cuenta
        </ion-card-title>
        <ion-card-subtitle class="hidden mt-2 text-gray-500 text-md">
          Únase y disfrute de todos los beneficios
        </ion-card-subtitle>
      </ion-card-header>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit()" class="space-y-5">
        <!-- Campo: Nombre -->
     
          <ion-input
            labelPlacement="floating"
            v-model="form.name" 
            name="name"
            type="text"
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            fill="outline"
            :required="true"
            class="custom"
          ></ion-input>

        <!-- Campo: Email -->
          
          <ion-input
            labelPlacement="floating"
            v-model="form.email"
            name="email"
            type="email"
            placeholder="Ej: juan@example.com"
            label="Correo electrónico"
            class="custom"
            fill="outline"
            required  
          ></ion-input>

        <!-- Campo: Contraseña -->
          
          <ion-input
            v-model="form.password"
            name="password"
            type="password"
            placeholder="••••••••"
            @input="validatePasswordQuality()"
            class="custom"
            label="Contraseña"
            fill="outline"
            :required="true"
          ></ion-input>

        <!-- Campo: Confirmar Contraseña -->
     
          <ion-input
            v-model="form.confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="custom"
            label="Confirmar contraseña"
            fill="outline"
            :required="true"
          ></ion-input>

        <!-- Requisitos de contraseña -->
        <div class="px-4 text-sm">
          <p
            :class="{
              'text-red-500': passswordRequirements.length,
              'text-green-500': !passswordRequirements.length && form.password.length >= 9,
            }"
          >
            *Su contraseña debe tener mínimo 9 caracteres
          </p>
          <p
            :class="{
              'text-red-500': passswordRequirements.uppercase,
              'text-green-500': !passswordRequirements.uppercase && form.password.match(/[A-Z]/),
            }"
          >
            *Su contraseña debe tener al menos una mayúscula
          </p>
          <p
            :class="{
              'text-red-500': form.password !== form.confirmPassword,
              'text-green-500': form.password === form.confirmPassword && form.password.length >= 9,
            }"
          >
            *Su contraseña debe coincidir
          </p>
          <p class="text-gray-500">
            Al registrarse, acepta nuestros
            <ion-text color="primary">
              <a href="#">Términos y Condiciones</a>
            </ion-text>
          </p>
        </div>

        <!-- Botón de registrar -->
        <ion-button
            type="submit"
          expand="block"
          class="register"
          style="text-transform: none;"
        >
          Registrarse
        </ion-button>
      </form>

      <!-- Enlace a Login -->
      <div class="mt-6 text-center">
        <ion-text @click="openModal()" class="block mb-1.5 cursor-pointer">
          ¿Olvidó su contraseña?
        </ion-text>
        <ion-text class="text-gray-500">
          ¿Ya tiene cuenta?
          <ion-router-link routerLink="/login" class="font-medium text-blue-600 hover:text-blue-700">
            Inicia sesión
          </ion-router-link>
        </ion-text>
      </div>
    </ion-card>
  </div>
</ion-content>

</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel, IonInput, IonButton, IonText, IonLoading } from '@ionic/vue';
import { reactive, ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css' // for React, Vue and Svelte
//import LoaderA from '@/animations/Loaders/LoaderA.vue'
//import ResetPassword from '@/modals/Register/ResetPassword.vue'
//import { BiBook } from 'oh-vue-icons/icons'

// Create an instance of Notyf
const notyf = new Notyf({
  position: { x: 'right', y: 'top' },
})

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passswordRequirements = reactive({
  length: false,
  uppercase: false,
})

const isLoading = ref(false)

const auth = getAuth()

const userName = ref('Alejandro')
const success = ref(false)

const emmits = defineEmits(['callToggle'])

const validatePasswordQuality = () => {
  if (form.value.password.length < 9) {
    passswordRequirements.length = true
    return false
  } else {
    passswordRequirements.length = false
  }
  if (!form.value.password.match(/[A-Z]/)) {
    passswordRequirements.uppercase = true
    return false
  } else {
    passswordRequirements.uppercase = false
  }
  return true
}

const handleSubmit = async () => {
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword
  ) {
    notyf.error('Todos los campos son obligatorios')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    notyf.error('Las contraseñas no coinciden')
    return
  }
  if (!validatePasswordQuality()) {
    notyf.error('La contraseña no cumple con los requisitos')
    return
  } else {
    try {
      isLoading.value = true
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.value.email,
        form.value.password,
      )
      await updateProfile(userCredential.user, { displayName: form.value.name })
      await sendEmailVerification(userCredential.user)
      userName.value = form.value.name
      isLoading.value = false
      success.value = true
      console.log(userCredential)
      console.log('User registered successfully')
    } catch (error) {
      console.log(error)
      notyf.error(
        'Ocurrió un error al registrar el usuario, intentelo de nuevo y verifique sus datos',
      )
      isLoading.value = false
    }
  }
}

const showReset = ref(false)

const closeModal = () => {
  showReset.value = false
}

const openModal = () => {
  showReset.value = true
}
</script>

<style scoped>
ion-input.custom {
  --color: #525252;
  --background: #F1F2F4;
  --placeholder-color: #5c5c5c;
  --placeholder-opacity: 0.8;
  --border-radius: 10px !important;
  --border-width: 1px;
  --border-style: solid;
  --border-color: #ddd;
  --box-shadow: none;
  --outline-offset: 0;
  --outline-width: 0;
  --outline-style: none;
  --outline-color: transparent;
}
ion-input{
  --background:#F1F2F4;
}
ion-button.register{
  --border-radius: 10px;
  --background:#1146b0;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
