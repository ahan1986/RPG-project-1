//No idea where this came from
// import { S_IFIFO } from "constants";
$("#newSkillsOver").hide();
$("#newSkillsOver").hide();
$("#newSkillsOver").hide();

var game = {
    player: undefined,
    opponent: undefined,
    playerChoice: undefined,
    computerChoice: undefined,
    opponentsFought: [],
    current: {
        maxPlayerHealth: undefined,
        playerHealth: undefined,
        maxOpponentHealth: undefined,
        opponentHealth: undefined,
        canAttack: false
    },
    initalize: function () {

        $(".combatBtn").on("click", game.getPlayerChoice)


        game.setPlayer()
    },
    setPlayer: function () {

        game.player = JSON.parse(sessionStorage.getItem("user"));
        game.current.MaxPlayerHealth = 25 + (5 * game.player.health)
        game.current.playerHealth = game.current.MaxPlayerHealth
        $("#playerName").text(game.player.username)
        $("#playerTextHP").html(`
        Level: ${game.player.level}
        <br>Experience: ${game.player.experience}/100
        <br>Strength: ${game.player.strength}
        <br>Speed: ${game.player.speed}
        <br>Current Health: ${game.current.playerHealth}/${game.current.MaxPlayerHealth}`)

        game.getOpponent()

    },
    getOpponent: function () {
        var data = {
            player: game.player.username,
            level: game.player.level,
            fought: game.opponentsFought
        }
        $.ajax({
            method: "post",
            url: "/api/opponent",
            data: data
        }).then(function (data) {
            game.opponent = data;
            game.current.MaxOpponentHealth = 25 + (5 * game.opponent.health)
            game.current.opponentHealth = game.current.MaxOpponentHealth

            $("#opponentName").text(game.opponent.username)
            $("#opponentTextHP").html(`
            Level: ${game.opponent.level}
            <br>Experience: ${game.opponent.experience}/100
            <br>Strength: ${game.opponent.strength}
            <br>Speed: ${game.opponent.speed}
            <br>Current Health: ${game.current.opponentHealth}/${game.current.MaxOpponentHealth}`)

            game.setLoss()
        });
    },
    setScore: function (character) {
        $.ajax({
            method: "PUT",
            url: "/api/update",
            data: character
        });
    },
    setLoss: function () {
        console.log("setloss running")
        game.player.losses++
        game.setScore(game.player)

        game.opponent.wins++
        game.setScore(game.opponent)

        game.combatLoop()
    },
    setWin: function () {
        console.log("setwin running")
        game.player.losses--
        game.player.wins++
        game.setScore(game.player)

        game.opponent.wins--
        game.opponent.losses++
        game.setScore(game.opponent)
    },
    setTie: function(){
        game.player.losses--
        game.setScore(game.player)

        game.opponent.wins--
        game.setScore(game.opponent)

    },
    combatLoop: function () {
        game.current.canAttack = true;

    },
    getPlayerChoice: function () {
        if (game.current.canAttack) {
            game.current.canAttack = false;
            game.playerChoice = $(this).attr("id");
            game.getComputerChoice();

        }
    },
    getComputerChoice: function () {
        var choice = Math.random()
        if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 75) {
            if (choice >= .75) {
                game.computerChoice = "heavy";
            } else if (choice >= .50) {
                game.computerChoice = "fast";
            } else if (choice >= .25) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 50) {
            if (choice >= .85) {
                game.computerChoice = "heavy";
            } else if (choice >= .60) {
                game.computerChoice = "fast";
            } else if (choice >= .35) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 25) {
            if (choice >= .90) {
                game.computerChoice = "heavy";
            } else if (choice >= .65) {
                game.computerChoice = "fast";
            } else if (choice >= .40) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else {
            if (choice >= .90) {
                game.computerChoice = "heavy";
            } else if (choice >= .80) {
                game.computerChoice = "fast";
            } else if (choice >= .40) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        }
        game.calcDamage();
    },
    calcDamage: function () {
        if (game.playerChoice === "block") {
            if (game.computerChoice === "block") {
                //damage dealt to player modified by choice
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .75))
                //damage dealt to opponent modified by choice
                game.current.opponentHealth -= Math.ceil((game.player.strength * .75))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .50))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            }
        } else if (game.playerChoice === "dodge") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .50))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .75))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .75))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            }
        } else if (game.playerChoice === "fast") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .25))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.5))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.5))
            }
        } else if (game.playerChoice === "heavy") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.5))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.5))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            }
        }

        game.updateHealthDisplay()

        if (game.current.playerHealth <= 0 || game.current.opponentHealth <= 0) {
            if (game.current.playerHealth <= 0 && game.current.opponentHealth <= 0) {
                //PLAYER TIES
                game.setTie()
                $("#result").text("You Tied!")
                game.player.experience += 25;
                game.opponent.experience +=25;
                game.checkIfLeveled(game.player)
                game.checkIfLeveled(game.opponent)

            } else if (game.current.playerHealth <= 0) {
                //PLAYER LOSES
                console.log("player loses")
                game.player.experience += 25;
                game.opponent.experience +=50;
                game.checkIfLeveled(game.player)
                game.checkIfLeveled(game.opponent)
                $("#result").text("You Lose!")

            } else {
                //PLAYER WINS
                console.log("player wins")
                game.player.experience += 50;
                game.opponent.experience +=25;
                game.checkIfLeveled(game.player)
                game.checkIfLeveled(game.opponent)
                
                game.setWin()
                $("#result").text("You Won!")
            }
            $("#resultModal").modal({backdrop: 'static', keyboard: false})

        } else {
            game.current.canAttack = true;
        }
    },
    updateHealthDisplay: function () {
        //update the player and opponent health displays
        $("#playerHP").css("width", game.healthbar(game.current.MaxPlayerHealth, game.current.playerHealth) + "%");
        $("#playerHP").css("background-color", game.healthbarColor(game.current.MaxPlayerHealth, game.current.playerHealth));
        $("#playerTextHP").html(`
        Level: ${game.player.level}
        <br>Experience: ${game.player.experience}/100
        <br>Strength: ${game.player.strength}
        <br>Speed: ${game.player.speed}
        <br>Current Health: ${game.current.playerHealth}/${game.current.MaxPlayerHealth}`)

        $("#opponentHP").css("width", game.healthbar(game.current.MaxOpponentHealth, game.current.opponentHealth) + "%");
        $("#opponentHP").css("background-color", game.healthbarColor(game.current.MaxOpponentHealth, game.current.opponentHealth));
        $("#opponentTextHP").html(`
        Level: ${game.opponent.level}
        <br>Experience: ${game.opponent.experience}/100
        <br>Strength: ${game.opponent.strength}
        <br>Speed: ${game.opponent.speed}
        <br>Current Health: ${game.current.opponentHealth}/${game.current.MaxOpponentHealth}`)

    },
    healthbar: function (max, health) {
        return ((100 / max) * health)
    },
    healthbarColor: function (max, health) {
        if (health <= max / 2 && health > max / 4) {
            return "yellow"
        } else if (health <= max / 4) {
            return "red"
        }
    },
    checkIfLeveled: function(character){
        if(character.experience <= 100){
            character.level++;
            character.skill_points += 3;
            character.experience -= 100;
        } 
    }

}

// modal js
$("#leaveRing").click(function (){
    window.location.replace("/");
});
$("#fightAgain").click(function (){
    window.location.replace("/gamePlay");
    // add something to update user info in local storage
    game.initalize();
});

game.initalize()