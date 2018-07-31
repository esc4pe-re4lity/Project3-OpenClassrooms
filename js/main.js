diapo.initDiapo();
map.initMap();
$("#reserver").on("click", function(){
    $("#reserver").css("display", "none");
    $("#confirm-signature").css("display", "inline-block");
    canvas.initCanvas();
    $("#confirmer").css("display", "block");
});
$("#confirmer").on("click", function(){
    if (canvas.clickX.length !== 0 && canvas.clickY.length !== 0) {
        booking.initBooking();
        var i = true;
        canvas.clearCanvas(i);
        window.location = "#footer";
        $("#confirmer").css("display", "none");
        $("#reserver").css("display", "block");
    }
});
$("#erase").on("click", function(){
    var i = false;
    canvas.clearCanvas(i);
});
booking.countDown();

