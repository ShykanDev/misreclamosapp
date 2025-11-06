<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <ion-content class="flex flex-col justify-between min-h-screen bg-white font-plus-jakarta-sans ion-padding modal">
      <!-- Header -->
      <div>
        <div class="flex justify-between items-center p-4 pb-2">
          <div class="text-[#181111] flex size-12 items-center justify-center">
        <v-icon name="md-lockreset-round"  class="text-red-700" scale="1.6" />
          </div>
          <h2 class="flex-1 pr-12 text-lg font-bold tracking-tight leading-tight text-center text-red-700">
            Cambiar Contraseña
          </h2>
        </div>

        <h1 class="!text-4xl !font-bold leading-tight px-4 text-center pb-3 pt-5 text-rose-900">
          Actualice su contraseña para mantener su cuenta segura.
        </h1>

        <!-- Contraseña actual -->
        <div class="flex flex-wrap gap-4 items-end px-4 py-3">
         
            <ion-input
              type="password"
              placeholder="Introduzca su contraseña actual"
              v-model="currentPassword"
              class="h-14 text-[#181111]"
              fill="outline"
              label-placement="floating"
              label="Contraseña actual"
              shape="round"
              color="danger"
            />
            
        </div>

        <!-- Nueva contraseña -->
        <div class="flex flex-wrap gap-4 items-end px-4 py-3">
          
            <ion-input
              type="password"
              placeholder="Introduzca su nueva contraseña"
              v-model="newPassword"
              class=""
              fill="outline"
              label-placement="floating"
              label="Nueva contraseña"
              shape="round"
              color="danger"
            />
        
        </div>

        <!-- Confirmar nueva contraseña -->
        <div class="flex flex-wrap gap-4 items-end px-4 py-3">
            
            <ion-input
              type="password"
              placeholder="Confirmar Nueva Contraseña"
              v-model="confirmPassword"
              class="h-14 text-[#181111]"
              fill="outline"
              label-placement="floating"
              label="Confirmar nueva contraseña"
              shape="round"
              color="danger"
            />
        </div>
      </div>

      <!-- Footer -->
      <div>
        <div class="flex justify-stretch">
          <div class="flex flex-wrap flex-1 gap-3 justify-around px-4 py-3">
            <ion-button
              fill="solid"
              color="light"
              class="flex-1  text-[#181111] font-bold cancel !w-[33%]"
              @click="close"
              shape="round"
              style="text-transform: none;"
            >
              Cancelar
            </ion-button>

            <ion-button
              fill="solid"
              color="danger"
              class="flex-1 font-bold text-white save !w-[33%]"
              @click="saveChanges"
              shape="round"
              style="text-transform: none;"
            >
              Guardar Cambios
            </ion-button>
          </div>
        </div>
        <div class="h-5 bg-white"></div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonModal, IonContent, IonInput, IonButton } from "@ionic/vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const close = () => emit("close");

const saveChanges = () => {
  console.log("Guardar cambios", {
    current: currentPassword.value,
    newPass: newPassword.value,
    confirm: confirmPassword.value,
  });
  close();
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
ion-button.cancel{
  --background: #f4f0f0;
}
ion-button.save{
  --background: #ea2a33;
}
</style>
