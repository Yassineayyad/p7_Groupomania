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
               
                <div >
                    <p class="info">{{user.firstname}} {{user.lastname}} </p>
                    <img  :src=user.imageurl alt="photo de profile" /> 
                    <p class="info">{{user.email}}</p> 
                    
                   
                </div>
            </div>
            <div class="card-update"></div>
        </div>
    </div>


</template>

<script>
export default {
   data: function(){
      return{
        profil: {
            lastname: '',
            firstname: '',
            imageurl:'',
        },
      }
  },
}
</script>

<style scoped>

</style>