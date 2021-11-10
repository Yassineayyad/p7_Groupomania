<template>
    <div v-if="revele" class="bloc-modale" >

      <div class="overlay" @click="toggleModale">

      </div>
      
      <div class="modale card">
          <div @click="toggleModale" class="btn-modale btn btn-danger">x</div>
          <h2>Modifier votre profile</h2>
          <div  class="img--update">
                    <label for="image">Modifier votre photo de profile</label>
                    <input type="file" id="image" name="image"/>
                    <label for="firstname">Nom</label>
                    <input type="text" id="firstname" v-model="user.firstname">

                    <label for="lastname">Prenom</label>
                    <input type="text" id="lastname" v-model="user.lastname">
                    <p class="info">{{user.email}}</p>  

                </div>
      </div>

    </div>  

</template>

<script>
export default{
    name: 'Modale',
    props:['revele', 'toggleModale'],
    data: function(){
        return{
            lastname: '',
            firstname: '',
            
        }
    },
}

</script>

<style scoped>
.bloc-modale{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
}
.card{
    border: solid black 0.5px;
    width: 500px;
    margin: auto;
}
.btn{
    background: brown;
    cursor: pointer;
}
.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top:30%;
    
}
.btn-modale{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
}
</style>
