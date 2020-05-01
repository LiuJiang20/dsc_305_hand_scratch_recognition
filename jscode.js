

var test = window.devicePixelRatio;

var canvas = document.getElementById("c1");
var context = canvas.getContext("2d");

var counter=3

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
var items=['foot','hand','hedgehog','horse','line',' microphone','skull','steak','table','telephone','filp flops']

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
        if(counter==3){
            var target=canvas.toDataURL()
        }

        d3.select("#retry")
           .attr("class","disabled")
    
        d3.select("#T")
        .attr("class","normal")
    
        d3.select("#F")
        .attr("class","normal")
        
        //model calculation
        var answer="model answer"
        d3.select("#description")
            .text("This is a "+answer)
        
    
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


