<template>
    <footer class="footer">
      <button v-if="isLogin" class="button button--link" @click="logout">
        Logout
      </button>
      <RouterLink v-else class="button button--link" to="/login">
        Login / Register
      </RouterLink>
    </footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    }, 
    computed: {
        isLogin() {
            return this.$store.getters['auth/check']
        }
    }
})
</script>
