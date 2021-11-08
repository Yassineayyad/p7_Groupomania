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
                <p class="info">{{user.firstname}} {{user.lastname}} </p>
                <div class="img--update">
                    <img :src=user.imageurl alt="photo de profile" />
                    <label for="image">Modifier votre photo de profile : </label>
                    <input type="file" id="imageq" name="image"/>
                </div>
                <p class="info">{{user.email}}</p>
                <button @click="deleteProfil(user)">Supprimer mon compte</button>
            </div>
            <div class="card-update"></div>
        </div>
    </div>
    


</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
  name: 'profil',
  computed: {
        ...mapState({
      user: 'userInfos',
    })
  },
   methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    update: function() {
       /*  const token = this.$store.state.user.token;
        const userId = this.$store.state.user.userId */
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
</style>
