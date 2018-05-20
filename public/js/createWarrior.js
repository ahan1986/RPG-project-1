$("#pwAlert").hide();
$("#skillsAlertUnder").hide();
$("#skillsAlertOver").hide();
$("#warriorAlert").hide();
var password = "";
var password2 = "";

function validations() {
    var x = false;
    var y = false;
    var z = false;
    var a = false;

    if (password != password2) {
        $("#pwAlert").show();
    } else {
        x = true;
    }
    if (speed + health + strength > 15) {
        $("#skillsAlertOver").show();
    } else {
        y = true;
    }
    if (speed + health + strength < 15) {
        $("#skillsAlertUnder").show();
    } else {
        z = true;
    }
    if (warrior === null) {
        $("#warriorAlert").show();
    }
    if (x && y && z && a) {
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
    $("#pwAlert").hide();
    $("#skillsAlertUnder").hide();
    $("#skillsAlertOver").hide();
    $("#warriorAlert").hide();
    event.preventDefault();
    username = $("#userName").val().trim();
    password = $("#password").val().trim();
    password2 = $("#password2").val().trim();
    warrior = $("input[type='radio'][name='warrior']:checked").val();
    speed = parseInt($("#speed").val());
    health = parseInt($("#health").val());
    strength = parseInt($("#strength").val());

    validations()
});

