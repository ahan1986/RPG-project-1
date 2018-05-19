//login JS











//create warrior JS
$("#pwAlert").hide();
$("#skillsAlertUnder").hide();
$("#skillsAlertOver").hide();

var username = "";
var password = "";
var password2 = "";

function validations() {
    var x = false;
    var y = false;
    var z = false;

    if (password != password2) {
        $("#pwAlert").show();
    } else {
        x = true;
    }
    if (speed + health + strength > 15) {
        $("#skillsAlertOver").hide();
    } else {
        y = true;
    }
    if (speed + health + strength < 15) {
        $("#skillsAlertUnder").hide();
    } else {
        z = true;
    }
    if (x && y && z){
        sendUser();
    }
};

function sendUser() {
    var user = {
        username: username,
        password: password,
        avatarID: warrior,
        health: health,
        speed: speed,
        strength: strength,
    }
    $.ajax({
        method: "POST",
        url: "/api/user",
        data: user
    });
};

$("#cwSubmit").click(function () {
    event.preventDefault();
    username = $("#userName").val().trim();
    password = $("#password").val().trim();
    password2 = $("#password2").val().trim();
    warrior = $("input[type='radio'][name='warrior']:checked").val();
    speed = $("#speed").val();
    health = $("#health").val();
    strength = $("#strength").val();

    validations()
});

