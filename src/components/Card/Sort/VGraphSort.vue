<script>
import {Bar} from 'vue-chartjs'
import {generateColorArray} from "@/jsFolder/colorUtil";
export default {
  name:"vGraphSort",
  extends:Bar,
  props: {
    dataArray: {type:Array, default:()=>[1,2,3,4,5,6,7,8,9,9,9,9,10000]},
    maxValue:Number,
    minValue :Number,
    options: {
      type: Object,
      default: ()=>({
        responsive: true,
        title:{display:false},
        scales:{
          xAxes:[{
            gridLines:{display:false},
          }],
          yAxes:[{
            gridLines:{display:false},
            ticks:{display:false},
            type:'logarithmic'
          }],
        },
        legend:{display:false},
        maintainAspectRatio:false,
        animation:{duration:0}
      })
    }

  },
  mounted() {
    this.renderChart({
      labels: this.dataArray,
          datasets: [ {
        backgroundColor: generateColorArray(this.dataArray,this.maxValue,this.minValue),
        data: this.dataArray}]},
        this.options)
  },
  watch:{
    dataArray(){
      this.renderChart({
            labels: this.dataArray,
            datasets: [ {
              backgroundColor: generateColorArray(this.dataArray,this.maxValue,this.minValue),
              data: this.dataArray}]},this.options
          )
    }
  }


}


</script>

<style scoped>

</style>