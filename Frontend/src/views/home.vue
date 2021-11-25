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
    <div class="newPost">
      <form class="createPost">
        <h1>Poster un nouveau message</h1>
        <div class="item">
          <p>Message</p>
          
          <textarea class="content" :placeholder="`Voulez Vous poster quelque chose ,${user.firstname} ${user.lastname}?`" v-model="content"></textarea>
        </div>
        <div class="item">
          <p>Ajouter une image</p>
          <input type="file" name="image" @change="onFileSelected" />
        </div>
        
      </form>
      <div class="test">
        <div id="errpost"></div>
        <button class="test-btn" @click="submit" :class="{'btn--disabled' : !validFild} ">Publier</button>
      </div>
    </div>
    <div class="about">
      <div class="card" v-for="post in posts" :key="post">


        <div class="card__title">
          <img
            class="card-img"
            :src="post.post_owner_image"
            alt="photo de profile"
          />
          <h1 class="title">
            {{ post.post_owner_firstname }} {{ post.post_owner_lastname }}
          </h1>
        </div>
        <div>

            
            
            <p class="card__content">{{ post.post_content }}</p>
            <img :src="post.post_img" alt="" class="post--img" />
            

            <button
              v-if="post.post_userId == this.$store.state.user.userId"
             @click="$router.push({ name:'onepost', params: { id: post.post_id },})"
            >
              Modifier
            </button>
            <button
              v-if="post.post_userId == this.$store.state.user.userId || this.$store.state.user.isAdmin == true"
              @click.prevent="deletePost(post)"
            >
              Supprimer
            </button> <br>
            <div class="creatupdate">

           <!--  <p v-if="post.post_created!== post.post_updated" class="card-date" > Modifié le {{ post.post_updated.slice(0, 10).split("-").reverse().join("/") }} à {{ post.updatedAt.slice(11, 16).split(":").join("h") }} </p>
            <p class="card-date">
              Posté le
              {{ post.post_created.slice(0, 10).split("-").reverse().join("/") }} à {{ post.post_created.slice(11, 16).split(":").join("h") }}
            </p> -->
            
            </div>
            <a id="report" :href="`${post.mailto}`" >signalez</a>

            

             <!-- 
            Commentaire        -->
          <div >
              --------------------------------------------------------------------------------------<br>
                <h3>Commenter: </h3>

            <button class="btn-comnt"  @click="$router.push({ name:'comment', params: { id: post.post_id },})" > Commentez ! </button>
                <div v-for="comment in post.post_comments_array" :key="comment" class="commentCard">
            <p v-if="comment.comment_id == null">soyez le premier a commenter ce post</p>
                  <div v-if="comment.comment_id != null">

                    <div class="card--comment">
                      <img
                      class="card-img"
                      :src="comment.comment_owner_image"
                      alt="photo de profile"
                      />
                      <h1 class="title">
                        {{ comment.comment_owner_firstname }} {{ comment.comment_owner_lastname }}
                      </h1>
                    </div>
                      <div class="comment">
                        <p>{{comment.comment_content}}</p>
                        <img :src="comment.comment_img" alt="" class="comment--img" />
                      </div>
                      <button
                        v-if="comment.comment_userId == this.$store.state.user.userId || this.$store.state.user.isAdmin == true"
                        @click.prevent="deletePost(post)"
                      >
                        Supprimer
                      </button>
                  </div>

                </div>



          </div>
           

        </div>


        
      </div>
    </div>
  </div>
</template>

