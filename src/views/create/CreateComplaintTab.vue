<template>
<ion-page>
<ion-header class="ion-no-border">
  <ion-toolbar>
    <ion-buttons slot="start">
<ion-back-button defaultHref="/tabs/home" text="Volver" style="text-transform: none;" class="text-red-700"></ion-back-button>
    </ion-buttons>
    <ion-title class="absolute inset-0 top-1/2 font-semibold text-center text-rose-700 transform -translate-y-1/2 font-poppins">Añadir Reclamo</ion-title>
  </ion-toolbar>
</ion-header>

  <!-- Loading Spinner -->
  <ion-loading
    :is-open="loading"
    message="Cargando..."
    spinner="crescent"
    css-class="custom-loading"
  ></ion-loading>

  <ion-content class="ion-padding font-plus-jakarta-sans main">
    <!-- Title -->
    <ion-text color="dark">
      <h2 class="mb-2 !text-4xl !font-bold text-left !text-rose-950">
        Añadir un nuevo reclamo para la categoría
        <ion-text color="danger" class="flex gap-2 items-center">{{ useCreateStore().getCategorySelected ?? 'Undefined'}} <v-icon :name="fullCategories.find(e => e.name === useCreateStore().getCategorySelected)?.icon ?? 'ri-more-fill' " class="text-red-600" scale="1.9"></v-icon></ion-text>
      </h2>
    </ion-text>

    <!-- Subtitle -->
    <ion-text color="medium" class="block mb-6">
      <p class="text-lg font-medium">
        Comparta sus experiencias y hagamos visible lo que necesita cambiar en servicios,
        empresas, productos y más.
      </p>
    </ion-text>

    <!-- Form -->
    <form class="space-y-6" @submit.prevent="sendComplaint">
      <!-- Title -->
      
        <ion-label position="stacked" color="custom" class="font-medium font-poppins" style="color: #4E0218;">Título</ion-label>
        <ion-input
          type="text"
          id="title"
          v-model="complaintObject.title"
          placeholder="Me prometieron que me daban un descuento de 20%"
          clear-input
          fill="outline"
          color="danger"
        ></ion-input>

      <!-- Service -->
      
        <ion-label position="stacked" color="custom" class="font-medium font-poppins" style="color: #4E0218;">Servicio</ion-label>
        <ion-input
          type="text"
          id="service"
          v-model="complaintObject.service"
          placeholder="Netflix, Amazon, Telcel, LALA, Bimbo etc."
          clear-input
          fill="outline"
          class="mt-1.5"
          color="danger"
        ></ion-input>

      <!-- Category -->
      
        <ion-label position="stacked" color="custom" class="font-medium font-poppins" style="color: #4E0218;">Categoría</ion-label>
        <ion-select
          id="category"
          interface="action-sheet"
          placeholder="Seleccione una categoría"
          fill="outline"
          class="mt-1.5"
          color="danger"
          v-model="complaintObject.category"
          @ion-change="useCreateStore().setCategorySelected(complaintObject.category)"
        >
          <ion-select-option
            v-for="category in fullCategories"
            :key="category.name"
            :value="category.name"

          >
          {{ category.name }}
          <v-icon :name="category.icon" class="mr-2"></v-icon>
          </ion-select-option>
        </ion-select>

      <!-- Description -->
      
        <ion-label position="stacked" color="custom" class="font-medium font-poppins" style="color: #4E0218;">Descripción</ion-label>
        <ion-textarea
          id="comment"
          :rows="5"
          v-model="complaintObject.content"
          placeholder="E.g: Todo comienza cuando la empresa (x) no cumple con sus promesas, debido a que..."
          auto-grow
          autofocus
          fill="outline"
          color="danger"
          class="mt-1.5"
          inputmode="text"
        ></ion-textarea>

      <!-- Button to choose new image -->
      <div class="flex justify-between items-center mb-4 w-full">
        <ion-button
          v-if="imageSelected"
          @click="renewImage"
          type="button"
          fill="solid"
          color="danger"
          class="text-sm font-medium"
        >
          Elegir Nueva imagen
        </ion-button>
      </div>

     <!-- Image upload with Ionic style -->
