<template>
<div>
    <div class="header">
      <img
        class="header-img"
        src="@/assets/logo-left.png"
        id="logo"
        alt="logo groupomania"
      />

      <nav class="header-info">
        <router-link to="/profil" class="header-title"
          >{{ user.firstname }} {{ user.lastname }}</router-link
        >
        <router-link to="/home" class="header-title"> Acceuil</router-link>

        <button @click="logout()" class="header-btn">Déconnection</button>
      </nav>
    </div>

    
        <div v-if="update">
          <form class="createPost">
            <h1>Modifiez Votre message</h1>
            <div class="item">
              <p>Message</p>
              
              <textarea class="content" :placeholder="`Vous voulez modifier votre Post , ${user.lastname}?`" v-model="post.content" rows="7" cols="60"></textarea>
            </div>
            <div class="item">
              <p>Ajouter une image</p>
              <input type="file" name="image" @change="onFileSelected" />
            </div>
            <button @click.prevent="updatePost()">
              Modifier ! 
            </button>
            <router-link to="/home">
            <button>Annuler</button>
            </router-link>
          </form>
        </div>
        
      <div v-else>

        <p class="card__content">{{ post.content }}</p>
        <img :src="post.imageUrl" alt="" class="post--img" />

       <button
          v-if="post.UserId == this.$store.state.user.userId"
          @click.prevent="deletePost(post)"
        >
          Supprimer
        </button>
        <button
          v-else-if="this.$store.state.user.isAdmin === 1"
          @click="deletePost"
        >
          Supprimer
        </button>
        <button v-if="post.UserId == this.$store.state.user.userId" @click="update = !update">Modifier</button>
        <button class="btn-like">j'aime</button>
        <button class="btn-comnt" @click="commentaire = !commentaire" >Commenter</button>
        <div v-if="commentaire">----------------------------------------------------------------------------------
          
            <form class="createPost">
              <div class="item">
                Votre commentaires : <br/>

              
                <textarea class="Commentaire"  rows="7" cols="60" v-model="content"></textarea>
              </div>
              <div class="item">
                <p>Ajouter une image</p>
                <input type="file" name="image" @change="onFileSelected" />
              </div>
              <button class="btn" @click="commentaire = !commentaire" >Annuler</button>
              <button class="btn btn-vld" @click="comment">Commentez ! </button>
            </form>

      </div>
        </div>


        
</div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default{
    name: 'onepost',
    data() {
        return{
            post: [],
            /* imageurl: null,
            firstname: "",
            lastname: "", */
            update : true,
         } 
    },
       
    mounted: function () {
      this.takeOnePost()
      
      setTimeout(() => {
        console.log(this.$store.state.user);
      if (this.$store.state.user.userId == -1) {
        this.$router.push("/");
        return;
      }
      this.$store.dispatch("getUserInfo");
    }, 200)
    },
    methods:{
      onFileSelected: function (e){
        this.imageUrl= e.target.files[0]
        console.log('this.user.imageurl');
        console.log(this.imageUrl);
    },
      takeOnePost ()  {
         const token = this.$store.state.user.token;
         const header = {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
         };
         const postId = this.$route.params.id;
         console.log(postId);
         axios.get(`http://localhost:3000/api/post/${postId}`, { header })
         .then((res)=>{
             this.post= res.data;
             console.log(this.post.content);
         })
         .catch((err) => {
         console.log(err);
       });
     },
    updatePost : function() {
      
      const token = this.$store.state.user.token;
      console.log("token");
      console.log(headers);
      const postId = this.$route.params.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
       const postUpdate = new FormData();
    if (this.imageUrl !== null) {
        postUpdate.append('content',this.post.content);
        postUpdate.append('image', this.imageUrl);
    }else{
        postUpdate.append('content',this.post.content);  
    }
    
      axios.put(`http://localhost:3000/api/post/${postId}`,postUpdate , {headers})
      .then((res) => {
        if (res) {
          alert("Votre message a été modifié")
          this.$router.push('/home');
          }
        })
        .catch((error) => {
          console.log(error)
        })

    },
      },
    computed: {
        ...mapState({
            user: "userInfos",
    }),
  },
}

</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: chocolate;
}
.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  display: flex;
  font-size: 1.1em;
  color: white;
}
.header-btn {
  background: red;
  color: white;
  border-radius: 20px;
  margin-left: 20px;
}
.header-img {
  width: 200px;
}
@media only screen and (max-width: 600px) {
 .header-info {
    margin: 10px 0;
    background: chocolate;
    padding: 0 10px;
  }
  .header {
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
  }
  .content{
    width: 100%;
  }
}
</style>
