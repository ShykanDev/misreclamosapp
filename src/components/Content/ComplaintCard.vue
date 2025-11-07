<template>
  <ion-card class="rounded-3xl custom-card ion-padding">
    <ion-card-header>
      <div class="header-container">
        <div class="">
          <ion-card-title class="title">{{ title }}</ion-card-title>
          <div class="flex gap-2 items-center mt-2">
            <v-icon name="fa-regular-user" class="text-orange-800" />
            <ion-card-subtitle class="author">{{ userName }}</ion-card-subtitle>
          </div>
        </div>
        <div class="header-right">
          <div class="tag-container">
            <ion-badge class="bug-badge">{{ category }}</ion-badge>
            <v-icon name="md-category-round" class="text-orange-800" />
          </div>
          <p class="time">{{ createdAtToString() }}</p>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content class="ion-no-padding">
      <p class="description font-poppins">
        {{ finalContent }}
        <span v-if="isTruncated || !isTruncated && props.content.length > 249" @click="truncateContent()"
          class="italic cursor-pointer text-slate-500">{{ isTruncated ? 'Ver más...' : 'Ver menos' }}</span>
      </p>
      <div v-if="image" class="flex justify-center p-4">
        <img @click="callShowImageFromParent" :src="image" alt="Complaint screenshot"
          class="rounded-2xl cursor-pointer complaint-image w-xs md:w-sm" />
      </div>


      <div class="mt-2.5">
        <!-- Answers (Mobile Adaptation) -->
        <div v-if="props.answers"
          class="flex overflow-y-auto flex-col p-1 w-full max-h-96 rounded-2xl spacey bg-blue-50/20">
          <ion-card-title class="text-lg text-center underline font-poppins text-slate-700">Respuestas</ion-card-title>
          <div   v-for="(answer, index) in Object.values(props.answers).flat()" 
            :key="index"
            class="relative p-4 mb-3 w-full rounded-xl border-b shadow-sm transition-all duration-200 hover:shadow-md font-alexandria"
            :class="{
              'bg-blue-50/30 border-b-blue-500 border-b-2': answer.uidFrom == answer.uidTo,
              'bg-slate-50/30 border-b-slate-500 border-b-2': answer.uidFrom !== answer.uidTo && !answer.isCompany,
              'bg-green-50/30 border-b-green-500 border-b-2': answer.isCompany,
            }">

            <!-- Header: Avatar + Nombre + Etiquetas -->
            <div class="flex gap-2 items-center mb-2">
              <span v-if="answer.uidFrom"
                class="flex justify-center items-center w-7 h-7 text-xs font-semibold text-white rounded-full shrink-0"
                :class="{
                  'bg-blue-600': answer.uidFrom == answer.uidTo,
                  'bg-slate-500': answer.uidFrom !== answer.uidTo && !answer.isCompany,
                  'bg-green-600': answer.isCompany,
                }">
                {{ answer.answeringFromName.slice(0, 1).toUpperCase() }}
              </span>

              <span class="text-sm font-medium truncate max-w-[65%]">
                {{ answer.answeringFromName }}
              </span>

              <span class="ml-auto text-xs font-medium text-slate-500">
                {{ answer.date.toDate().toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }) }}
              </span>
            </div>

            <!-- Etiquetas: Autor/Empresa -->
            <div class="flex gap-1 items-center mb-1">
              <p v-if="answer.uidFrom === answer.uidTo"
                class="flex gap-1 items-center text-xs font-semibold text-blue-600">
                <v-icon name="ri-shield-user-fill" scale="0.9" /> Autor
              </p>
              <span v-if="answer.isCompany"
                class="flex gap-0.5 items-center ml-auto text-xs font-medium text-green-700">
                <v-icon name="la-user-tie-solid" scale="0.9" /> Empresa
              </span>
            </div>

            <!-- Contenido: Texto -->
            <p class="mt-1 text-sm leading-relaxed break-words text-slate-700">
              {{ answer.answer }}
            </p>

            <!-- Imagen (si existe) -->
            <div v-if="answer.image"
              class="overflow-hidden relative mt-3 max-w-full max-h-48 rounded-lg shadow-sm group">
              <img @click="callShowAnswerImageFromParent(answer.image)" :src="answer.image" alt="user image"
                class="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer" />

            </div>
          </div>
        </div>
        <!-- Action Button -->
        <div class="pt-4 border-t border-gray-100">
          <button @click="answerComment"
            class="flex gap-2 justify-center items-center !px-4 !py-2.5 text-sm font-medium !rounded-lg !shadow-sm transition-all duration-700 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="{ 'bg-white border-2 border-dashed border-red-500 text-red-700': !showReplyCard, 'bg-rose-600 hover:bg-rose-500 text-white': showReplyCard }">
            <v-icon v-show="!showReplyCard" name="bi-reply-all-fill" scale="1.2" />
            <v-icon v-show="showReplyCard" name="io-close-circle-sharp" class="text-white" scale="1.2" />
            {{ showReplyCard ? 'Cerrar' : 'Responder Comentario' }}
          </button>
        </div>
      </div>
      <AnswerComment class="ion-margin-top" @callReloadStageTwo="callReloadStageOne" v-if="showReplyCard"
        @callShowImage="callShowImageFromParent" @callClose="toggleReplyCard" :from-name="userName" :doc-id="docId"
        :answering-to-name="userName" :answering-to-uid="userUid" :category="category" />
    </ion-card-content>
  </ion-card>