<script>
/* import { computed } from '@vue/reactivity'; */
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "home",

  
  data() {
    return {
      content: "",
      postId:"",
      createdAt:"",
      imageUrl: null,
      firstname: "",
      lastname: "",
      isAdmin: "",
      posts: [],
      id: this.$route.params.id,
      commentaire : false,
      errPost: false,
      update : false,
      
      
      
    };
  },
  computed: {
     validFild : function () {
        
            if (this.content != "") {
               return true;
            } else{
               return false;
               }
          
    },
    ...mapState({
      user: "userInfos",
    }),
     },
 

  created() {
    axios
      .get("http://localhost:3000/api/post")
      .then((res) => {
    
        this.posts = res.data.map(item => {
          item["mailto"]="mailto:admin@groupomania.com?subject=report from groupomania postId :" + item.post_id;

          return item
        })
        console.log(this.posts);

      })
      .catch((err) => {
        console.log(err);
      });
      
      /* const postId = this.posts.id;
      console.log(postId);
     axios
      .get(`http://localhost:3000/api/post/${postId}`)
      .then((res) => {
        this.comments = res.data
        
        console.log("res");
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      }); */
       
     
  },
  mounted: function () {
    setTimeout(() => {
      console.log(this.$store.state.user);
      if (this.$store.state.user.userId == -1) {
        this.$router.push("/");
        return;
      }
      this.$store.dispatch("getUserInfo");
    }, 200);
     /* const token = this.$store.state.user.token;
      console.log("token");
      console.log(postId);
      const postId = this.posts.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
     axios
      .get(`http://localhost:3000/api/post/${postId}`, {headers})
      .then((res) => {
    
        this.posts = res.data.map(item => {
          item["mailto"]="mailto:admin@groupomania.com?subject=report from groupomania postId :" + item.id;

          return item
        })
        console.log(this.posts);

      })
      .catch((err) => {
        console.log(err);
      }); */

  },
 /*  getcomment: function(){
     const token = this.$store.state.user.token;
      console.log("token");
      console.log(headers);
      const postId = this.posts.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
     axios
      .get(`http://localhost:3000/api/post/${postId}`, {headers})
      .then((res) => {
    
        this.posts = res.data.map(item => {
          item["mailto"]="mailto:admin@groupomania.com?subject=report from groupomania postId :" + item.id;

          return item
        })
        console.log(this.posts);

      })
      .catch((err) => {
        console.log(err);
      });
    }, */
  
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    
    deletePost: function (post) {
      const token = this.$store.state.user.token;
      console.log("token");
      console.log(headers);
      const postId = post.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(`http://localhost:3000/api/post/${postId}`, {headers})
        .then((err) => {
          if (err) {
            console.log(err);
            }
            alert("votre Poste a bien été supprimé !");
            window.location.reload()
        }).catch((err) => console.log(err))
    },
    onFileSelected: function (e){
        this.imageUrl= e.target.files[0]
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
        postUpdate.append('content',this.content);
        postUpdate.append('imageUrl', this.onFileSelected);
    }else{
        postUpdate.append('content',this.content);  
    }
      axios.put(`http://localhost:3000/api/post/${postId}`,postUpdate , {headers})
      .then((res) => {
        if (res) {
          alert("Votre message a été modifié")
          this.$router.push("/")
          }
        })
        .catch((error) => {
          console.log(error)
        })

    },
    submit: function () {
      const token = this.$store.state.user.token;
      console.log("token");
      console.log(token);
      const data = new FormData();
      
      if (this.content == "") {
       document.getElementById('errpost').textContent = 'vous ne pouvez pas publier un message vide'
      }else{

          if (this.imageUrl !== null) {
            data.append("content", this.content);
          data.append("image", this.imageUrl, this.imageUrl.name);
        } else {
          data.append("content", this.content);
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
            alert("votre message a bien été posté !");
            this.$router.push("/home");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
            
    },


    
  },

  //data.append("parentId", this.postId)
  
};
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
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 10px 20px;
  margin: 20px auto;
  background: chocolate;

}
#errpost{
  color: rgb(158, 43, 43);
  font-style: italic;
}
.newPost{
  background: grey;
  max-width: 100%;
  width: 540px;
  margin: 20px auto;
}
.card__content {
  text-align: start;
  font-weight: 800;
}
.card__title {
  margin: 0;
  display: flex;
  width: auto;
  background: rgb(246, 187, 139);
  text-align: start;
  
  border-radius: 16px;
}
.card-img {
  width: 50px;
  border-radius: 25px;
  margin: 0 20px;
}
.title {
  font-size: 1.5em;
  align-items: center;
}
h1, p{
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  max-width: 80%;
  width: 450px;
  height: 75px;
}
.test-btn {
  margin: 10px 0;
  width: 150px;
  border-radius: 20px;
  background: rgb(72, 72, 216);
  color: white;
}
.card-date {
  text-align: end;
  margin: 0;
}
.post--img {
  width: 100%;
}
.btn{
     border-radius: 25px;
    margin-top: 20px;
    cursor: pointer;
}
.btn-vld{
    background: green;
    margin-left:20px ;
}
button{
  cursor: pointer;
}
a{
  text-decoration: none;
  color: inherit;
}
.btn--disabled {
    background:#cecece;
    color:black;
}
.btn--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
    color: black;
}
.creatupdate{
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
#report{
  display: flex;

}
.card--comment{
  display: flex;
  background:rgb(246, 187, 139);
  border-radius: 20px ;
  margin-bottom: 10px;
  
}
.comment--img{
  width: 250px;
  
}
.commentCard{
  background: rgb(231, 200, 142);
  margin: 10px 10px;
  border-radius: 20px;
}
</style>
