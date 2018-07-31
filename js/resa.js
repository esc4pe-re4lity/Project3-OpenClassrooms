var booking = {
    minutes: document.getElementById("minutes"),
    secondes: document.getElementById("secondes"),
    station: document.getElementById("station"),
    intervalSecs: "",
    initBooking: function(){
        this.minutes.textContent = "20";
        this.secondes.textContent = "0";
        this.openSession(booking.minutes.textContent, booking.secondes.textContent);
        this.saveStation();
        this.station.textContent = sessionStorage.getItem("station");
        clearInterval(booking.intervalSecs);
        this.intervalSecs = setInterval(booking.countSecondes, 1000);
        $("#footer").css("display", "block");
    },
    saveStation: function(){
        var adresse = $("#station-name").text();
        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("station", adresse);
        }
    },
    openSession: function(saveMinutes, saveSecondes){
        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("minutes", saveMinutes);
            sessionStorage.setItem("secondes", saveSecondes);
        }
    },
    countDown: function(){
        var saveMinutes = sessionStorage.getItem("minutes"),
            saveSecondes = sessionStorage.getItem("secondes");
        if (saveMinutes === "0" && saveSecondes === "0"){
            $("#footer").css("display", "none");
        }
        else if (saveMinutes !== null && saveSecondes !== null){
            this.minutes.textContent = saveMinutes;
            this.secondes.textContent = saveSecondes;
            $("#station").text(sessionStorage.getItem("station"));
            clearInterval(booking.intervalSecs);
            this.intervalSecs = setInterval(booking.countSecondes, 1000);
            $("#footer").css("display", "block");
        }
    },
    countSecondes: function(){
        var counterMinutes = Number(this.minutes.textContent),
            counterSecondes = Number(this.secondes.textContent);
        if (counterSecondes === 0 && counterMinutes === 0){
            booking.openSession(counterMinutes, counterSecondes);
            clearInterval(booking.intervalSecs);
            $("#footer p").text("Votre réservation n'est plus active");
        } else if (counterSecondes === 0){
            counterSecondes = 59;
            this.secondes.textContent = counterSecondes;
            counterMinutes--;
            this.minutes.textContent = counterMinutes;
            booking.openSession(counterMinutes, counterSecondes);
        } else {
            counterSecondes--;
            this.secondes.textContent = counterSecondes;
            booking.openSession(counterMinutes, counterSecondes);
        }
    }
}

