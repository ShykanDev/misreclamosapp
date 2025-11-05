<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-buttons slot="start">
          <ion-back-button text="Volver" class="text-rose-700" defaultHref="/tabs/initial"></ion-back-button>
        </ion-buttons>
        <ion-title class="absolute top-1/2 left-1/2 text-center text-rose-800 -translate-x-1/2 -translate-y-1/2">Registrarse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
  <!-- Loading Overlay -->
  <ion-loading
    v-model="isLoading"
    message="Cargando..."
    spinner="circles"
  ></ion-loading>

  <!-- Contenedor principal -->
  <div class="flex justify-center min-h-screen">
    <!--Card-->
    <ion-card class="w-full ion-padding"> 
      <!-- Header con degradado azul -->
      <ion-card-header class="mb-6 text-center">
        <ion-card-title class="text-2xl text-amber-950">
          Cree su cuenta
        </ion-card-title>
        <ion-card-subtitle class="hidden mt-2 text-gray-500 text-md">
          Únase y disfrute de todos los beneficios
        </ion-card-subtitle>
      </ion-card-header>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit()" class="space-y-5 font-spline-sans">
        <!-- Campo: Nombre -->
     
          <ion-input
          color="danger"
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
          color="danger"
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
          color="danger"
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
          color="danger"
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
        <div class="flex flex-col gap-3 px-4 text-sm">
          <p
            :class="{
              'text-rose-800': passswordRequirements.length,
              'text-emerald-600': !passswordRequirements.length && form.password.length >= 9,
            }"
          >
          <v-icon name="" class="mr-2"></v-icon>
            Su contraseña debe tener mínimo 9 caracteres
          </p>
          <p
            :class="{
              'text-rose-800': passswordRequirements.uppercase,
              'text-emerald-600': !passswordRequirements.uppercase && form.password.match(/[A-Z]/),
            }"
          >
          Su contraseña debe tener al menos una mayúscula
          </p>
          <p
            :class="{
              'text-rose-800': form.password !== form.confirmPassword,
              'text-emerald-600': form.password === form.confirmPassword && form.password.length >= 9,
            }"
          >
              Su contraseña debe coincidir
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
          color="danger"
          class="register"
          style="text-transform: none;"
        >
          Registrarse
        </ion-button>
      </form>

  <ion-loading class="custom-loading" :isOpen="isLoading" message="Registrando..." spinner="circles" ></ion-loading>
      <!-- Enlace a Login -->
      <div class="mt-6 text-center">
        <ion-text @click="openModal()" class="block mb-1.5 cursor-pointer">
          ¿Olvidó su contraseña?
        </ion-text>
        <ion-text class="text-gray-500">
          ¿Ya tiene cuenta?
          <router-link to="/tabs/login" class="font-medium text-rose-600 hover:text-rose-700">
            Iniciar sesión
          </router-link>
        </ion-text>
      </div>
    </ion-card>
  </div>

  <!--Success Modal-->
  <ion-modal :is-open="success" @didDismiss="success = false" backdropDismiss="false">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="success = false" style="text-transform: none;" class="acceptModal font-inter">Aceptar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
     <ion-content class="relative ion-padding" :fullscreen="true">
        <h3 class="text-center text-rose-800 font-inter">¡Su cuenta ha sido creada con exito!</h3>
         <DotLottieVue style="width:90%; margin: 0 auto;" autoplay loop src="https://lottie.host/64a8ea7b-2a04-4d33-bebe-cf0bb2fd9777/7Yx5lQcDap.json" />

        <p class="text-center text-black font-poppins">Por favor, revise su correo electrónico para verificar su cuenta. (Si no lo encuentra, verifique la carpeta de spam).</p>
        <div class="flex justify-center">
          <ion-button @click="success = false" router-link="/tabs/login" color="danger" style="text-transform: none;" class="mt-6 font-bold acceptModal font-inter">Ir a la pantalla de inicio</ion-button>
        </div>
        <p class="absolute bottom-4 left-1/2 text-center -translate-x-1/2 text-slate-700 font-poppins">Gracias por usar nuestra aplicación.</p>
      </ion-content>
  </ion-modal>

</ion-content>

</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, IonButton, IonText, IonLoading, loadingController, IonModal } from '@ionic/vue';
import { reactive, ref } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { useNotif } from '@/stores/notif';
// Create an instance of notifStore
const notifStore = useNotif()

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
    notifStore.error('Hay campos vacíos', 'Todos los campos son obligatorios')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    notifStore.error('Contraseñas inválidas', 'Las contraseñas no coinciden')
    return
  }
  if (!validatePasswordQuality()) {
    notifStore.error('Contraseña inválida', 'La contraseña no cumple con los requisitos')
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
      const e = error as Error
      notifStore.error('Error al registrar el usuario', `${e.message}`)
      isLoading.value = false
    }
  }
}

const showReset = ref(false)


const openModal = () => {
  showReset.value = true
}

const showLoading = async () => {
    const loading = await loadingController.create({
      message: 'Dismissing after 3 seconds...',
      duration: 1000,
      spinner: 'lines-sharp-small',
      cssClass: 'custom-loading',
    });

    loading.present();
  };


  const closeModal = () => {
    showReset.value = false
  }

  const closeSuccess = () => {
    success.value = false
  }
</script>

<style scoped>
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
  --outline-color: transparent;
}
ion-input{
  --background:#F1F2F4;
}
ion-button.register{
  --border-radius: 10px;
  --background:#EA2832;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
ion-loading.custom-loading{
  --background: #ffffff ;
  --color: #0049bf ;
  --border-radius: 20px;
  color: #232323;
}
ion-button.acceptModal{
  --border-radius: 10px;
  --background:#EA2832;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  --color:white;
}
ion-card{
  --background:#FDF8F8;
}
ion-toolbarl{
  --background:#ffe0e2;
}
</style>
