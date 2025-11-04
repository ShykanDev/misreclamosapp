<template>
  <ion-page>
    <ion-header class="ion-no-border">
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
          
          <article class="p-6 bg-white rounded-lg border-l-4 border-red-500 shadow-md md:p-8 dark:bg-gray-800 dark:border-red-600">
    <div class="flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-8 h-8 text-red-500 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.86 18c-.37.6-.37 1.35 0 1.95.37.6.99.95 1.7.95h16.88c.7 0 1.32-.35 1.7-.95.37-.6.37-1.35 0-1.95L13.71 3.86c-.37-.6-.99-.95-1.7-.95s-1.33.35-1.7.95z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Prevención de Abuso y Eliminación de Mensajes
        </h2>
    </div>

    <div class="mt-4 text-gray-700 dark:text-gray-300">
        <p class="mb-4">
            Para mantener una plataforma saludable y prevenir abusos graves, como la difusión de  <span class="font-bold text-rose-800">información engañosa</span> o <span class="font-bold text-rose-800">spam persistente</span>, la eliminación de mensajes está disponible.
            Sin embargo, este proceso se gestiona para garantizar la rendición de cuentas y evitar el uso indebido de la función de eliminación.
        </p>

        <h3 class="mt-6 mb-3 text-xl font-semibold text-red-500 dark:text-red-400">
            ⚠️ Cómo Solicitar la Eliminación
        </h3>
        <ul class="pl-5 space-y-3 list-disc">
            <li>
                <span class="font-bold">Paso Obligatorio:</span> Las solicitudes de eliminación deben enviarse <span class="font-bold">por correo electrónico</span> a nuestro equipo de soporte. Esto es necesario para su revisión y verificación.
            </li>
            <li>
                <span class="font-bold">Dirección de Correo Electrónico:</span> Por favor, envíe su solicitud a: <a href="mailto:informes@grupochimex.com" class="font-medium text-red-600 underline hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">informes@grupochimex.com</a>
            </li>
            <li>
                <span class="font-bold">Información Requerida:</span> Su correo electrónico debe incluir los siguientes detalles para que podamos localizar el mensaje y evaluar la reclamación:
                <ul class="pl-4 mt-1 space-y-1 text-sm list-circle">
                    <li>El <span class="font-bold">Nombre de Usuario</span></li>
                    <li>El <span class="font-bold">Contenido Exacto</span> del mensaje.</li>
                    <li>La <span class="font-bold">Fecha y Hora</span> (o una estimación aproximada) en que se envió el mensaje.</li>
                    <li>Una <span class="font-bold">Razón Clara para la Eliminación</span> (por ejemplo, "<span class='font-bold'>Datos Ingresados Incorrectamente</span>", "<span class='font-bold'>Retirada de un Reclamo/Petición</span>", "<span class='font-bold'>Información Obsoleta</span>").</li>
                </ul>
            </li>
        </ul>

        <p class="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Las solicitudes se revisan en el orden en que se reciben. Solo se eliminarán los mensajes que se considere que infringen nuestras políticas o sea una razón con fines legítimos.
        </p>
    </div>
</article>

          <div class="w-full ion-margin-top">
            <ion-button @click="showModal = false" size="large" expand="full" shape="round" style="text-transform: none;" class="font-medium text-slate-900 font-poppins cancel modal ion-margin-bottom">
              Cancelar
            </ion-button>
            <ion-button @click="handleDeletion(complaint.docRef)" size="large" expand="full" shape="round" style="text-transform: none;" class="font-bold font-poppins delete modal">
              Enviar Correo
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
              <p class="text-base text-[#0A0A0A]">Cambiar contraseña</p>
              <i class="fa-solid fa-chevron-right text-[#0A0A0A] text-sm"></i>
            </div>

            <ion-button @click="logOut" color="danger" shape="round">
              <ion-icon :icon="logOutOutline" class="mr-2" ></ion-icon>
               Cerrar Sesión
            </ion-button>
          </div>
        </div>
      </section>


    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonIcon, IonButtons, IonBackButton, IonList, IonItemSliding, IonText, IonButton, onIonViewDidEnter, onIonViewDidLeave, IonSpinner, IonItemOptions, IonItemOption, IonModal, IonLabel, useIonRouter } from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { collection, deleteDoc, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { ref } from 'vue';
import { IComplaint } from '@/interfaces/IComplaint';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { eyeOutline, logOutOutline, trashBin, trashBinOutline, trashSharp } from 'ionicons/icons';
import { MdSnowshoeingOutlined } from 'oh-vue-icons/icons';
import { auth } from '@/main';
import { signOut } from 'firebase/auth';
import { useNotif } from '@/stores/notif';

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
  userComplaints.value = []
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

const notifStore = useNotif();
const ionRouter = useIonRouter();
const authUser = auth;
const logOut  = () => {
  signOut(authUser).then(res => {
  notifStore.success('Sesión terminada', 'Su sesión ha sido cerrada correctamente')
  console.log(res);
    ionRouter.navigate('/tabs/login','root', 'push' )
  }).catch(err=> {
    notifStore.error('Error al cerrar sesión', 'Hubo un error al intentar cerrar sesión, intente de nuevo'+ err)
  }
  )
}
</script>

<style scoped>
ion-toolbar{
    --background: white !important;

}
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