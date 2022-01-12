export var storedArrayMemento = function(array, algoName, comparison, swap,min,max)
{
    this.array = array;
    this.algoName = algoName;
    this.comparison = comparison;
    this.swap = swap;
    this.min = min;
    this.max = max;
}

storedArrayMemento.prototype={
    hydrate : function(){
        var memento = JSON.stringify(this);
        return memento;
    },
    dehydrate: function(memento){
        var m = JSON.parse(memento);
        this.array = m.array
        this.algoName = m.algoName;
        this.comparison = m.comparison;
        this.swap = m.swap;
        return m;
    }
}

export var CareTaker = function(){
    this.mementos = {};
    this.key = 0;
    this.push = function (memento) {
        if(this.key <5)
            this.mementos[this.key++] = memento.hydrate();
        else{
            var tmp = this.mementos;
            this.mementos ={};
            this.key = 0;
            Object.keys(tmp).forEach(key=>{
                if(key != 0)
                    this.mementos[this.key++]=tmp[key];
            });
            this.mementos[this.key++]=memento.hydrate();
        }
        console.log(this.mementos)
    },
        this.get = function (key) {
            console.log(new storedArrayMemento(null,null,null,null,null,null).dehydrate(this.mementos[key]));
            return new storedArrayMemento(null,null,null,null,null,null).dehydrate(this.mementos[key]);
        }
}