<ion-item v-show="!imageSelected" lines="full" class="ion-margin-vertical">
  <ion-button
    @click="imgFileInput?.click()"
    fill="clear"
    expand="block"
    class="ion-text-center"
    style="color: #4E0218;"
  >
    <ion-icon :icon="cloudUploadOutline" size="large" color="medium"></ion-icon>
    <ion-label color="medium" style="color: #4E0218;" class="ion-margin-start">Haga clic para subir una imagen</ion-label>
  </ion-button>
  <input
    @change="handleFileInputChange"
    accept="image/*"
    ref="imgFileInput"
    type="file"
    id="file"
    class="hidden"
  />
</ion-item>


      <!-- Image preview -->
      <div v-if="imageSelected" class="flex flex-col items-center mb-4">
        <img
          :src="imageSelected"
          :key="imageSelected"
          class="object-cover w-full rounded-3xl border-2 border-rose-200 border-dashed sm:w-sm animate-fade-up animate-once"
          alt="Imagen seleccionada"
        />
        <ion-button
          @click="removeImage"
          type="button"
          fill="solid"
          color="danger"
          class="mt-2 text-sm font-medium"
        >
          Quitar imagen
        </ion-button>
      </div>

      <!-- Reminder -->
     <ion-card   class="p-4 mb-4 bg-gray-50 border-l-4 border-red-500">
  <p class="text-sm font-medium text-gray-700">
    <strong class="font-bold text-gray-900">Importante:</strong>
    Al publicar un comentario, usted acepta que su contenido es de su exclusiva responsabilidad.
    Los comentarios son revisados por nuestro equipo para garantizar que cumplan con las
    <a href="#terminos-y-condiciones" class="font-medium text-blue-600 hover:underline">
      normas de la comunidad
    </a>.
    Evite lenguaje ofensivo, difamatorio o inapropiado.
  </p>
</ion-card>


      <!-- Send button -->
      <div class="flex justify-center">
        <ion-button
          type="submit"
          expand="block"
          class="ion-margin-vertical"
          color="danger"
          fill="outline"
        >
          Enviar reclamo
        </ion-button>
      </div>
    </form>
  </ion-content>
</ion-page>


</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonText,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonLoading,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  onIonViewDidEnter,
} from '@ionic/vue';

// Icono de Ionic para la subida de archivos

import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageCompression from 'browser-image-compression'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useHomeStore } from '@/stores/home';
import { cloudUploadOutline } from 'ionicons/icons';
import { useCreateStore } from '@/stores/create';
import { useNotif } from '@/stores/notif';

//Ui Values
const loading = ref(false)
const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
  duration: 5000,
  dismissible: true,
})

//Route & Route
const route = useRoute()
const router = useRouter()


