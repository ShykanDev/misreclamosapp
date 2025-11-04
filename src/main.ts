import { createApp } from 'vue'
import App from './App.vue'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import router from './router';
import './style.css';
import { IonicVue } from '@ionic/vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// Create Pinia instance and register the plugin
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

//Firebase 
import { initializeAuth, getAuth, setPersistence, indexedDBLocalPersistence,
Auth } from "firebase/auth";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, OiDiffAdded,
  FaShoppingBasket,
  FaWineBottle,
  FaBeer,
  FaBreadSlice,
  FaShieldAlt,
  FaCar,
  FaUtensils,
  FaHeart,
  FaGasPump,
  FaFutbol,
  FaGraduationCap,
  FaPills,
  FaLandmark,
  FaBed,
  FaGem,
  FaGamepad,
  FaShoppingCart,
  FaIdCard,
  FaStickyNote,
  FaTruck,
  FaUser,
  FaBoxOpen,
  FaChurch,
  FaConciergeBell,
  FaFilm,
  FaCode,
  FaCartPlus,
  FaMicrochip,
  FaPhoneAlt,
  FaStore,
  FaBaby,
  FaBus,
  FaLeaf,
  MdEvent,
  IoTicketSharp,
  RiMoreFill,
  FaSoap,
  FaHospital,
  FaSpa,
  GiMilkCarton,
  GiElectricalResistance,
  GiClothes,
  BiBank2,
  MdBuildSharp,
  LaToolsSolid,
  IoShareSocialSharp,
  IoPawSharp,
  MdTravelexploreSharp,
  OiThreeBars,
  HiSolidArrowSmLeft,
  MdCategoryRound,
FaRegularUser,
MdCloseOutlined,
BiReplyAllFill,
MdAddcircleoutline, 
MdPostadd,
BiArrowRightShort,
IoDocumentText,
MdDeleteforever,
MdRemoveredeyeRound,
BiTrashFill,
BiCheckCircleFill,
IoClose,
IoCloseCircle
}from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, OiDiffAdded,
  FaShoppingBasket,
  FaWineBottle,
  FaBeer,
  FaBreadSlice,
  FaShieldAlt,
  FaCar,
  FaUtensils,
  FaHeart,
  FaGasPump,
  FaFutbol,
  FaGraduationCap,
  FaPills,
  FaLandmark,
  FaBed,
  FaGem,
  FaGamepad,
  FaShoppingCart,
  FaIdCard,
  FaStickyNote,
  FaTruck,
  FaUser,
  FaBoxOpen,
  FaChurch,
  FaConciergeBell,
  FaFilm,
  FaCode,
  FaCartPlus,
  FaMicrochip,
  FaPhoneAlt,
  FaStore,
  FaBaby,
  FaBus,
  FaSoap,
  FaHospital,
  FaSpa,
  FaLeaf,
  MdEvent,
  IoTicketSharp,
  RiMoreFill,
  GiMilkCarton,
  OiThreeBars,
  GiElectricalResistance,
  GiClothes,
  BiBank2,
  MdBuildSharp,
  LaToolsSolid,
  IoShareSocialSharp,
  IoPawSharp,
  MdTravelexploreSharp,
  HiSolidArrowSmLeft,
  MdCategoryRound,
  FaRegularUser,
  MdCloseOutlined,
  BiReplyAllFill,
  MdAddcircleoutline,
  MdPostadd,
  BiArrowRightShort,
  IoDocumentText,
  MdDeleteforever,
  MdRemoveredeyeRound,
  BiTrashFill,
  BiCheckCircleFill,
  IoClose,
  IoCloseCircle
);

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createPinia } from 'pinia';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmtsTYySDPpIQ6ASIn0N9LHFqUwm-MLLo",
  authDomain: "mis-reclamos.firebaseapp.com",
  projectId: "mis-reclamos",
  storageBucket: "mis-reclamos.firebasestorage.app",
  messagingSenderId: "3807456076",
  appId: "1:3807456076:web:98c2b974bb0fedec217de9",
  measurementId: "G-D8P0D16LZ9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

import { isPlatform } from "@ionic/vue";
import { Firestore, getFirestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore';
let auth: Auth;
//Add firestore if fetch data on ios shows an error
//let db: Firestore;
if (isPlatform('hybrid')) {
auth = initializeAuth(firebaseApp, { persistence: indexedDBLocalPersistence });
//db = initializeFirestore(firebaseApp, { localCache: persistentLocalCache() });
} else {
auth = getAuth(firebaseApp);
setPersistence(auth, indexedDBLocalPersistence);
}

export { auth };
const app = createApp(App)
  .component("v-icon", OhVueIcon)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(VueViewer)

router.isReady().then(() => {
  app.mount('#app');
});
