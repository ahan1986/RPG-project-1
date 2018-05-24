$(document).ready(function() {
    if ($("#lpJumbotron").length < 1) return;
    $("#loginAlert").hide();
    // This may need to be initialized after js files are separated by page
    // sessionStorage.clear();
    
    $("#loginSubmit").click(function () {
        $("#loginAlert").hide();
        username = $("#loginUN").val().trim();
        password = $("#loginPW").val().trim();
    
        var user = {
            username: username,
            password: password
        }
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: user
        }).then(function (data) {
            console.log(data);
            if (data === null){
                $("#loginAlert").show();
            } else {
                sessionStorage.setItem("user", JSON.stringify(data));
                window.location.replace("/gamePlay");
            }
        });
    });
})

const opponentLength = random.length;
                const randomOpponent = [];
                for (var i = 0; i < opponentLength; i++) {
                    if (random[i].dataValues.username !== player) {
                        randomOpponent.push(random[i].dataValues);
                    }  }
                const bobby = Math.floor(Math.random() * randomOpponent.length);
                res.json(randomOpponent[bobby]);
            });




