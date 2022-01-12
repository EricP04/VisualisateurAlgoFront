export function generateColorArray(arrayData, max,min){
    let colorArray = [];
    let oldRange = (max-min);
    let newRange = 510;
    let blueVal = 0;
    let redVal = 255;
    arrayData.forEach(function(item){
        console.log(((item-min)*newRange)/oldRange);
        blueVal = ((item-min)*newRange)/oldRange;
        redVal = 255;
        if(blueVal>255)
        {
            let diff = blueVal-255;
            blueVal=255;
            redVal=redVal-diff;
        }
        colorArray.push(rgbToHex(parseInt(redVal,10),0,parseInt(blueVal,0)).split('.')[0]);
    })
    console.log(colorArray);
    return colorArray;
}
function componentToHex(c)
{
    var hex = c.toString(16);
    return hex.length==1?"0"+hex:hex;
}
function rgbToHex(r,g,b)
{
    return "#"+componentToHex(r) + componentToHex(g)+componentToHex(b);
}