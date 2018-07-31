var canvas = {
    paint: "",
    clickX: [],
    clickY: [],
    clickDrag: [],
    initCanvas: function(){
        $("#canvas").mousedown(function(e){
            canvas.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            canvas.redraw();
            canvas.paint = true;
        });
        $("#canvas").mouseup(function(e){
            canvas.paint = false;
        });
        $("#canvas").mousemove(function(e){
            if(canvas.paint){
                canvas.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                canvas.redraw();
            }
        });
        $("#canvas").mouseleave(function(e){
            canvas.paint = false;
        });
    },
    addClick: function(x, y, dragging){
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    },
    redraw: function(){
        var canvasElt = document.querySelector("#canvas"),
            context = canvasElt.getContext("2d");
        context.clearRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
        context.strokeStyle = "black";
        context.lineJoin = "round";
        context.lineWidth = 3;
        for (var i=0; i < this.clickX.length; i++){
            context.beginPath();
            if(this.clickDrag[i] && i){
                context.moveTo(canvas.clickX[i-1], canvas.clickY[i-1]);
            } else {
                context.moveTo(canvas.clickX[i]-1, this.clickY[i]);
            }
            context.lineTo(canvas.clickX[i], canvas.clickY[i]);
            context.closePath();
            context.stroke();
        }
    },
    clearCanvas: function(i){
        var canvasElt = document.querySelector("#canvas"),
            context = canvasElt.getContext("2d");
        context.clearRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        if (i === true){
            $("#confirm-signature").css("display", "none");
        }
    }
}