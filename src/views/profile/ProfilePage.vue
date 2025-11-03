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

      <!--Ion Modal that shows the complaint details-->
      <ion-modal class="" :is-open="showModal" @didDismiss="showModal = false" :initialBreakpoint="0.8" :breakpoints="[0, 0.6, 0.8, 1]" >
        <ion-header class="ion-no-border">
        </ion-header>
        <ion-content class="modal ion-padding-top ion-padding">
          <div class="flex justify-center items-center w-full"> <article class="flex justify-center items-center p-1 w-12 h-12 bg-rose-600 rounded-full"><v-icon name="bi-trash-fill" scale="1.8" class="text-white" /></article></div>
         <h2 class="!text-2xl text-center font-plus-jakarta-sans !font-bold text-slate-600">¿Borrar comentario?</h2>
          
         <section class="flex flex-col gap-2 justify-center items-center font-plus-jakarta-sans">
          <h4 class="italic text-center">"{{ complaint.title }}"</h4>
          <img v-if="complaint.image" :src="complaint.image" class="w-6/12 rounded-2xl" alt="user complaint image">
          <ion-text>
            {{ complaint.content }}
          </ion-text>
          <small class="text-slate-600">Creado el: {{ dateFormated(complaint.createdAt) }}</small>
          
          <div class="w-full ion-margin-top">
            <ion-button @click="showModal = false" size="large" expand="full" shape="round" style="text-transform: none;" class="font-medium text-slate-900 font-poppins cancel modal ion-margin-bottom">
              Cancelar
            </ion-button>
            <ion-button @click="handleDeletion(complaint.docRef)" size="large" expand="full" shape="round" style="text-transform: none;" class="font-bold font-poppins delete modal">
              Borrar
            </ion-button>
          </div>
         </section>
        </ion-content>
      </ion-modal>

      <section class="flex justify-center font-plus-jakarta-sans">
        <div class="flex flex-col px-6 pt-6 w-full min-h-screen">
          <!-- Profile Section -->
          <div class="flex flex-col items-center mb-8">
            <h4 class="text-xl font-semibold text-slate-800">!Bienvenido {{ userStore.getName.split(' ').slice(0,1).join() }}!</h4>
          </div>

          <!-- Claims Section -->
          <div class="mb-8">
            <h3 class="text-lg font-inter  text-rose-800 mb-4 !font-black">
              Mis Reclamos Publicados
            </h3>

            <div v-show="isLoading" class="flex flex-col gap-2 justify-center items-center mt-4">
              <ion-spinner name="bubbles" color="danger"></ion-spinner>
              <ion-text class="text-slate-600 font-plus-jakarta-sans">Obteniendo sus
                reclamos...</ion-text>
            </div>
            <ion-list v-if="userComplaints.length > 0">
              <ion-item-sliding v-for="complaint in userComplaints" :key="complaint.id || complaint.title" class="mb-2">
                <!-- OPCIONES IZQUIERDA -->
                <ion-item-options side="start">
                  <ion-item-option color="primary">
                    <ion-icon :icon="eyeOutline" slot="icon-only"></ion-icon>
                  </ion-item-option>
                </ion-item-options>

                <!-- ITEM PRINCIPAL -->
                <ion-item>
                  <div slot="start"
                    class="flex justify-center items-center p-2 mr-1.5 w-16 h-full bg-rose-100 rounded-sm">
                    <img v-if="complaint.image" :src="complaint.image" class="rounded-xs" alt="" />
                    <v-icon v-else name="io-document-text" class="text-rose-700" scale="1.6"></v-icon>
                  </div>

                  <ion-label>
                    <div class="flex flex-col gap-1 mb-4">
                      <ion-text class="font-medium font-plus-jakarta-sans text-red-950">
                        {{ complaint.title }}
                      </ion-text>

                      <ion-text class="text-sm font-plus-jakarta-sans">
                        Categoría:
                        <span class="px-2 py-0.5 text-sm text-rose-900 bg-rose-100 rounded-full">Transporte</span>
                      </ion-text>

                      <ion-text class="text-sm">{{ dateFormated(complaint.createdAt) }}</ion-text>
                    </div>
                  </ion-label>
                </ion-item>

                <!-- OPCIONES DERECHA -->
                <ion-item-options side="end">
                  <ion-item-option @click.stop="handleComplaintData(complaint)" color="danger" expandable>
                    <ion-icon :icon="trashBin" slot="icon-only"></ion-icon>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonIcon, IonButtons, IonBackButton, IonList, IonItemSliding, IonText, IonButton, onIonViewDidEnter, onIonViewDidLeave, IonSpinner, IonItemOptions, IonItemOption, IonModal, IonLabel } from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { collection, deleteDoc, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { ref } from 'vue';
import { IComplaint } from '@/interfaces/IComplaint';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { eyeOutline, trashBin, trashBinOutline, trashSharp } from 'ionicons/icons';
import { MdSnowshoeingOutlined } from 'oh-vue-icons/icons';

const userStore = useUserStore();

const db = getFirestore();

const complaintsCollection = collection(db, 'complaints');

const userComplaints = ref<IComplaint[]>([])

const isLoading = ref(false);
const qGetUserComplaints = query(complaintsCollection, where('userUid', '==', userStore.getUserID));
const getUserComplaints = () => {
  isLoading.value = true;
  getDocs(qGetUserComplaints).then((snapshot) => {
    let complaint:IComplaint;
    snapshot.forEach(doc => {
      complaint = {
        docRef:doc.ref,
        ...doc.data()
      }
      userComplaints.value.push(complaint)
    })
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    isLoading.value = false;
  })
}

onIonViewDidEnter(() => {
  console.log('Entered Profile')
  getUserComplaints();
})

onIonViewDidLeave(() => {
  console.log('Leaved Profile')
})

const showModal = ref(false);
const complaint = ref({})

//Handle the complaint data to show the modal 
const handleComplaintData = (complaintData :IComplaint) => {
  showModal.value = true;
  try {
  complaint.value.title = complaintData.title;
  complaint.value.content = complaintData.content;
  complaint.value.createdAt = complaintData.createdAt;
  complaint.value.image = complaintData.image;    
  complaint.value.docRef = complaintData.docRef;
  console.log(complaint.value)
  } catch (error) {
    console.log(error)  
  }
}

const dateFormated = (date:Timestamp) => {
  return new Date(date.seconds * 1000).toLocaleString('es-MX', {
    day:'numeric',
    month:'long',
    year:'numeric'
  })
}


const handleDeletion = (complaintDocRef:any):void => {
  showModal.value = false;
  isLoading.value = true;
  deleteDoc(complaintDocRef).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  }).finally(()=>{
    isLoading.value =false;
    userComplaints.value =[];
    getUserComplaints();
  })
}
</script>

<style scoped>
  ion-modal {
    --border-radius: 46px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  ion-modal::part(backdrop) {
    background: rgb(0, 0, 0);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: rgb(255, 255, 255);
    --color: white;
  }
  ion-modal{
    --background: rgb(255, 255, 255);
  }
  ion-content.modal{
    --background: rgb(255, 255, 255);
  }
  ion-button.delete{
    --background: #EF4444;
    --box-shadow: none;
    --padding-top:5px;
    --padding-bottom:5px;
  }
  ion-button.cancel{
    --background: #E6E7EB;
      --box-shadow: none;
  }
</style>