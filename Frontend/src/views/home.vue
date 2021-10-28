<template>
<div class="header">
   <img  class="header-img" src="@/assets/logo-left.png" id="logo" alt="logo groupomania"/>
    <div>
        <p>{{  }} {{  }}</p>
        <button @click="logout()">Déconnection</button>
    </div>
</div>
</template>

<script>

export default {
   name: 'home',
   mounted: function () {
       console.log(this.$store.state.user);
       if (this.$store.state.user.userId == -1) {
           this.$router.push('/');
       return;
       }
        this.$store.dispatch('getUserInfo');
   },
    methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.header-title {
    display: flex;
    font-size: 1em;
}
.header-img {
    width: 200px;
}
</style>
