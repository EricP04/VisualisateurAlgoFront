<template>
<div>
<ul>
  <li v-for="(value,index) in careTaker" :key="index" @click="onListClicked(index)">
    {{index}}-{{formatArray(value)}}

  </li>
</ul>

</div>
</template>

<script>


export default {
  name: "VTableMemento",
  props:{
    careTaker:Array
  },
  methods:{
    formatArray(array){
      var tmp = JSON.parse(array)
      if(tmp.array.length > 10)
        tmp.array = tmp.array.splice(0,10)
      return JSON.stringify(tmp)
    },
    onListClicked(index)
    {
      this.$emit("mementoSelected",index)
    }
  }

}
</script>

<style scoped>

</style>