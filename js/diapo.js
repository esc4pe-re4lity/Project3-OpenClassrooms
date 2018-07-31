var diapo = {
    nbImg: 7,
    currentImg: 0,
    widthImg: 800,
    sign: "",
    initDiapo: function() {
        var leftKey = 37,
            rightKey = 39;
        this.sign = "+=";
        diapo.createDivImgs();
        diapo.showImgs(this.nbImg, this.currentImg, this.sign, 1);
        $(document).on("keydown", function(e) {
            if (e.keyCode === leftKey){
                diapo.slidePrev();
            } else if (e.keyCode === rightKey){
                diapo.slideNext();
            }
        });
        $("#prev").on("click", function(){
            diapo.slidePrev();
        });
        $("#next").on("click", function(){
            diapo.slideNext();
        });
    },
    createDivImgs: function(){
        for (i=1; i <= this.nbImg; i++){
            $("<div />", {
                "class": "slide-container",
                id: "slide"+ i
            }).insertBefore("#prev");
            $('<img src="images/velib-' + i + '.jpg" />').appendTo("#slide"+i);
        }
    },
    showImgs: function(numberOfImgs, currentImg, sign, trueOrFalse) {
        if (!trueOrFalse) {
            for (i=1; i <= diapo.nbImg; i++){
                $("#slide"+i).animate({
                    "left": sign + (diapo.widthImg * currentImg) + "px"
                }, 500);
            }
        }  else {
            for (i=1; i <= diapo.nbImg; i++){
                $("#slide"+i).css({
                    "left": sign + (diapo.widthImg * currentImg) + "px"
                }, 500);
                currentImg++;
            }
        }
    },
    animateImgs: function(sign){
        for (i=1; i <= diapo.nbImg; i++){
            var slide = $("#slide"+i);
            $("#slide"+i).animate({
                "left": sign + diapo.widthImg + "px"
            }, 500);
        }
    },    
    slidePrev: function() { 
        if (this.currentImg !== 0){ 
            this.sign = "+=";
            this.currentImg--;
            this.animateImgs(this.sign);
        }
    },
    slideNext: function() {
        if (this.currentImg < this.nbImg - 1){ 
            this.sign = "-=";
            this.currentImg++;
            this.animateImgs(this.sign);
        } else {
            this.sign = "+=";
            this.showImgs(this.nbImg, this.currentImg, this.sign);
            this.currentImg = 0;
        }
    }
};



