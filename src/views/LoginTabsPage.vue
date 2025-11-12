  <template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button class="login-step" v-if="!loginStore.getIsUserLoggedIn" tab="tab1" href="/tabs/login">
            <ion-icon aria-hidden="true" :icon="logInOutline" />
            <ion-label class="font-poppins">Ingresar</ion-label>
          </ion-tab-button>

          <ion-tab-button class="register-step" v-if="!loginStore.getIsUserLoggedIn" tab="register" href="/tabs/register">
            <ion-icon aria-hidden="true" :icon="personAddOutline" />
            <ion-label class="font-poppins">Registrarse</ion-label>
          </ion-tab-button>

          <ion-tab-button class="home-step" tab="home" href="/tabs/home">
            <ion-icon aria-hidden="true" :icon="homeOutline" />
            <ion-label class="font-poppins">Inicio</ion-label>
          </ion-tab-button>

          <ion-tab-button class="create-step" tab="create" href="/tabs/create">
            <ion-icon aria-hidden="true" :icon="addCircleOutline" />
            <ion-label class="font-poppins">Crear</ion-label>
          </ion-tab-button>

          <ion-tab-button v-if="loginStore.getIsUserLoggedIn" tab="profile" href="/tabs/profile">
            <ion-icon aria-hidden="true" :icon="personCircleOutline" />
            <ion-label class="font-poppins">Mi cuenta</ion-label>
          </ion-tab-button>


        </ion-tab-bar>
        
      </ion-tabs>
    </ion-page>
  </template>

  <script setup lang="ts">
  import { useLogginStore } from '@/stores/loggin';
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, onIonViewDidEnter } from '@ionic/vue';
  import { addCircleOutline,  document,  homeOutline, logInOutline, personAddOutline, personCircleOutline} from 'ionicons/icons';
  import { driver } from "driver.js";
  import { useRouter } from 'vue-router';
  import { watch } from 'vue';
  import { useTutorialStore } from '@/stores/tutorial';

  const loginStore = useLogginStore();

  const router = useRouter();


  let driverObj: any // 👈 ahora es global dentro del script setup

  const tutorialStore = useTutorialStore();




  watch(() => router.currentRoute.value.path, () => {
    if (router.currentRoute.value.path === '/tabs/home' && tutorialStore.getTutorialCompleted === false ){
      tutorialStore.setPageActive('home')
      console.log('Page Home is active and pinia values have been updated')
    } else {
      tutorialStore.setPageActive('')
      console.log('Page Home is not active and pinia values have been updated')
    }
    if (tutorialStore.getPageActive === 'home' ) {
      setTimeout(() => {
        console.log('Page Home is active and pinia values have been updated')
        driverObj = driver({
          animate: true,
          showProgress: true,
          showButtons: ['next', 'previous', 'close'],
        nextBtnText: 'Siguiente →',
        prevBtnText: '← Anterior',
        doneBtnText: 'Finalizar',
      steps: [ { element: '.login-step', popover: { title: 'Botón de inicio de sesión ', description: 'Este boton lo llevará a la pantalla de inicio de sesión, esto será necesario si usted quiere crear un reclamo o responder a uno', side: "top", align: 'center' }}, { element: '.register-step', popover: { title: 'Botón de registro', description: 'Este boton lo llevará a la pantalla de registro, aquí podrá crear su cuenta de manera gratuita, le servirá para crear y responder a reclamos', side: "bottom", align: 'center' }}, { element: '.home-step', popover: { title: 'Botón de inicio', description: 'Este boton lo llevará a la pantalla de inicio, aquí podrá ver todos los reclamos que existan para la categoría que usted seleccionó en el menú', side: "bottom", align: 'center' }}, { element: '.create-step', popover: { title: 'Botón de crear', description: 'Este boton lo llevará a la pantalla para crear un nuevo reclamo, aqui podrá crear un reclamo de distintas categorías ', side: "bottom", align: 'center' }}, ],
        onNextClick: (e,step) => {
          driverObj.moveNext()
          console.log(step.popover?.progressText)
          if(step.popover?.progressText == '4 of 4') {
          tutorialStore.setPageActive('HomeMenu')
          }
        },
        onCloseClick: () => {
          tutorialStore.setPageActive('HomeMenu')
          console.log('Close')
        },
      })
      driverObj.drive()
      }, 500)
    }
  })

  </script>

  <style scoped>
  ion-tab-bar {
    --background: #f0f0f0; /* Background color of the tab bar */
    --border-top: none; /* Remove top border */
    --height: 60px; /* Height of the tab bar */
  }

  ion-tab-button {
    --background-focused: #e0e0e0; /* Background when button is focused */
    --color: #888; /* Default text/icon color */
    --color-selected: var(--ion-color-danger); /* Color when selected */
    --padding-end: 10px; /* Padding on the right */
    --padding-start: 10px; /* Padding on the left */
  }

  /* Asegura que el tour esté por encima de Ionic */
  .driver-popover,
  .driver-overlay,
  .driver-highlighted-element {
    z-index: 99999 !important;
  }

  /* Corrige si el popover queda tapado por el tab bar */
  .driver-popover {
    bottom: auto !important;
  }

  /* Opcional: mejora visual para estilo móvil */
  .driver-popover {
    border-radius: 16px;
    font-family: 'Poppins', sans-serif;
    max-width: 280px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  }

  </style>