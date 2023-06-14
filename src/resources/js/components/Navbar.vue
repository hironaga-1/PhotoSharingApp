<template>
    <nav class="navbar">
      <RouterLink class="navbar__brand" to="/">
        PhotoSharingApp
      </RouterLink>
      <div class="navbar__menu">
        <div v-if="isLogin" class="navbar__item">
            <button class="button" @click="showForm = !showForm">
              <i class="icon ion-md-add"></i>
              Submit a photo
            </button>
        </div>
        <span v-if="isLogin" class="navbar__item">
          <RouterLink class="button button--link" :to="`/${userid}/${formatname}`">{{ username }}</RouterLink>
        </span>
        <div v-else class="navbar__item">
          <RouterLink class="button button--link" to="/login">
            Login / Register
          </RouterLink>
        </div>
      </div>
      <photo-form v-model:visible="showForm" />
    </nav>
</template>

<script>
import { defineComponent } from 'vue'
import PhotoForm from './PhotoForm.vue'

export default defineComponent({
  components:{
    PhotoForm
  },
  data() {
    return {
      showForm: false
    }
  },
  computed: {
    isLogin() {
        return this.$store.getters['auth/check']
    },
    username() {
        return this.$store.getters['auth/username']
    },
    formatname() {
        return this.$store.getters['auth/formatname']
    },
    userid() {
        return this.$store.getters['auth/userid']
    }
  }
})
</script>