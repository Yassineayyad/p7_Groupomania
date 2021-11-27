<template>
   <div>
         
         <img src="@/assets/logo.png" id="logo" alt="logo groupomania"/>
      <div class='card'>
      <h1 v-if="mode == 'login'" >Connexion</h1> 
      <h1 v-else>Inscription</h1> 
      <p v-if="mode == 'login'">Première fois sur le réseau social Groupomania ? <span class="card__action" @click="signUp()">Inscrivez-vous </span></p> 
      <p v-else>Déjà membre du réseau social Groupomania ? <span class="card__action" @click="login()">Se connecter</span></p> 
      <form>

         <div>
            <label for="email">Email:</label><br>
            <input v-model="email"  type="text" id="email" name="email" placeholder="user@groupomania.com" required><br>
            <label for="password">Mot de passe:</label><br>
            <input v-model="password"  type="password" id="password" name="password" placeholder="*********" required><br>
         </div>
         <div class="invalid" v-if="mode == 'login' && status == 'error_login'"> * email et/ou mot de passe incorrect *</div>
         <div v-if="mode == 'signup'">
            <label  for="firstname">Nom</label><br>
            <input v-model="firstname"  type="text" id="firstname" name="firstname" placeholder="Houde"><br>
            <label  for="lastname">Prenom</label><br>
            <input v-model="lastname"  type="lastname" id="lastname" name="lastname" placeholder="Olivier"><br>
         </div>
         <div v v-if="mode == 'signup' && status == 'error_login'">* Email deja utiliser ou/et mot de passe faible *<br> *le mot de passe doit acontenir au mini 4 caracteres et au moin un chiffre*</div>
         <button @click.prevent="loginAccount()" id="btn-login" class="btn-submit" :class="{'btn--disabled' : !validFild}" v-if="mode == 'login'">
         <span v-if="status == 'loading'">Connexion en cours ...</span>
         <span v-else>connexion</span>
         </button>
         <button @click.prevent="createAccount()" type="submit" id="btn-signup" class="btn-submit" :class="{'btn--disabled' : !validFild}"  v-else>
            <span v-if="status == 'loading'">Creation de compte en cours ...</span>
            <span v-else>S'inscrite</span>
         </button>

      </form>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'login',
  data: function () {
     return{
        mode: 'login', 
        email: '',
        password: '',
        lastname: '',
        firstname: '',
     }
  },
  mounted: function() {
      if (this.$store.state.user.userId != -1) {
               this.$router.push('/home');
            return;
            }
  },
  computed: {
     validFild : function () {
        if(this.mode == 'signup'){
            if (this.email != "" && this.lastname != "" && this.firstname != "" && this.password != "") {
               return true;
            } else{
               return false;
               }
           }else{
              if (this.email != "" && this.password != "") {
                 return true;
              }else{
                 return false;
                 }
        }
     },
     ...mapState(['status'])
},
  methods: {
     signUp: function () {
        this.mode = 'signup';
     },
     login: function () {
        this.mode = 'login';
        },
      loginAccount:  function() {
         
         const self = this;
         // dispatch sert a declancer l'action 
         this.$store.dispatch('loginAccount', {
            email: this.email,
            password: this.password,
         }).then(() => {
              self.$router.push('/home');
          
         }).catch((err) => console.log(err))

      },
      createAccount: function () {
        
         this.$store.dispatch('createAccount', {
            email: this.email,
            lastname: this.lastname,
            firstname: this.firstname,
            password: this.password,
         }).then(() => {
            return this.loginAccount();
         })
         .catch((err) => console.log(err))
               
      },
   },
}
</script>




<style scoped>

a {
   text-decoration: none;
   color:blueviolet;
   }
 .card {
    width: 500px;
    margin: auto;
    background:#FEA592 ;
    border: #FFD9D9 solid 3px;
    border-radius: 20px;
   
}
form {
   margin: 30px;
}
input{
   margin: 10px 0;
   width: 250px;
}
.btn-submit{ 
   width: 250px;
   margin-top: 20px;
   background: #1A8CD8;
   height: 40px;
   border-radius:25px ;
}
.card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
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
  .invalid{
     color: red;
  }
  #logo {
  width: 300px;
  }
</style>