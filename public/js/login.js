$("#loginAlert").hide();


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
            sessionStorage.setItem("user", data);
            window.location.replace("/gamePlay");
        }
    });
});

// $("#")
