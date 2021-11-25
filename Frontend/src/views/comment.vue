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

        <div class="newcomment">
              <form class="createPost">
                <h1>Poster un Comentaire</h1>
                <div class="item">
                  <p>commentaire</p>
                  
                  <textarea class="content" :placeholder="`Voulez Vous poster un commentaire ,${user.firstname} ${user.lastname}?`" v-model="content"  rows="7" cols="60"></textarea>
                </div>
                <div class="item">
                  <p>Ajouter une image</p>
                  <input type="file" name="image" @change="onFileSelected" />
                </div>
                
              </form>
              <div class="test">
                <div id="errpost"></div>
                <button class="test-btn" @click="comment" :class="{'btn--disabled' : !validFild} ">Commentez !</button>
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
             console.log(this.post.id);
         })
         .catch((err) => {
         console.log(err);
       });
     },
     comment: function () {
      
      const token = this.$store.state.user.token;
      console.log("token");
      console.log(this.parentId);
      const data = new FormData();
      if (this.imageUrl !== null) {
        data.append("content", this.content);
        data.append("parentId", this.post.id);
        data.append("image", this.imageUrl, );
      } else {
        data.append("content", this.content);
        data.append("parentId", this.post.parentId);
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log("headers");
      console.log(headers);
      axios
        .post("http://localhost:3000/api/post", data, { headers })
        .then((res) => {
            console.log(res);
          alert("votre commentaire  a bien été posté !");
          this.$router.push("/home");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
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
  max-width: 100%;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .header-info {
    display: none;
  }
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
  margin-left: 20px;
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
</style>
