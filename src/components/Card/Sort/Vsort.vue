<template>
<div>
  <div class="container-fluid">
    <div class="row">
    <div class="col-4">
      <form class="align-content-center border-left">
        <div class="form-group">
        <label for="inputVectorLen">Vector's size</label>
        <input type="number" v-model="len" class="form-control" id="inputVectorLen" aria-describedby="vectorLenHepl" placeholder="Enter vector's size" >
        <small id="vectorLenHelp" class="form-text text-muted">The vector's size must be strictly positive</small>
      </div>
      <div class="form-group">
        <label for="maxBound">Max (exclusive)</label>
        <input type="number" v-model="max" class="form-control" id="maxBound" aria-describedby="maxBoundHelp" placeholder="Enter the max bound"
        min="1">
        <small id="maxBoundHelp" class="form-text text-muted">The max bound must be greater than the min bound</small>
      </div>
      <div class="form-group">
        <label for="minBound">Min (inclusive)</label>
        <input type="number" v-model="min" class="form-control" id="minBound" aria-describedby="minBoundHelp" placeholder="Enter the min bound" >
        <small id="minBoundHelp" class="form-text text-muted">The min bound must be smaller than the min bound</small>
      </div>
      <div class="form-group">
        <textarea  id="myVector" aria-placeholder="Vector" :value=array readonly rows="4" style="width:100%"/>
      </div>
        <div>
        <button type="button" class="btn btn btn-secondary" v-on:click="setRandomVector(len,min,max)">Generate vector</button>
        </div>
        <div class="form-group">
          <label>Algo name</label>
          <select id="inputAlgoName" class="form-control"  @change="onChange($event)" v-model="algoSelected">
            <option v-for="algo in algoNames" :key="algo" v-bind:value="algo">
              {{algo}}
            </option>
          </select>
        </div>
        <div>
        <button type="button" class="btn btn-primary" v-on:click="testAlgo(algoSelected,array)">Order</button>
          <button type="button" class="btn btn-primary float-right" v-on:click="onStopClick()">Stop</button>
        </div>
      </form>
    </div>
    <div class="col-8 d-flex justify-content-center ">
      <div class="table">
        <div class="row">
        <v-graph-sort :data-array="array" style="width: 100%" :maxValue="max" :minValue="min"></v-graph-sort>
        </div>
        <div class="row d-flex justify-content-center">
          <p>Comparison: {{comparisons}} Swap : {{ swap }}</p>
        </div>
        <div class="row d-flex justify-content-center">
          <VTableMemento :care-taker="Object.values(mementoInstance.mementos)"/>
        </div>
      </div>


    </div>
    </div>
  </div>
</div>

</template>

<script>
import {getAvailableAlgo, sort} from "../../../jsFolder/requestJs"
import SortRequest from "../../../jsFolder/SortRequest"
import {generateRandomVectorBounded} from '../../../jsFolder/generateRandomVector';
import VGraphSort from "./VGraphSort";
import {CareTaker, storedArrayMemento} from "@/jsFolder/storedArrayMemento";
import VTableMemento from "@/components/Card/Sort/VTableMemento";
let array = []
let len = 0;
let min = 0;
let max = 50;
let algoNames = null;
let comparisons =0
let swap=0;
let algoSelected ="QuickSort";
let receiving = true;
let mementoInstance = new CareTaker();
export default {
  name: "VSort",
  components: {VTableMemento, VGraphSort},
  data(){
    return {array,len,min,max,algoNames, comparisons,swap,algoSelected,receiving,mementoInstance}
  },

  methods:{
    async testAlgo(algoName, array) {

      const reader=await sort(new SortRequest(algoName, array))
      let result;
      let arrayBase = this.array;
      while(!(result = await reader.read()).done && this.receiving)
      {
        var textString = new TextDecoder().decode(result.value)
        this.array = textString.substring(textString.indexOf("[")+1,textString.lastIndexOf("]")).split(/[[,\]]+/g).map(Number)
        this.comparisons += textString.split("/").map(Number)[1]
        this.swap += textString.split("/").map(Number)[2]
      }
      this.receiving=true;
      console.log("On a fini")
      console.log("array base = " + arrayBase)
      console.log("algo name = " + algoName)
      console.log("comparisons = " + this.comparisons)
      console.log("swap = " + this.swap)

      mementoInstance.push(new storedArrayMemento(arrayBase, algoName,this.comparisons,this.swap));
      var tmp = mementoInstance;
      this.mementoInstance = new CareTaker();
      this.mementoInstance=tmp;
    },
    checkValueGenerationVector(len,min,max)
    {
      if(len === undefined ||len <= 0)
      {
        alert("Vector's must be greater than 0")
        return false
      }
      if(min === undefined ||min>=max)
      {
        alert("Min must be smaller than max")
        return false
      }
      if(max === undefined ||max <= min)
      {
        alert("Max must be greater than min")
        return false
      }
      return true
    },
    setRandomVector(len, min, max)
      {
        console.log("SET RANDOM VECTOR ")
      if(!this.checkValueGenerationVector(parseInt(len),parseInt(min),parseInt(max)))
        return;
          array = generateRandomVectorBounded(len,min,max)
        console.log(array)
        this.comparisons = 0;
          this.swap =0
        this.array = array
      },
      onChange(event)
      {
        algoSelected=event.target.value;
        console.log("Algo selected = "+algoSelected)
      },
      onStopClick()
      {
        this.receiving=false;
      }

  },
  async mounted() {

    let test = await getAvailableAlgo();
    this.algoNames = test.toString().split(',')
  },
  created() {
    this.$on("testEvent",(index)=>{console.log("ouiiii"+index)})

  },
  watch:{
    mementoInstance(){
      console.log("UPDATED DANS VSORT + ");
      console.log(this.mementoInstance.mementos)
      this.$emit('updatedData',this.mementoInstance);
    }
  }

}
</script>

<style scoped>

</style>