<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/home" style="color: orangered;"></ion-back-button>
                </ion-buttons>
                <ion-title class="text-2xl font-bold text-center text-red-800 font-plus-jakarta-sans">
                    Mi cuenta
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
          
            <section class="flex justify-center font-plus-jakarta-sans">
                <div class="flex flex-col px-6 pt-6 w-full min-h-screen">
                    <!-- Profile Section -->
                    <div class="flex flex-col items-center mb-8">
                        <h4  class="text-xl font-semibold text-slate-800">!Bienvenido {{ userStore.getName.split(' ').slice(0, 1).join() }}!</h4>
                    </div>

                    <!-- Claims Section -->
                    <div class="mb-8">
                        <h3 class="text-lg font-inter  text-rose-800 mb-4 !font-black">
                            Mis Reclamos Publicados
                        </h3>

                        <div v-show="isLoading" class="flex flex-col gap-2 justify-center items-center mt-4">
                            <ion-spinner name="bubbles" color="danger"></ion-spinner>
                            <ion-text class="text-slate-600 font-plus-jakarta-sans">Obteniendo sus reclamos...</ion-text>
                        </div>
                     <ion-list v-if="userComplaints.length > 0">
  <ion-item-sliding
    v-for="complaint in userComplaints"
    :key="complaint.content"
    class="mb-2"
  >
    <ion-item>
      <!-- slot correcto -->
      <div slot="start" class="flex justify-center items-center p-2 mr-1.5 w-16 h-full bg-rose-100 rounded-sm">
        <img v-if="complaint.image" :src="complaint.image" class="rounded-xs" alt="">
        <v-icon v-else name="io-document-text" class="text-rose-700" scale="1.6"></v-icon>
      </div>

      <!-- 👇 ion-label en lugar de ion-item-content -->
      <ion-label class="flex flex-col gap-1 mb-4">
        <ion-text class="font-medium font-plus-jakarta-sans text-red-950">
          {{ complaint.title }}
        </ion-text>
        <ion-text class="text-sm font-plus-jakarta-sans">
          Categoría:
          <span class="px-2 py-0.5 text-sm text-rose-900 bg-rose-100 rounded-full">Transporte</span>
        </ion-text>
        <ion-text class="text-sm">2023-08-15</ion-text>
      </ion-label>
    </ion-item>

    <ion-item-options side="end">
      <ion-item-option color="danger">
        <v-icon name="md-deleteforever" scale="1.7"></v-icon>
      </ion-item-option>
    </ion-item-options>

    <ion-item-options side="start">
      <ion-item-option color="primary">
        <v-icon name="md-removeredeye-round" scale="1.7"></v-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</ion-list>


                     
                    </div>

                    <!-- Options Section -->
                    <div class="flex flex-col border-t border-[#E5E7EB] pt-6 mb-20">
                        <h3 class="text-lg font-semibold text-[#0A0A0A] mb-4">Opciones</h3>

                        <div class="flex justify-between items-center py-3">
                            <p class="text-base text-[#0A0A0A]">Editar perfil</p>
                            <i class="fa-solid fa-chevron-right text-[#0A0A0A] text-sm"></i>
                        </div>

                        <div class="flex justify-between items-center py-3">
                            <p class="text-base text-[#0A0A0A]">Cambiar contraseña</p>
                            <i class="fa-solid fa-chevron-right text-[#0A0A0A] text-sm"></i>
                        </div>

                        <div class="flex justify-between items-center py-3">
                            <p class="text-base text-[#0A0A0A]">Gestionar notificaciones</p>
                            <i class="fa-solid fa-chevron-right text-[#0A0A0A] text-sm"></i>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButtons, IonBackButton, IonList , IonItemSliding, IonText, IonButton, onIonViewDidEnter, onIonViewDidLeave, IonSpinner} from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { IComplaint } from '@/interfaces/IComplaint';

const userStore = useUserStore();

const db = getFirestore();

const complaintsCollection = collection(db, 'complaints');

const userComplaints = ref<IComplaint[]>([])

const isLoading = ref(false);
const qGetUserComplaints = query(complaintsCollection,where('userUid', '==', userStore.getUserID));
const getUserComplaints = () => {
    isLoading.value = true;
    getDocs(qGetUserComplaints).then((snapshot)=>{
        snapshot.forEach(doc => {
            userComplaints.value.push(doc.data())
        })
    }).catch((err)=> {
        console.log(err);
    }).finally(() => {
        isLoading.value = false;
    })
}

onIonViewDidEnter(() => {
    console.log('Entered Profile')
    getUserComplaints();
})

onIonViewDidLeave(()=> {
    console.log('Leaved Profile')
})


</script>

<style scoped></style>