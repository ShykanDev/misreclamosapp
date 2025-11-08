<template>
  <!-- Answer Comment section -->
<div
  v-if="showAnswerComment"
  class="p-4 mx-auto w-full text-gray-600 bg-white rounded-lg border border-gray-100 shadow-sm sm:p-5"
  :class="{ 'bg-blue-50': isCompany, 'bg-gray-50': !isCompany }"
>
  <h3 class="flex gap-2 items-center mb-3 text-lg font-semibold text-gray-800">
    <v-icon name="bi-reply-all-fill" scale="1.1" /> 
  </h3>
    <ion-loading :is-open="isLoading" :duration="3000" message="Enviando respuesta..."> </ion-loading>
  <form @submit.prevent class="space-y-4">
    <div>
      <label for="answer" class="block mb-1.5 text-sm font-medium text-gray-700">
        Respondiendo a {{ props.answeringToName }}
        <span v-if="isCompany" class="text-xs italic text-blue-600">
          (en representación de la empresa/servicio)
        </span>
      </label>
      <ion-textarea
        label="Respuesta"
        id="answer"
        v-model="answer"
        :auto-grow="true"
        label-placement="floating"
        class="px-4 py-2.5 w-full text-sm placeholder-gray-400 text-gray-800 bg-white rounded-lg border-2 border-rose-100 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        color="danger"
        placeholder="Escriba aquí su respuesta..."
      ></ion-textarea>
    </div>

    <div class="flex flex-col gap-3">
      <label
        v-show="!imageSelected"
        class="inline-flex gap-2 justify-center items-center px-4 py-2 text-sm text-white bg-rose-700 rounded-lg transition-colors cursor-pointer hover:bg-rose-800"
      >
        <svg
          aria-hidden="true"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
        >
          <path
            stroke-width="2"
            stroke="#ffffff"
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#ffffff"
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
          ></path>
        </svg>
        Agregar imagen
        <input type="file" accept="image/*" @change="handleFileInputChange" class="hidden" />
      </label>

      <div v-if="imageSelected" class="relative">
        <img
          :src="imageSelected"
          :key="imageSelected"
          class="w-full rounded-lg border-2 border-gray-300 border-dashed"
          alt="Imagen seleccionada"
        />
        <button
          @click="removeImage"
          type="button"
          class="absolute -top-2 -right-2 !px-2.5 !py-1 text-xs text-white bg-red-600 !rounded-full transition-colors hover:bg-red-800"
        >
          ×
        </button>
      </div>

      <div class="flex gap-2 items-center">
        <CheckboxComponent
          @callSetIsCompany="setIsCompany"
          @click="setIsCompany(!isCompany)"
          :checked="isCompany"
        />
        <label class="text-sm font-medium text-gray-700 cursor-pointer">
          ¿Es usted la empresa que responde?
        </label>
      </div>
      <p v-if="isCompany" class="text-xs italic text-blue-600">
        Su comentario será marcado en representación de la empresa
      </p>
    </div>

    <small class="block mt-2 text-xs text-gray-400">
      ⓘ Los comentarios publicados son responsabilidad exclusiva de quien los emite. Nos reservamos el derecho de moderar, eliminar o reportar aquellos que infrinjan nuestras políticas o leyes aplicables.
    </small>

    <div class="flex justify-center py-4">
      <DotLottieVue
        v-if="showLottieError"
        style="height: 80px; width: 80px"
        autoplay
        loop
        src="https://lottie.host/89bd3582-e658-4f35-b821-103912eec036/hKwlxD5lVu.lottie"
      />
    </div>

    <button
      v-if="!showLottie"
      :disabled="isLoading"
      @click="answerComment"
      type="submit"
      class="!px-5 !py-2.5 !w-full !text-sm !font-semibold !text-white !rounded-lg !shadow-sm !transition-all !focus:outline-none !focus:ring-2 !focus:ring-offset-2 !focus:ring-blue-400"
      :class="{
        'bg-red-500 hover:bg-red-600': isLoading,
        'bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-md': !isLoading,
      }"
    >
      Enviar respuesta a {{ props.answeringToName }}
    </button>
  </form>
</div>

</template>

<script lang="ts" setup>
import type { IAnswer } from '@/interfaces/IComplaint'
import { auth as authMain } from '@/main'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { getFirestore, Timestamp, doc, arrayUnion, updateDoc } from 'firebase/firestore'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css' // For React, Vue and Svelte
import { ref } from 'vue'
import { IonTextarea, useIonRouter, IonLoading } from '@ionic/vue'
import imageCompression from 'browser-image-compression'
import { useHomeStore } from '@/stores/home'
import { useNotif } from '@/stores/notif'

//emmits
const emit = defineEmits(['callReload', 'callShowImage', 'callReloadStageTwo']);

