<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <ion-content class="flex flex-col justify-between min-h-screen bg-white font-plus-jakarta-sans ion-padding modal">
      <!-- Header -->
      <div>
        <div class="flex justify-between items-center p-4 pb-2">
          <div class="text-[#181111] flex size-12 items-center justify-center">
            <v-icon name="md-lockreset-round" class="text-red-700" scale="1.6" />
          </div>
          <h2 class="flex-1 pr-12 text-lg font-bold tracking-tight leading-tight text-center text-red-700">
            Cambiar Contraseña
          </h2>
        </div>

        <h1 class="!text-4xl !font-bold leading-tight px-4 text-center pb-3 pt-5 text-rose-900">
          Actualice su contraseña para mantener su cuenta segura.
        </h1>

        <section>
          <!-- Loading Overlay -->
          <ion-loading :is-open="isLoading" message="Cargando..." spinner="circles"></ion-loading>

          <!-- Contenedor principal -->
          <div class="flex justify-center min-h-screen">
            <!--Card-->
            <div class="w-full ion-padding">


              <!-- Formulario -->
              <div class="space-y-5 font-spline-sans">

                <!-- IMPORTANTE: Campo para Email Actual (Para Reautenticación) -->
                <ion-input color="danger" v-model="currentEmail" name="currentEmail" type="email"
                  placeholder="tucorreo@ejemplo.com" class="custom" label="Su Email Actual" fill="outline"
                  :required="true"></ion-input>

                <!-- IMPORTANTE: Campo para Contraseña Actual (Para Reautenticación) -->
                <ion-input color="danger" v-model="currentPassword" name="currentPassword" type="password"
                  placeholder="••••••••" class="custom" label="Su Contraseña Actual" fill="outline"
                  :required="true"></ion-input>

                <hr class="mt-6 mb-6 border-red-100">
                
                <!-- Campo: Nueva Contraseña -->
                <ion-input color="danger" v-model="newPassword" name="password" type="password" placeholder="••••••••"
                  @input="validatePasswordQuality()" class="custom" label="Nueva Contraseña" fill="outline"
                  :required="true"></ion-input>

                <!-- Campo: Confirmar Contraseña -->
                <ion-input color="danger" v-model="confirmPassword" name="confirmPassword" type="password"
                  placeholder="••••••••" class="custom" label="Confirmar Nueva Contraseña" fill="outline"
                  :required="true"></ion-input>

                <!-- Requisitos de contraseña -->
                <div class="flex flex-col gap-3 px-4 text-sm">
                  <p :class="{
                    'text-rose-800': passswordRequirements.length,
                    'text-emerald-600': !passswordRequirements.length && newPassword.length >= 9,
                  }">
                    <v-icon v-if="!passswordRequirements.length && newPassword.length >= 9" name="bi-shield-check"
                      class="mr-2"></v-icon>
                    <v-icon v-else name="hi-shield-exclamation" class="mr-2"></v-icon>
                    Su contraseña debe tener mínimo 9 caracteres
                  </p>
                  <p :class="{
                    'text-rose-800': passswordRequirements.uppercase,
                    'text-emerald-600': !passswordRequirements.uppercase && newPassword.match(/[A-Z]/),
                  }">
                    <v-icon v-if="!passswordRequirements.uppercase && newPassword.match(/[A-Z]/)" name="bi-shield-check"
                      class="mr-2"></v-icon>
                    <v-icon v-else name="hi-shield-exclamation" class="mr-2"></v-icon>
                    Su contraseña debe tener al menos una mayúscula
                  </p>
                  <p :class="{
                    'text-rose-800': newPassword !== confirmPassword,
                    'text-emerald-600': newPassword === confirmPassword && newPassword.length >= 9,
                  }">
                    <v-icon v-if="newPassword === confirmPassword && newPassword.length >= 9" name="bi-shield-check"
                      class="mr-2"></v-icon>
                    <v-icon v-else name="hi-shield-exclamation" class="mr-2"></v-icon>

                    Su contraseña debe coincidir
                  </p>
                </div>

              </div>

                <div class="flex justify-stretch">
          <div class="flex flex-wrap flex-1 gap-3 justify-around px-4 py-3">
            <ion-button fill="solid" color="light" class="flex-1  text-[#181111] font-bold cancel !w-[33%]"
              @click="close" shape="round" style="text-transform: none;">
              Cancelar
            </ion-button>

            <ion-button fill="solid" color="danger" class="flex-1 font-bold text-white save !w-[33%]"
              @click="saveChanges" shape="round" style="text-transform: none;">
              Guardar Cambios
            </ion-button>
          </div>
        </div>

            </div>
          </div>

        </section>
      </div>

      <!-- Footer -->

    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { IonModal, IonContent, IonInput, IonButton, IonLoading } from "@ionic/vue";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@/main"; // Asume que 'auth' está exportado desde Su archivo main.ts
