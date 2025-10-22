<template>


  <!--Initial Page-->
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
       <ion-buttons slot="start">
  <ion-button @click="openMenu">
    <v-icon name="oi-three-bars" class="text-red-700" />
  </ion-button>
</ion-buttons>


        <div
          class="flex absolute inset-0 flex-col justify-center items-center w-full h-full text-rose-800 font-poppins">
          <small>Categoria:</small>
          <article :key="selectedCategory" class="flex gap-2 items-center">
            <p class="animate-fade-left">{{ selectedCategory == '' ? 'Comentarios generales' : selectedCategory }}</p>
            <v-icon :name="fullCategories.find(e => e.name === selectedCategory)?.icon"
              class="text-rose-700 animate-fade-left animate-delay-[.18s] animate-duration-[.8s]" />
          </article>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding main-content">
      <div v-if="loading" class="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center">
        <ion-spinner name="lines-sharp" />
      </div>
      <div v-if="complaints.length > 0">
        <ComplaintCard v-for="complaint in complaints" :key="complaint.id" :title="complaint.title"
          :category="complaint.category" :content="complaint.content" :createdAt="complaint.createdAt"
          :image="complaint.image" :service="complaint.service" :userName="complaint.userName"
          :userId="complaint.userId" :answers="complaint.answers" />
      </div>

      <div v-if="loading === false && complaints.length === 0"
        class="flex flex-col gap-2 justify-center items-center h-full">
        <article
          class="flex flex-col gap-2 justify-center items-center p-4 bg-white rounded-3xl min-h-[40dvh] animate-fade">
          <h4 class="text-rose-800 font-poppins">!Aún no hay reclamos aquí!</h4>
          <DotLottieVue class="w-56" autoplay loop
            src="https://lottie.host/102e5586-f640-45d6-adad-13ed24c1d827/76XQjzn4Ry.lottie" />
          <ion-button router-link="/create" class="complaint font-alexandria" style="text-transform: none;">Crear Nuevo
            Reclamo</ion-button>
        </article>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSpinner, menuController, IonButton, IonMenu, } from '@ionic/vue';
import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import ComplaintCard from '@/components/Content/ComplaintCard.vue';
import 'animate.css';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
//Full categories info  
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
    icon: 'io-ticket-sharp',
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
    icon: 'ri-more-fill',
    examples: ['Hospital Veterinario UNAM', 'Mascotitas', 'Petco', 'Veterinaria San Francisco'],
  },
]


const closeFirstMenu = async () => await menuController.close('first-menu');

//Loading variable
const loading = ref(false)

//Selected category 
const selectedCategory = ref('Vinos o Vinaterías')

//Firebase utils
const auth = getAuth();
const db = getFirestore();
const complaintsCollection = collection(db, 'complaints')

//Complaints variable that stores the complaints once they are fetched
const complaints = ref([])

//Function that fetches the specific complaints (fetches the complaints that match the category from the database and stores them in the complaints variable)
const getSpecificComplaint = (category: string) => {
  loading.value = true
  selectedCategory.value = category
  const queryComplaints = query(complaintsCollection, where('category', '==', selectedCategory.value), orderBy('createdAt', 'desc'))
  complaints.value = []
  closeFirstMenu()
  getDocs(queryComplaints).then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    querySnapshot.forEach((doc) => {
      complaints.value.push(doc.data())
    });
  }).finally(() => {
    loading.value = false
    closeFirstMenu()
  })
}

const openMenu = async () => {
  await menuController.open('first-menu');
};


</script>

<style scoped>
ion-toolbar.categories {
  --background: #ffebec;
}

ion-content.categories {
  --background: #F3E7E8;
}

ion-item {
  --background: #fffcfc;
  --background-activated: #1e40af;
  /* Color al hacer clic */
  --background-hover: #1e40af;
  /* Color al pasar el mouse */
}

ion-content.main-content {
  --background: #F3E7E8;
}

ion-button.complaint {
  --background: #af1e1e;
  --color: white;
  --border-radius: 10px;
}
</style>