<template>
    <div class="profile">
        <div class="toppage" v-if="id == userid">マイページです ( {{ username }} さん)</div>
        <div class="toppage" v-else>{{ username }} さんのページです</div>
        <ul class="tab">
            <li
              class="tab__item"
              :class="{'tab__item--active': tab === 1 }"
              @click="tab = 1"
            >Photos</li>
            <li
              class="tab__item"
              :class="{'tab__item--active': tab === 2 }"
              @click="tab = 2"
            >Likes</li>
        </ul>
        <div class="panel grid" v-show="tab === 1">
            <Photo
                v-if="photos.length > 0"
                class="grid__item"
                v-for="photo in photos"
                :key="photo.id"
                :item="photo"
                @like="onLikeClick"
            />
            <p v-else>No photos yet.</p>
        </div>
        <div class="panel grid" v-show="tab === 2"> 
            <Photo
                v-if="photos_likes.length > 0"
                class="grid__item"
                v-for="photo in photos_likes"
                :key="photo.id"
                :item="photo"
                @like="onLikeClick"
            />
            <p v-else>No photos liked.</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { OK } from '../util'
import Photo from '../components/Photo.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    props: {
        username: {
            type: String,
            required: true
        }, 
        id: {
            type: Number,
            required: true
        },
    },
    components: {
        Photo,
    },
    data() {
        return {
            tab: 1,
            photos: [],
            photos_likes: [],
        }
    },
    methods: {
        async fetchPhotos() {
            const response1 = await axios.get(`/api/${this.id}/photos`)
            const response2 = await axios.get(`/api/${this.id}/photos/likes`)
            const response = this.tab === 1 ? response1 : response2
            
             if (response.status !== OK) {
                this.$store.commit('error/setCode', response.status)
                return false
            }
            if (this.tab === 1) {
                this.photos = response.data
            } else {
                this.photos_likes = response.data
            }
            
        }, 
        async like(id) {
            const response = await axios.put(`/api/photos/${id}/like`)

            if (response.status !== OK) {
                this.$store.commit('error/setCode', response.status)
                return false
            }
            if (this.tab === 1) {
                this.photos = this.photos.map(photo => {
                    if (photo.id === response.data.photo_id) {
                        photo.likes_count += 1
                        photo.liked_by_user = true
                    }
                    return photo
                })
            } else {
                this.photos_likes = this.photos_likes.map(photo => {
                    if (photo.id === response.data.photo_id) {
                        photo.likes_count += 1
                        photo.liked_by_user = true
                    }
                    return photo
                })
            }

        },
        async unlike(id) {
            const response = await axios.delete(`/api/photos/${id}/like`)

            if (response.status !== OK) {
                this.$store.commit('error/setCode', response.status)
                return false
            }

            if (this.tab === 1) {
                this.photos = this.photos.map(photo => {
                    if (photo.id === response.data.photo_id) {
                        photo.likes_count -= 1
                        photo.liked_by_user = false
                    }
                    return photo
                })
            } else {
                this.photos_likes = this.photos_likes.map(photo => {
                    if (photo.id === response.data.photo_id) {
                        photo.likes_count -= 1
                        photo.liked_by_user = false
                    }
                    return photo
                })
            }
        },
        onLikeClick ({ id, liked}) {
            if (! this.isLogin) {
                alert('いいね機能を使うにはログインしてください．');
                return false;
            }

            if (liked) {
                this.unlike(id)
            } else {
                this.like(id)
            }
        },
    },
    computed: {
        ...mapGetters({
          userid: 'auth/userid',
          isLogin: 'auth/check',
        }),
    },
    watch: {
        $route: {
            async handler() {
                await this.fetchPhotos()
            },
            immediate: true
        },
        tab: {
            async handler() {
                await this.fetchPhotos()
            }, 
            immediate: true
        }
  }
})
</script>