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
          <ion-loading v-model="isLoading" message="Cargando..." spinner="circles"></ion-loading>

          <!-- Contenedor principal -->
          <div class="flex justify-center min-h-screen">
            <!--Card-->
            <div class="w-full ion-padding">


              <!-- Formulario -->
              <div class="space-y-5 font-spline-sans">
                <!-- Campo: Nombre -->

                <!-- Campo: Contraseña -->

                <ion-input color="danger" v-model="newPassword" name="password" type="password" placeholder="••••••••"
                  @input="validatePasswordQuality()" class="custom" label="Contraseña" fill="outline"
                  :required="true"></ion-input>

                <!-- Campo: Confirmar Contraseña -->

                <ion-input color="danger" v-model="confirmPassword" name="confirmPassword" type="password"
                  placeholder="••••••••" class="custom" label="Confirmar contraseña" fill="outline"
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
import { updatePassword } from "firebase/auth";
import { auth } from "@/main";
import { useNotif } from "@/stores/notif";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const newPassword = ref("");
const confirmPassword = ref("");

const close = () => emit("close");


const passswordRequirements = reactive({
  length: false,
  uppercase: false,
})

const isLoading = ref(false)


const success = ref(false)


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
const saveChanges = () => {
  if (newPassword.value !== confirmPassword.value) {
    useNotif().error('Error', 'Las contraseñas no coinciden');
    return;
  }
  updatePassword(auth.currentUser!, newPassword.value).then(() => {
    close();
    useNotif().success('Exito', 'Contraseña actualizada');
  }).catch((error) => {
    const e = error as Error;
    useNotif().error('Error', e.message);
  });
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
