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
                <img :src=user.imageurl alt="photo de profile" >
                <p class="info">{{user.email}}</p>
                <button>Modifier mes information</button>
            </div>
            <div class="card-update"></div>
        </div>
    </div>
    


</template>

<script>
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
};

</style>
