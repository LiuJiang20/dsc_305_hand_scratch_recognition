var test = window.devicePixelRatio
            console.log(test);

window.onload = function () {
    var oC = document.getElementById('c1');
    var oCG = oC.getContext('2d');
    
    oC.onmousedown = function (ev) {
        var ev = ev || window.event;
        oCG.moveTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
        //ev.clientX-oC.offsetLeft,ev.clientY-oC.offsetTop鼠标在当前画布上X,Y坐标
        
        document.onmousemove = function (ev) {
                var ev = ev || window.event;//获取event对象
                oCG.lineTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
                oCG.stroke();
                    };
        
        oC.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                };
        
            };
    };

var items=['foot','hand','hedgehog','horse','line',' microphone','skull','steak','table','telephone','filp flops']

d3.select("#items")
    .selectAll("td")
    .data(items)
    .enter()
    .append("td")
    .text(function(i){
    return i;
})
