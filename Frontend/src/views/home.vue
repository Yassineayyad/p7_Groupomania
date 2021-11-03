<template>
<div class="header">
   
       <img  class="header-img" src="@/assets/logo-left.png" id="logo" alt="logo groupomania"/>
      
    <nav class="header-info">
        <router-link to="/profil" class="header-title">{{user.firstname}} {{user.lastname}}</router-link>
        <button @click="logout()" class="header-btn">Déconnection</button>
    </nav>
</div>
</template>

<script>
/* import { computed } from '@vue/reactivity'; */
import { mapState } from 'vuex'
export default {
   name: 'home',
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