</template>

<script lang="ts" setup>
import { IAnswer } from '@/interfaces/IComplaint';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonBadge, onIonViewDidEnter } from '@ionic/vue';
import { Timestamp } from 'firebase/firestore';
import { computed, onMounted, ref } from 'vue';
import AnswerComment from './AnswerComment.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Timestamp,
    required: true
  },
  image: {
    type: String,
    default: "https://placehold.co/80x80"
  },
  service: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  answers: {
    type: Array as () => IAnswer[],
    required: true
  },
  docId: {
    type: String,
    required: true
  }
})

const isTruncated = ref<null | boolean>(null);
const finalContent = ref()

const initialValidation = () => {
  if (props.content.length > 249) {
    finalContent.value = props.content.slice(0, 250);
    isTruncated.value = true;
  } else {
    finalContent.value = props.content;
    isTruncated.value = false;
  }
}
onIonViewDidEnter(() => initialValidation())
onMounted(() => initialValidation())
const truncateContent = (): void => {
  if (isTruncated.value) {
    finalContent.value = props.content;
    isTruncated.value = false;
  } else {
    finalContent.value = props.content.slice(0, 250);
    isTruncated.value = true;
  }
}

const createdAtToString = () => {
  return new Date(props.createdAt.toDate()).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const emits = defineEmits(['callShow', 'callReloadStageOne'])
const callShowImageFromParent = () => emits('callShow', props.image);

const callShowAnswerImageFromParent = (imageAnswer: string) => emits('callShow', imageAnswer);


//Toggle the view of the comment
const answerComment = () => {
  toggleReplyCard()
}

//show reply comment card
const showReplyCard = ref(false);

const toggleReplyCard = () => showReplyCard.value = !showReplyCard.value;

const callReloadStageOne = () => emits('callReloadStageOne');

const answersUi = computed(() => (Object.values(props.answers)) );




</script>

<style scoped>
.custom-card {
  --background: #ffffff;
  --border-radius: 50%;
  --border: 1px solid #f4f4f4;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.401);
  --box-shadow: 0 1px 3px 0 rgba(255, 0, 0, 0.401);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  color: #1b1f23;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.author {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-top: 0.125rem;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.tag-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bug-badge {
  --background: #f76f72;
  --color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
}

.gear-icon {
  color: #f76f72;
  font-size: 1.125rem;
}

.time {
  color: #c3c7cc;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.description {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-top: 1rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f6d2d4;
}

.bug-image {
  width: 5rem;
  height: 5rem;
  border-radius: 0.75rem;
  border: 2px solid #f76f72;
}
</style>