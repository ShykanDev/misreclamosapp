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
                        <ion-list v-if="userComplaints.length>0">
                            <ion-item-sliding v-for="complaint in userComplaints" :key="complaint.content" class="mb-2" >
                                <ion-item>
                                    <ion-item-start class="flex justify-center items-center p-2 mr-1.5 w-16 h-full bg-rose-100 rounded-sm">
                                        <img v-if="complaint.image" :src="complaint.image" class="rounded-xs" alt="">
                                        <v-icon v-else name="io-document-text" class="text-rose-700" scale="1.6"></v-icon>
                                    </ion-item-start>
                                    <ion-item-content class="flex flex-col gap-1 ion-padding">
                                        <ion-item-title>
                                            <ion-text class="font-medium font-plus-jakarta-sans text-red-950">
                                                {{ complaint.title }}
                                            </ion-text>
                                        </ion-item-title>
                                            <ion-text class="text-sm font-plus-jakarta-sans">
                                                Categoría: <span class="px-2 py-0.5 text-sm text-rose-900 bg-rose-100 rounded-full">Transporte</span> </ion-text>
                                                <ion-text class="text-sm">2023-08-15</ion-text>
                                    </ion-item-content>
                                </ion-item>
                                <ion-item-options side="end">
                                    <ion-item-option color="danger" class="bg-red-600 min-w-16">
                                        <v-icon name="md-deleteforever" scale="1.7"></v-icon>
                                    </ion-item-option>
                                </ion-item-options>
                                <ion-item-options side="start">
                                    <ion-item-option color="primary" class="bg-blue-500 min-w-16">
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

                    <!-- Bottom Navigation -->
                    <nav
                        class="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E7EB] flex justify-around py-2">
                        <div class="flex flex-col items-center text-[#6B7280]">
                            <i class="mb-1 text-xl fa-solid fa-house"></i>
                            <span class="text-xs">Home</span>
                        </div>
                        <div class="flex flex-col items-center text-[#6B7280]">
                            <i class="mb-1 text-xl fa-solid fa-square-plus"></i>
                            <span class="text-xs">Publicar</span>
                        </div>
                        <div class="flex flex-col items-center text-[#6B7280]">
                            <i class="mb-1 text-xl fa-solid fa-magnifying-glass"></i>
                            <span class="text-xs">Buscar</span>
                        </div>
                        <div class="flex flex-col items-center text-black">
                            <i class="mb-1 text-xl fa-solid fa-user"></i>
                            <span class="text-xs font-medium">Mi Cuenta</span>
                        </div>
                    </nav>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButtons, IonBackButton, IonList , IonItemSliding, IonText, IonButton, onIonViewDidEnter, onIonViewDidLeave} from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { IComplaint } from '@/interfaces/IComplaint';

const userStore = useUserStore();

const db = getFirestore();

const complaintsCollection = collection(db, 'complaints');

const userComplaints = ref<IComplaint[]>([])

const qGetUserComplaints = query(complaintsCollection,where('userUid', '==', userStore.getUserID));
const getUserComplaints = () => {
    getDocs(qGetUserComplaints).then((snapshot)=>{
        snapshot.forEach(doc => {
            userComplaints.value.push(doc.data())
        })
    }).catch((err)=> {
        console.log(err);
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