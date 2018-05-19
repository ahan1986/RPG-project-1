// User name and pw validation
var username = "";
var password = "";
var password2 = "";

$("#cwSubmit").click(function () {
    event.preventDefault();
    username = $("#userName").val().trim();
    password = $("#password").val().trim();
    password2 = $("#password2").val().trim();
    warrior = $("input[type='radio'][name='warrior']:checked").val();

   console.log();
});

