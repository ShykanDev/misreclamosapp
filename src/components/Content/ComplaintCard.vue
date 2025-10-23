<template>
  <ion-card class="rounded-3xl custom-card ion-padding">
    <ion-card-header>
      <div class="header-container">
        <div class="">
          <ion-card-title class="title">{{ title }}</ion-card-title>
          <div class="flex gap-2 items-center mt-2">
            <v-icon name="fa-regular-user" class="text-orange-800"/>
            <ion-card-subtitle class="author">{{ userName }}</ion-card-subtitle>
          </div>
        </div>
        <div class="header-right">
          <div class="tag-container">
            <ion-badge class="bug-badge">{{ category }}</ion-badge>
            <v-icon name="md-category-round" class="text-orange-800"/>
          </div>
          <p class="time">{{ createdAtToString() }}</p>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content>
      <p class="description font-poppins">
        {{ finalContent }}
        <span v-if="isTruncated || !isTruncated && props.content.length > 249" @click="truncateContent()" class="italic cursor-pointer text-slate-500">{{ isTruncated ? 'Ver más...' : 'Ver menos' }}</span>
      </p>
      <div v-if="image" class="footer-container">
        <img :src="image" alt="Complaint screenshot" class="rounded-3xl complaint-image"  />
      </div>
      <div>
        <!-- Answers (Mobile Adaptation) -->
        <div v-if="props.answers && props.answers.length > 0"
          class="flex overflow-y-auto flex-col p-2 w-full max-h-96 rounded-2xl bg-blue-50/50">
          <ion-card-title class="text-lg font-poppins text-slate-700">Respuestas</ion-card-title>
  <div v-for="answer in props.answers as IAnswer[]" :key="answer.uidTo"
    class="relative p-4 mb-3 w-full bg-white rounded-lg border-l-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
    :class="{
      'bg-blue-50/50 border-blue-200': answer.uidFrom == answer.uidTo,
      'bg-rose-50 border-slate-300': answer.uidFrom !== answer.uidTo && !answer.isCompany,
      'bg-green-50 border-green-200': answer.isCompany,
    }">
    <div class="flex gap-2 items-center mb-1.5">
      <p v-if="answer.uidFrom === answer.uidTo"
        class="flex absolute top-1 right-2 gap-1 items-center text-xs font-semibold text-blue-500">
        Autor <v-icon name="ri-shield-user-fill" scale="0.9" />
      </p>
      <span v-if="answer.uidFrom"
        class="flex justify-center items-center w-6 h-6 text-xs font-semibold text-white rounded-full shrink-0" :class="{
          'bg-blue-900': answer.uidFrom == answer.uidTo,
          'bg-slate-400': answer.uidFrom !== answer.uidTo && !answer.isCompany,
          'bg-green-900': answer.isCompany,
        }">{{ answer.answeringFromName.slice(0, 1) }}</span>
      <span class="text-sm font-medium truncate max-w-[70%]">{{ answer.answeringFromName }}</span>
      <span v-if="answer.isCompany"
        class="flex absolute top-0 right-2 gap-0.5 items-center text-xs font-medium text-green-800">
        <v-icon name="la-user-tie-solid" scale="0.9" /> Empresa
      </span>
      <span class="mt-0.5 text-xs font-medium truncate text-slate-600">
        {{ answer.date.toDate().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) }}
      </span>
    </div>
    <p class="text-sm leading-relaxed text-gray-800 break-words">{{ answer.answer }}</p>
    <div v-if="answer.image" class="overflow-hidden relative mt-2 max-w-full max-h-48 rounded-xl shadow-sm select-none">
      <article
        class="flex absolute inset-0 flex-col justify-center items-center opacity-0 transition-all duration-300 cursor-pointer bg-black/70 hover:opacity-100">
        <v-icon name="fa-eye" scale="1.3" class="text-white" />
        <p class="text-xs text-white select-none">Ver imagen</p>
      </article>
      <img :src="answer.image" alt="user image"
        class="object-cover w-full h-40 transition-transform duration-300 cursor-pointer hover:scale-[1.02]" />
    </div>
  </div>
</div>

      </div>
    </ion-card-content>
  </ion-card>

</template>

<script lang="ts" setup>
import { IAnswer } from '@/interfaces/IComplaint';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonBadge} from '@ionic/vue';
import { Timestamp } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

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
    type: Array,
    required: true
  }
})

const isTruncated = ref<null|boolean>(null);
const finalContent = ref()

const initialValidation = () =>  {
  if (props.content.length > 249) {
    finalContent.value = props.content.slice(0,250);
    isTruncated.value = true;
  } else {
    finalContent.value = props.content;
    isTruncated.value = false;
  }
}
onMounted(()=> initialValidation())
const truncateContent = ():void => {
  if(isTruncated.value) {
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