//Categories array
const fullCategories = [
  {
    name: 'Abarrotes y Bebidas',
    icon: 'fa-shopping-basket',
    examples: ['La Europea', 'Super Salados', 'Bodega Aurrerá Express', 'Tiendas 3B'],
  },
  {
    name: 'Vinos o Vinaterías',
    icon: 'fa-wine-bottle',
    examples: ['La Vinoteca', 'Vinos Sin-Fronteras', 'Bodegas de Santo Tomás', 'Casa Madero'],
  },
  {
    name: 'Cerveza o Cervecerías',
    icon: 'fa-beer',
    examples: ['Cervecería Minerva', 'Cucapá', 'Tempranillo', 'Insurgente'],
  },
  {
    name: 'Leche y/o Sustitutos',
    icon: 'gi-milk-carton',
    examples: ['Lala', 'Alpura', 'Nestlé', 'Santa Clara'],
  },
  {
    name: 'Alimentos',
    icon: 'fa-bread-slice',
    examples: ['Bimbo', 'Gamesa', 'Sabritas', 'Marinela'],
  },
  { name: 'Aseguradoras', icon: 'fa-shield-alt', examples: ['GNP', 'AXA', 'MetLife', 'Zurich'] },
  {
    name: 'Automotriz',
    icon: 'fa-car',
    examples: ['Toyota', 'Nissan', 'Volkswagen', 'General Motors'],
  },
  { name: 'Bancos', icon: 'bi-bank2', examples: ['Banamex', 'BBVA', 'Santander', 'HSBC'] },
  {
    name: 'Banquetes',
    icon: 'fa-utensils',
    examples: ['Salones García', 'Banquetes El Globo', 'Salones Fiesta', 'Banquetes Laredo'],
  },
  {
    name: 'Beneficencias y Fundaciones',
    icon: 'fa-heart',
    examples: ['UNICEF México', 'Cruz Roja Mexicana', 'Teletón', 'Fondo UNO'],
  },
  { name: 'Combustibles', icon: 'fa-gas-pump', examples: ['Pemex', 'BP', 'Shell', 'Gulf'] },
  {
    name: 'Comida y Restaurantes',
    icon: 'fa-utensils',
    examples: ['Sanborns', 'Vips', 'Toks', "Applebee's"],
  },
  {
    name: 'Construcción y/o constructoras',
    icon: 'md-build-sharp',
    examples: ['Cemex', 'Home Depot', 'Comex', 'Grupo Lamosa'],
  },
  {
    name: 'Consumibles',
    icon: 'fa-soap',
    examples: ['Scotch-Brite', 'Cloralex', 'Fábrica de Jabón La Corona', 'Kimberly-Clark'],
  },
  {
    name: 'Deportes',
    icon: 'fa-futbol',
    examples: ['Sport City', 'Martí', 'Decathlon', 'Nike Store'],
  },
  {
    name: 'Educación',
    icon: 'fa-graduation-cap',
    examples: ['UNAM', 'Tec de Monterrey', 'UVM', 'UNITEC'],
  },
  {
    name: 'Electrónicos',
    icon: 'gi-electrical-resistance',
    examples: ['Liverpool Electrónicos', 'Best Buy', 'Sams Club', 'Coppel'],
  },
  {
    name: 'Energías Limpias',
    icon: 'fa-leaf',
    examples: ['Iberdrola', 'Enel Green Power', 'Acciona Energía', 'Engie'],
  },
  {
    name: 'Eventos',
    icon: 'fa-ticket-alt',
    examples: ['Ticketmaster', 'Boletia', 'Superboletos', 'Eticket'],
  },
  {
    name: 'Farmacéutico',
    icon: 'fa-pills',
    examples: [
      'Farmacias del Ahorro',
      'Farmacias Benavides',
      'Farmacias Similares',
      'Farmacias Guadalajara',
    ],
  },
  {
    name: 'Ferretería, llantas y automotriz',
    icon: 'la-tools-solid',
    examples: ['Home Depot', 'Lumen', 'Toks Ferretería', 'Llanticas'],
  },
  { name: 'Gobierno', icon: 'fa-landmark', examples: ['IMSS', 'INFONAVIT', 'SAT', 'SEP'] },
  {
    name: 'Hospedaje',
    icon: 'fa-bed',
    examples: ['Hoteles City Express', 'Fiesta Americana', 'Marriott', 'NH Collection'],
  },
  {
    name: 'Joyería y Relojes',
    icon: 'fa-gem',
    examples: ['Toussaint', 'Pandora', 'Swatch', 'Rolex'],
  },
  {
    name: 'Juguetes',
    icon: 'fa-gamepad',
    examples: ['Toys', 'Lego Store', 'KidZania', 'Juguetibici'],
  },
  {
    name: 'Tiendas en Línea',
    icon: 'fa-shopping-cart',
    examples: ['Mercado Libre', 'Amazon México', 'Linio', 'Liverpool en Línea'],
  },
  {
    name: 'Membresías',
    icon: 'fa-id-card',
    examples: ['Costco', "Sam's Club", 'Smart Fit', 'Cinépolis'],
  },
  {
    name: 'Papelería',
    icon: 'fa-sticky-note',
    examples: ['Office Depot', 'Office Max', 'Lumen', 'Plaza Papelera'],
  },
  {
    name: 'Paquetería y Correos',
    icon: 'fa-truck',
    examples: ['FedEx', 'DHL', 'Estafeta', 'Correos de México'],
  },
  {
    name: 'Persona Física',
    icon: 'fa-user',
    examples: ['Consultores Independientes', 'Freelancers', 'Artesanos', 'Profesionistas'],
  },
  {
    name: 'Productos Generales',
    icon: 'fa-box-open',
    examples: ['Walmart', 'Soriana', 'Chedraui', 'La Comer'],
  },
  {
    name: 'Redes Sociales',
    icon: 'io-share-social-sharp',
    examples: ['Facebook', 'Instagram', 'Twitter', 'TikTok'],
  },
  {
    name: 'Religión',
    icon: 'fa-church',
    examples: [
      'Arquidiócesis de México',
      'Iglesia Cristiana',
      'Sinagoga Histórica',
      'Mezquita Tarek Ibn Ziyad',
    ],
  },
  {
    name: 'Ropa, Calzado y Zapatos',
    icon: 'gi-clothes',
    examples: ['Zara', 'H&M', 'Liverpool', 'Suburbia'],
  },
  {
    name: 'Salud',
    icon: 'fa-hospital',
    examples: ['Hospital Ángeles', 'Médica Sur', 'ABC Medical Center', 'Star Médica'],
  },
  {
    name: 'Salud y Belleza Estética',
    icon: 'fa-spa',
    examples: ['Belcolade', 'Dermatológicos MD', 'Clínicas de Belleza', 'HairX'],
  },
  { name: 'Servicios', icon: 'fa-concierge-bell', examples: ['Uber', 'Didi', 'Rappi', 'Airbnb'] },
  {
    name: 'Servicios de Streaming',
    icon: 'fa-film',
    examples: ['Netflix', 'Disney+', 'Spotify', 'Amazon Prime Video'],
  },
  { name: 'Software', icon: 'fa-code', examples: ['Microsoft', 'Adobe', 'Autodesk', 'SAP'] },
  {
    name: 'Supermercados y Autoservicios',
    icon: 'fa-cart-plus',
    examples: ['Walmart', 'Soriana', 'Chedraui', 'Superama'],
  },
  { name: 'Tecnología', icon: 'fa-microchip', examples: ['Apple', 'Samsung', 'HP', 'Dell'] },
  {
    name: 'Telecomunicaciones',
    icon: 'fa-phone-alt',
    examples: ['Telmex', 'Movistar', 'AT&T', 'Unefon'],
  },
  {
    name: 'Tiendas Departamentales',
    icon: 'fa-store',
    examples: ['Liverpool', 'Palacio de Hierro', 'Sears', 'Suburbia'],
  },
  {
    name: 'Todo para bebé',
    icon: 'fa-baby',
    examples: ["Baby's Room", 'Bebé Store', 'Kids Corner', 'Toys R Us Bebé'],
  },
  { name: 'Transportes', icon: 'fa-bus', examples: ['ADO', 'ETN', 'Omnibus de México', 'Volaris'] },
  {
    name: 'Turismo',
    icon: 'md-travelexplore-sharp',
    examples: ['Cancún Travel', 'Best Day', 'Despegar', 'Kayak'],
  },
  {
    name: 'Veterinaria y Zootecnia',
    icon: 'io-paw-sharp',
    examples: ['Hospital Veterinario UNAM', 'Mascotitas', 'Petco', 'Veterinaria San Francisco'],
  },
  {
    name: 'Otro',
    icon: '',
    examples: ['Hospital Veterinario UNAM', 'Mascotitas', 'Petco', 'Veterinaria San Francisco'],
  },
]