import { useNotif } from "@/stores/notif";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

// Nuevos estados para la reautenticación
const currentEmail = ref("");
const currentPassword = ref("");

// Estados para la nueva contraseña
const newPassword = ref("");
const confirmPassword = ref("");

const close = () => emit("close");

const passswordRequirements = reactive({
  length: false,
  uppercase: false,
})

const isLoading = ref(false)

const validatePasswordQuality = () => {
  if (newPassword.value.length < 9) {
    passswordRequirements.length = true
    return false
  } else {
    passswordRequirements.length = false
  }
  if (!newPassword.value.match(/[A-Z]/)) {
    passswordRequirements.uppercase = true
    return false
  } else {
    passswordRequirements.uppercase = false
  }
  return true
}

const saveChanges = async () => {
  if (!auth.currentUser) {
    useNotif().error('Error', 'No hay un usuario activo para actualizar.');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    useNotif().error('Error', 'Las nuevas contraseñas no coinciden.');
    return;
  }
  
  if (!validatePasswordQuality()) {
    useNotif().error('Error', 'La nueva contraseña no cumple con los requisitos.');
    return;
  }

  // --- INICIO DE LÓGICA DE REAUTENTICACIÓN ---
  isLoading.value = true;
  
  try {
    // 1. Crear credencial con el email y contraseña actuales que ingresó el usuario
    const credential = EmailAuthProvider.credential(
      currentEmail.value, 
      currentPassword.value
    );

    // 2. Reautenticar al usuario
    await reauthenticateWithCredential(auth.currentUser, credential);
    
    // Si llegamos aquí, la reautenticación fue exitosa y la sesión es reciente
    
    // 3. Actualizar la contraseña
    await updatePassword(auth.currentUser, newPassword.value);
    
    // Éxito
    close();
    useNotif().success('Éxito', 'Contraseña actualizada correctamente.');

  } catch (error) {
    const e = error as Error & { code?: string };
    
    let errorMessage = 'Hubo un error desconocido al actualizar la contraseña.';

    // Manejo de errores de reautenticación comunes
    if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
      errorMessage = 'Email o Contraseña Actual incorrectos. Por favor, verifica tus credenciales.';
    } else if (e.code === 'auth/user-mismatch') {
      errorMessage = 'El email ingresado no coincide con el usuario actualmente logueado.';
    } else if (e.code === 'auth/user-not-found') {
      errorMessage = 'El usuario no fue encontrado.';
    } else {
      errorMessage = e.message || errorMessage;
    }
    
    useNotif().error('Error', errorMessage);

  } finally {
    isLoading.value = false;
  }
  // --- FIN DE LÓGICA DE REAUTENTICACIÓN ---
};
</script>

<style scoped>
ion-modal {
  --height: auto;
  --border-radius: 16px;
  --box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

ion-content.modal {
  --background: #fff;
}

ion-input {
  --background: #fff6f6;
}

ion-button.cancel {
  --background: #f4f0f0;
}

ion-button.save {
  --background: #ea2a33;
}
</style>