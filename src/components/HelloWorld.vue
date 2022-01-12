<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">AlgoVizu</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" v-on:click="onButtonClick('Sort')">Sort<span class="sr-only"></span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-on:click="onButtonClick('Labyrinth')" >Labyrinth</a>
          </li>
        </ul>
      </div>
    </nav>
    <div v-if="algoChoose == 'Sort'">
      <VSort />
    </div>
    <div v-else-if="algoChoose=='Labyrinth'">
      <VLabyrinth/>
    </div>
  </div>
</template>

<script>
import VSort from "@/components/Card/Sort/Vsort";
import VLabyrinth from "@/components/Card/Labyrinth/VLabyrinth";
let algoChoose = 'Sort';
export default {
  name: 'HelloWorld',
  components: {VLabyrinth, VSort},
  mounted(){
    console.log("Mounted")
    this.$root.$on('updateArray',(art1) =>{
      console.log("Message received 1: " + art1)
    })
  },
  props: {
    msg: String
  },
  data(){
    return {algoChoose};
  },
  methods:{
    onButtonClick(name){
      console.log("Test on button click");
      this.algoChoose=name;
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
