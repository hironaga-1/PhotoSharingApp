<template>
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div class="container">
          <Message />
          <RouterView />
        </div>
      </main>
      <Footer />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from './util'
import Message from './components/Message.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
    components: {
        Navbar, Footer, Message,
    },
    computed: {
      errorCode() {
        return this.$store.state.error.code
      }
    },
    watch: {
        erorrCode: {
          async handler (val) {
            if (val === INTERNAL_SERVER_ERROR) {
              this.$router.push('/500')
            } else if (val === UNAUTHORIZED) {
              await axios.get('/api/refresh-token')
              this.$store.commit('auth/setUser', null)
              this.$router.push('/login')
            } else if (val === NOT_FOUND) {
              this.$router.push('/not-found')
            }
          },
          immediate: true
        },
        $route() {
          this.$store.commit('error/setCode', null)
        }
    }
})
</script>

