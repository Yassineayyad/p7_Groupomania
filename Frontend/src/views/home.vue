<template>
   <div>
        <div class="header">

            <img  class="header-img" src="@/assets/logo-left.png" id="logo" alt="logo groupomania"/>
            
            <nav class="header-info">
                <router-link to="/profil" class="header-title">{{user.firstname}} {{user.lastname}}</router-link>
                
                <button @click="logout()" class="header-btn">Déconnection</button>
            </nav>
        </div>
         <div class="newPost">
        <form class="createPost">
                <h1>Poster un nouveau message</h1>
                <div class="item">
                <p>Title</p>
                <div>
                    <input type="text" placeholder="Title" v-model="title"/>
                </div>
                </div>
                <div class="item">
                <p>Message</p>
                <textarea v-model="content"></textarea>
                </div>
            <div class="item">
                <p>Ajouter une image</p>
                <input type="file" ref="file" @change="onFileSelected()">
                </div>
            </form>
                <div class="test">
                <button @click="submit">Publier</button>
                </div>
        </div>
        <div class="about">
            <div class="card" v-for="post in posts" :key="post">
                <router-link :to="{ name: 'Onepost', params: { id: post.id }}">
                <h1 class="card__title" >{{ post.User.firstname }} {{ post.User.lastname }}</h1>
                <h3>{{ post.title}}</h3>
                <p class="card__title">{{ post.content }}</p>
                <p>Posté le {{ post.createdAt.slice(0,10).split("-").reverse().join("/")}} </p>
                <p>id = {{ post.id }}</p>
                <p> user id = {{ post.UserId }}</p>
                <img :src="post.imageUrl" alt=""/>
                </router-link>
                <button v-if="post.UserId == this.$store.state.user.userId" @click.prevent="deletePost(post)">Supprimer</button>
                <button v-else-if="this.$store.state.user.isAdmin == 1" @click="deletePost">Supprimer</button>
                </div>
             </div>
   </div>
</template>

<script>
/* import { computed } from '@vue/reactivity'; */
import { mapState } from 'vuex'
import axios from "axios"
export default {
   name: 'home',
   data(){
       return {
           title: "",
           content:"",
           imageUrl: null
       }
   },
   creat(){
       axios.get("http://localhost:3000/api/auth/post")
       .then((res)=> {
           this.post = res.data
       }).catch((err)=> {
        console.log(err);
       })
   },
   mounted: function () {
       setTimeout(()=>{
           console.log(this.$store.state.user);
           if (this.$store.state.user.userId == -1) {
               this.$router.push('/');
           return;
           }
            this.$store.dispatch('getUserInfo');
            
       }, 1000)
   },
    methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    deletePost: function(post){
        const token = this.$store.state.user.token;
        const postId = post.id
        const header = {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        }
        axios.delete(`"http://localhost:3000/api/post"/${postId}`, {header})
        .then((res)=>{
            if (res) {
                alert('votre Poste a bien été supprimé !')
            }
        })
    },
    onFileSelected: function (){
        this.imageUrl= this.$refs.file.files[0]
    },
    submit: function(){
        const token = this.$store.state.user.token;
        const data = new FormData()
        if (this.imageUrl !== null) {
            data.append('title',this.title)
            data.append('content',this.content)
            data.append('imageUrl',this.imageUrl)
        }else{
            data.append('title',this.title)
            data.append('content',this.content)
        }
        const header = {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        }
        axios.post("http://localhost:3000/api/auth/post", data, {header})
        .then(()=>{
            alert("votre message a bien été posté !")
            this.$router.push("/home")
        })
        .catch((err) => {
            console.log(err);
        })
    }
  },
  computed: {
      ...mapState({
          user: 'userInfos'
      })
  }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    background: chocolate;
}
.header-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-title {
    display: flex;
    font-size: 1.1em;
    color: white;
}
.header-btn{
    background: red;
    color: white;
    border-radius: 20px;
    margin-left: 20px;
}
.header-img {
    width: 200px;
}
</style>