//ui notifications
const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
  duration: 5000,
  dismissible: true,
})

//images values
const imageSelected = ref()
const imgFileInput = ref<HTMLInputElement | null>(null)
const imageFileValue = ref()
const handleFileInputChange = (e: Event) => { //handle image selection
  if (e.target) {
    console.log(e.target.files[0])
    imageSelected.value = URL.createObjectURL(e.target.files[0])
    imageFileValue.value = e.target.files[0]
  }
}
const removeImage = () => imageSelected.value = '' //remove image selection
function toBase64(file: File) { //convert file to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

//image compression
const compressedImageBase64 = ref()

const compressImage = async () => { //compress image and convert to base64
  if (!imageFileValue.value) {
    notyf.error('No se seleccionó una imagen')
    return false
  }

  const imageFile = imageFileValue.value
  console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  }

  isLoading.value = true
  try {
    const compressedFile = await imageCompression(imageFile, options)
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob)
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`)
    compressedImageBase64.value = await toBase64(compressedFile)
    console.log('compressedImageBase64', compressedImageBase64.value)
    return true
  } catch (error: any) {
    console.log(error.message)
    return false
  } finally {
    isLoading.value = false

  }
}

//answers values
const showAnswerComment = ref(true)
const answer = ref('')

//Value that indicates if the answer is from a company based on checkbox click to set the answer as company
const isCompany = ref(false)

//function to set isCompany value
const setIsCompany = (value: boolean) => isCompany.value = value;
const callShowImageFromParent = () => emit('callShowImage', props.image);
//props
const props = defineProps({
  answeringToName: {
    type: String,
    default: 'Usuario',
  },
  answeringToUid: {
    type: String,
    default: 'Usuario',
  },
  docId: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
})



//firebase
const auth = authMain;
const db = getFirestore()

//function to get answer data from props and answer value
// 🔹 Devuelve la data del comentario
const getAnswerData = (imageBase64 = ''): IAnswer => ({
  uidTo: props.answeringToUid,
  answer: answer.value,
  date: Timestamp.now(),
  uidFrom: auth.currentUser?.uid || 'Not given',
  answeringToName: props.answeringToName,
  answeringFromName: auth.currentUser?.displayName || 'Not given',
  isCompany: isCompany.value,
  image: imageBase64, // ✅ Se asigna base64 si existe
})


//loading states
const isLoading = ref(false)
const showLottie = ref(false)
const showLottieError = ref(false)

//Pinia store for home
const storeHome = useHomeStore();

const notif = useNotif();

//function to answer comment and include image if selected
const answerComment = async () => {
  console.log(`Answering to ${props.answeringToName} with uid ${props.answeringToUid} and docId ${props.docId} category ${props.category}`)
  if (!auth.currentUser) {
    notif.error('Error', 'Debe iniciar sesión para responder')
    return
  }

  if (!answer.value) {
    notif.error('Hay un error', 'Debe escribir una respuesta')
    return
  }

  isLoading.value = true
  if (imageSelected.value) {
    const compressedImage = await compressImage()
    if (!compressedImage) {
      notif.error('Error', 'Error al comprimir la imagen')
      return
    }
    getAnswerData(compressedImageBase64.value).image = compressedImageBase64.value;
  }
  const docRef = doc(db, `complaints/${props.docId}`)
  updateDoc(docRef, {
  [`answers.${auth.currentUser?.uid}`]: arrayUnion(
    getAnswerData(compressedImageBase64.value)
  )
}).then(() => {
      notif.success('Exito', 'Se ha enviado su respuesta')
      answer.value = '' // limpiar el input
      isLoading.value = false
      setTimeout(() => {
        emit('callReload')
        callReloadStageTwo()
      }, 1000)
      storeHome.setCategorySelected(props. category)
    })
    .catch((error) => {
      console.error('Error al enviar la respuesta', error)
      notif.error('Error', `Error al enviar la respuesta: ${error.message}`)
      showLottieError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

const callReloadStageTwo = () => emit('callReloadStageTwo');

</script>

<style scoped>
/* From Uiverse.io by SpatexDEV */
.custom-file-upload {
  border: none;
  display: flex;
  padding: 0.75rem 1.5rem;
  background-color: #b3b4b6;
  color: #ffffff;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  user-select: none;
  gap: 0.75rem;
  box-shadow:
    0 4px 6px -1px #488aec31,
    0 2px 4px -1px #488aec17;
  transition: all 0.6s ease;
}

.custom-file-upload:hover {
  box-shadow:
    0 10px 15px -3px #488aec4f,
    0 4px 6px -2px #488aec17;
}

.custom-file-upload:focus,
.custom-file-upload:active {
  opacity: 0.85;
  box-shadow: none;
}

.custom-file-upload svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
