<template>
  <ion-card class="rounded-3xl custom-card ion-padding">
    <ion-card-header>
      <div class="header-container">
        <div>
          <ion-card-title class="title">{{ title }}</ion-card-title>
          <ion-card-subtitle class="author">{{ userName }}</ion-card-subtitle>
        </div>
        <div class="header-right">
          <div class="tag-container">
            <ion-badge class="bug-badge">{{ category }}</ion-badge>
            <ion-icon class="gear-icon"></ion-icon>
          </div>
          <p class="time">2 hours ago</p>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content>
      <p class="description font-poppins">
        {{ finalContent }}
        <span v-if="isTruncated || !isTruncated && props.content.length > 249" @click="truncateContent()" class="italic cursor-pointer text-slate-500">{{ isTruncated ? 'Ver más...' : 'Ver menos' }}</span>
      </p>
      <div class="footer-container">
        <img :src="image" alt="Complaint screenshot" class="rounded-3xl complaint-image"  />
      </div>
    </ion-card-content>
  </ion-card>

</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { limit } from 'firebase/firestore';
import { settings } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';

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
    type: String,
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