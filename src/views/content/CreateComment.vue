<template>
  <ion-page>  
    <ion-header>    
      <ion-toolbar>
        <ion-title>Crear Comentario</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageCompression from 'browser-image-compression'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

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
const category = route.params.category || ''


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
  if (e.target) {
    imageSelected.value = URL.createObjectURL(e.target.files[0])
    imageFileValue.value = e.target.files[0]
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

//Verify fields before sending to Firestore
const verifyFields = () => {
  if (!complaintObject.category) {
    notyf.error('Debe seleccionar una categoría')
    return false
  }
  if (!complaintObject.title) {
    notyf.error('Debe ingresar un título')
    return false
  }
  if (!complaintObject.content) {
    notyf.error('Debe ingresar una descripción')
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

</script>


<style scoped>
.bgStyle {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%236c0098' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
}

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
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
</style>
