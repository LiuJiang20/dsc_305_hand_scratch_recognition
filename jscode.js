

var test = window.devicePixelRatio;

var canvas = document.getElementById("c1");
var context = canvas.getContext("2d");

var counter=3

function argSort(array){
    var indexlist=[]
    for (i=0;i<10;i++){
        indexlist.push([i,array[i]])
    }
    indexlist.sort(
        function(a,b){
            return b[1]-a[1] 
        }
    )
    var results=indexlist.map(x => x[0])

    return results
}

var getInput=function(){
   var canvas = document.getElementById("c1")
   var ctx=canvas.getContext("2d")
   var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
   console.log(data)
   var result=[]
   for (i=3;i<data.length;i+=4){
       result.push(data[i])
       
   }
    console.log(result)
    //var finput=distort(result)
    var input=tf.tensor(result,[1,512,512,1])
    var input2=tf.maxPool(input,2,2,0) //256
    var input3=tf.maxPool(input2,2,2,0) //128
    var input4=tf.maxPool(input3,2,2,0) //64
    var input5=tf.maxPool(input4,2,2,0) //32
    var input6=input5.reshape([32,32])
    var input7=tf.slice(input6,[2,2],[28,28])
    var finput=input7.reshape([1,28,28,1])
    console.log(finput.dataSync())
    return finput
}

async function getAnswer(){
        console.log('start');
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/LiuJiang20/dsc_305_hand_scratch_recognition/master/ten_class/model.json');
        console.log(model);
        console.log('done');

            var input=getInput()
            const prediction = model.predict(input);
            var inputList=prediction.dataSync()
            var results=argSort(inputList)
            
            const labelMap = new Map([
                [0, "banana"],
                [1, "book"],
                [2, "car"],
                [3, "clock"],
                [4, "cloud"],
                [5, "hand"],
                [6, "knife"],
                [7, "pants"],
                [8, "stop sign"],
                [9, "sweater"]]);
            
            results=results.map(x => labelMap.get(x))
            console.log(results)
            return results
            
  }
 
function guess(answer){

        if(counter==3){
            d3.select("#description")
            .text("Is this a "+ answer[0]+" ?")
        }
        else if(counter=2){
            d3.select("#description")
            .text("Is this a "+ answer[1]+" ?")
        }
        else if(counter=1){
            d3.select("#description")
            .text("Is this a "+ answer[2]+" ?")
        }
}            
             

window.onload = function () {
    
    canvas.onmousedown = function (ev) {
        var ev = ev || window.event;
        context.moveTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
        //ev.clientX-oC.offsetLeft,ev.clientY-oC.offsetTop鼠标在当前画布上X,Y坐标
        
        document.onmousemove = function (ev) {
                var ev = ev || window.event;//获取event对象
                context.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
                context.stroke();
                    };
        
        canvas.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                };
        // use guess button
        d3.select('#guess').attr("class","normal");
        // disable buttons
        d3.select('#changelist')
         .attr("class","disabled");
            };
        
    };

// retry button click
document.getElementById("retry").addEventListener('click',function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    // disable buttons
     d3.select('#guess')
         .attr("class","disabled");
    
    d3.select('#T')
         .attr("class","disabled");
    
    d3.select('#F')
         .attr("class","disabled");
    
    // ennable buttons
    d3.select('#changelist')
         .attr("class","normal");
    
    d3.select("#mood")
        .attr("src","./imgs/counter3.gif")
},false);

// items list
var items=['sweater', 'book', 'cloud', 'stop_sign', 'knife', 'banana', 'hand', 'pants', 'clock', 'car']

// draw item table
d3.select("#items")
    .selectAll("td")
    .data(items)
    .enter()
    .append("td")
    .text(function(i){
    return i;
})

d3.select("#guess")
    .text("Guess "+counter+"/3")
    .on("click",function(){
        var answer=getAnswer()
        answer.then(guess)
    
    
        d3.select("#retry")
           .attr("class","disabled")
    
        d3.select("#T")
        .attr("class","normal")
    
        d3.select("#F")
        .attr("class","normal")    
})

d3.select("#F")
.on("click",function(){
    if (counter>=1){
        counter=counter-1
        d3.select("#guess")
            .text("Guess "+counter+"/3")
        d3.select("#mood")
            .attr("src","./imgs/counter"+counter+".gif")
        
        if (counter!=3){
            d3.select("#description")
                .text("Please give me one more chance...")
        }
    }
    
    if (counter==0){
        d3.select("#retry")
           .attr("class","normal")
           .on("click",function(){
                counter=3
                d3.select("#guess")
                   .text("Guess "+counter+"/3")
                console.log(counter)})
        d3.select("#guess")
           .attr("class","disabled")
        d3.select("#T")
           .attr("class","disabled")
        d3.select("#F")
           .attr("class","disabled")
        d3.select("#changelist")
           .attr("class","normal")
        d3.select("#description")
                .text("I'm so sorry, I have no idea what u are drawing about...")
         } 
    })

d3.select("#T")
    .on("click",function(){
            d3.select("#retry")
              .attr("class","normal")
    
            counter=3
            d3.select("#guess")
              .text("Guess "+counter+"/3")
            console.log(counter)
            
            d3.select("#description")
                .text("Now you know why I am AI? yeahhhhh!")
    
            d3.select("#mood")
                .attr("src","./imgs/happy.gif")
    
})