// Images configuration for the form
const imageSelected = ref()
const imgFileInput = ref<HTMLInputElement | null>(null)
const imageFileValue = ref()
const compressedImageBase64 = ref()
const handleFileInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    imageSelected.value = URL.createObjectURL(target.files[0])
    imageFileValue.value = target.files[0]
  }
}
const removeImage = () => imageSelected.value = '';
const renewImage = () => imgFileInput.value?.click();




//Function to convert file to base64
function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file) // convierte automáticamente a Base64 con prefijo data:
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

//Firebase
const auth = getAuth()
const db = getFirestore()
const complaintsCollection = collection(db, 'complaints')

//Complaint object to send to Firestore
const complaintObject = reactive({
  userName: auth.currentUser?.displayName || 'Anonimo',
  title: '',
  category: '',
  content: '',
  image: '',
  userUid: '',
  createdAt: {},
  service: '',
})

//Async function to compress image and convert to base64
const compressImage = async () => {
  if (!imageFileValue.value) {
    notyf.error('No se seleccionó una imagen')
    return false
  }
  const imageFile = imageFileValue.value
  console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1100,
    useWebWorker: true,
  }
  loading.value = true
  try {
    const compressedFile = await imageCompression(imageFile, options)
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob)
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`)
    compressedImageBase64.value = await toBase64(compressedFile)
    console.log('compressedImageBase64', compressedImageBase64.value)
    complaintObject.image = compressedImageBase64.value
    return true
  } catch (error: any) {
    notyf.error(`Error al comprimir la imagen ${error}` )
    console.log(error.message)
    return false
  } finally {
    loading.value = false
  }
}

const notifStore = useNotif();
//Verify fields before sending to Firestore
const verifyFields = () => {
  if (!complaintObject.category) {
    notifStore.error('Error', 'Debe seleccionar una categoría')
    return false
  }
  if (!complaintObject.title) {
    notifStore.error('Error', 'Debe ingresar un título')
    return false
  }
  if (!complaintObject.content) {
    notifStore.error('Error', 'Debe ingresar una descripción')
    return false
  }
  return true
}

//Send complaint to Firestore
const sendComplaint = async () => {
  if (!verifyFields()) return
  if (imageSelected.value) {
    await compressImage()
    if (!compressedImageBase64.value) return
  }
  loading.value = true
  complaintObject.userUid = auth.currentUser?.uid || ''
  complaintObject.createdAt = Timestamp.now()
  addDoc(complaintsCollection, complaintObject)
    .then(() => {
      notyf.success('Reclamo enviado correctamente')
      complaintObject.category = ''
      complaintObject.content = ''
      complaintObject.title = ''
      complaintObject.image = ''
      complaintObject.service = ''
      complaintObject.userName = ''
      imageSelected.value = ''
      imageFileValue.value = null
      compressedImageBase64.value = ''
      loading.value = false
    })
    .catch((error) => {
      console.log('Error sending doc:', error)
      notyf.error('Error al enviar el reclamo: ' + error)
    })
    .finally(() => {
      console.log('finally')
      loading.value = false
    })
}

const storeHome = useHomeStore();

onIonViewDidEnter(() => {
  if (storeHome.getCategorySelected) {
    complaintObject.category = storeHome.getCategorySelected;
  }
});

</script>


<style scoped>

/* From Uiverse.io by Yaya12085 */
.custum-file-upload {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: rgb(200, 25, 25);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgb(128, 12, 12);
}

.custum-file-upload input {
  display: none;
}

ion-content.main{
  --background: #FDF8F8;
}

ion-label.custom{
  color: #fff !important ;
}

ion-input.custom{
  color: #fff !important ;
} 
</style>
