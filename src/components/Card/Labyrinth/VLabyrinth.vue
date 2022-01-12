<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <form class="align-content-center border-left">
            <div class="form-group">
              <label for="gridSizeLine">Lines</label>
              <input type="number" v-model="max" class="form-control" id="gridSizeLine" aria-describedby="gridSizeLineHelp" placeholder="Enter the number of lines"
                     min="1">
              <small id="gridSizeLineHelp" class="form-text text-muted">The line's numbers must be greater than 0</small>
            </div>
            <div class="form-group">
              <label for="gridSizeCol">Columns</label>
              <input type="number" v-model="min" class="form-control" id="gridSizeCol" aria-describedby="gridSizeColHelp" placeholder="Enter the number of columns" >
              <small id="gridSizeColHelp" class="form-text text-muted">The column's number must be greater than 0</small>
            </div>
            <div class="form-group">
              <label>Algo name</label>
              <select id="inputAlgoGenerateLabyrinthName" class="form-control"  @change="onChange($event)" v-model="algoSelected">
                <option v-for="algo in algoNames" :key="algo" v-bind:value="algo">
                  {{algo}}
                </option>
              </select>
            </div>
            <div>
              <button type="button" class="btn btn btn-secondary" v-on:click="setRandomVector(len,min,max)">Generate labyrinth</button>
            </div>
            <div class="form-group">
              <label>Labyrinth generation name</label>
              <select id="inputAlgoName" class="form-control"  @change="onChange($event)" v-model="algoSelected">
                <option v-for="algo in algoNames" :key="algo" v-bind:value="algo">
                  {{algo}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Labyrinth solver name</label>
              <select id="inputAlgoName" class="form-control"  @change="onChange($event)" v-model="algoSelected">
                <option v-for="algo in algoNames" :key="algo" v-bind:value="algo">
                  {{algo}}
                </option>
              </select>
            </div>
            <div class="justify-content-center">
              <button type="button" class="btn btn-primary" v-on:click="testAlgo(algoSelected,array)">Solve</button>
            </div>
          </form>
        </div>
        <div class="col">
          <div v-for="row in board" :key="row" class="grid-row">
            <div v-for="cell in row" :key="cell" class="grid-cell">
                <input type="text" v-bind:key="cell.num" v-model="cell.num" class="grid-cell-editor"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const board = [
  [{ num: 5 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 1 }, { num: 2 }],
  [{ num: 6 }, { num: 7 }, { num: 2 }, { num: 1 }, { num: 9 }, { num: 5 }, { num: 3 }, { num: 4 }, { num: 8 }],
  [{ num: 1 }, { num: 9 }, { num: 8 }, { num: 3 }, { num: 4 }, { num: 2 }, { num: 5 }, { num: 6 }, { num: 7 }],
  [{ num: 8 }, { num: 5 }, { num: 9 }, { num: 7 }, { num: 6 }, { num: 1 }, { num: 4 }, { num: 2 }, { num: 3 }],
  [{ num: 4 }, { num: 2 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 9 }, { num: 1 }],
  [{ num: 7 }, { num: 1 }, { num: 3 }, { num: 9 }, { num: 2 }, { num: 4 }, { num: 8 }, { num: 5 }, { num: 6 }],
  [{ num: 9 }, { num: 6 }, { num: 1 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 2 }, { num: 8 }, { num: 4 }],
  [{ num: 2 }, { num: 8 }, { num: 7 }, { num: 4 }, { num: 1 }, { num: 9 }, { num: 6 }, { num: 3 }, { num: 5 }],
  [{ num: 3 }, { num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 9 }]
];
export default {
  name: "VLabyrinth",
  data(){
    return (board)
  }
}
</script>

<style scoped>
.goal{
  background: green;
}
.player{
  background: yellow;
}
.empty{
  background: white;
}
.wall{
  background: black;
}
</style>