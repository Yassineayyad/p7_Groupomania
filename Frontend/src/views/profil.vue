<template>
    <div>
        <div class="header">
        
            <img  class="header-img" src="@/assets/logo-left.png" id="logo" alt="logo groupomania"/>
            
            <nav class="header-info">
                <router-link to="/home" class="header-title"> Acceuil</router-link>
                <router-link to="/profil" class="header-title"></router-link>
                <button @click="logout()" class="header-btn">Déconnection</button>
            </nav>
        </div>
        <div class="card">
            <div class="card-info">
                <h1>Bienvenu sur votre profile</h1>
                <div v-if="modal"  class="img--update">
                    
                   <label for="image"><img :src=user.imageurl alt="photo de profile" /> </label>
                    <input type="file" id="image" name="image" @change="onFileSelected"/>
                    <label for="firstname">Nom</label>
                    <input type="text" id="firstname" v-model="user.firstname">

                    <label for="lastname">Prenom</label>
                    <input type="text" id="lastname" v-model="user.lastname">
                    <p class="info">{{user.email}}</p> 
                    <div class="btn-update">
                    <button class="btn" @click="modal= !modal" >Annuler</button>
                    <button class="btn btn-vld" @click="updateProfile()">Valider</button>
                    </div>
                    <button class="btn btn-spr" @click="deleteProfil(user)">Desactiver mon compte</button>
                </div>
                <div v-else>
                    <p class="info">{{user.firstname}} {{user.lastname}} </p>
                    <img  :src=user.imageurl alt="photo de profile" /> 
                    <p class="info">{{user.email}}</p> 
                    <button @click="modal= !modal" >Modifier votre profil</button>
                </div>
            </div>
            <div class="card-update"></div>
        </div>
    </div>
    


</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
/* import modale from '../components/modale.vue' */
export default {
  name: 'profil',
  data: function(){
      return{
        mode:'update',
        profile: {
            lastname: '',
            firstname: '',
            imageurl:'',
        },
        modal: false,
       
      }
  },
  computed: {
        ...mapState({
      user: 'userInfos',
    })
  },
   methods: {
    onFileSelected: function (e){
        this.imageurl= e.target.files[0]
        console.log('this.user.imageurl');
        console.log(this.imageurl);
    },
    update: function(){
        this.mode = 'update'
    },
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    updateProfile: function() {
        
        const token = this.$store.state.user.token
        const userId = this.$store.state.user.userId
        const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
    const userProfil = new FormData();
    if (this.imageurl !== null) {
        userProfil.append('firstname',this.user.firstname);
        userProfil.append('lastname', this.user.lastname);
        userProfil.append('image', this.imageurl)
    }else{
        userProfil.append('firstname',this.user.firstname);
        userProfil.append('lastname', this.user.lastname);
    }
      console.log(userId);
      axios.put(`http://localhost:3000/api/auth/${userId}`,userProfil,{headers} )
      .then((res)=>{
          console.log(res);
        alert("profile modifier")
        this.$router.push("/")
      })
      .catch(err => console.log(err))
    },
    deleteProfil: function(user){
        const token = this.$store.state.user.token
        const userId = this.$store.state.user.userId
        const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
      console.log(user.id);
      axios.delete(`http://localhost:3000/api/auth/${userId}`, {headers})
      .then(()=> {
          
          this.logout()
          this.$router.push("/")
          alert("votre profil a bien été supprimé ! ")
      })
      .catch((err)=>{
          console.log(err);
      })
    }
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
@media only screen and (max-width: 600px) {
    .card-info{
        width: 100% !important;
    }
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
.card-info{
    width: 450px;
    margin: 100px auto 10px auto;
    background: chocolate;
    border: solid white ;
    padding-bottom: 20px;
}
img{
    width: 150px;
}
.img--update{
  display: flex;
  flex-direction: column;
  align-items: center;
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
.btn-spr{
    background: rgb(238, 10, 10);
    border: solid white 1px;
    border-radius: 25px;
    margin-top: 20px;
    cursor: pointer;
    color: rgb(223, 210, 210);
}
.btn:hover{
     transform: scale(1.1);
}
.btn-update{
    align-items: center;
}
</style>
