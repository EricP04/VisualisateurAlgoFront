export function generateRandomVectorBounded(len, min, max){
    var a = []
    for (var i=0;i<len;i++)
    {
        a[i]= Math.floor(Math.random() * (max-min))+parseInt(min)
    }
    return a;
}