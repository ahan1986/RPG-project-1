var game = {
    player: undefined,
    opponent: undefined,
    playerChoice: undefined,
    computerChoice: undefined,
    opponentsFought: [],
    current: {
        playerHealth: undefined,
        opponentHealth: undefined
    },
    initalize: function () {
        getPlayer()
        getOpponent()
        setLoss()
        combatLoop()
    },
    getPlayer: function () {

    },
    getOpponent: function () {

    },
    setLoss: function () {
        var score = {
            playerscore: --player.losses,
            opponenentscore: ++opponent.wins
        }
        $.ajax({
            method: "PUT",
            url: "/api/setScore",
            data: score
        });
    },
    combatLoop: function () {

    },
    getPlayerChoice: function () {

    },
    getComputerChoice: function () {
        var choice = Math.random()
        if ((game.current.opponentHealth / game.opponent.health) * 100 >= 75) {
            if (choice >= .75) {
                game.computerChoice = "heavy";
            } else if (choice >= .50) {
                game.computerChoice = "fast";
            } else if (choice >= .25) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((game.current.opponentHealth / game.opponent.health) * 100 >= 50) {
            if (choice >= .85) {
                game.computerChoice = "heavy";
            } else if (choice >= .60) {
                game.computerChoice = "fast";
            } else if (choice >= .35) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((game.current.opponentHealth / game.opponent.health) * 100 >= 25) {
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
    },
    calcDamage: function () {
        if (game.playerChoice === "block") {
            if (game.computerChoice === "block") {
                //damage dealt to player modified by choice
                game.current.playerHealth -= (game.opponent.strength * .75)
                //damage dealt to opponent modified by choice
                game.current.opponentHealth -= (game.player.strength * .75)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .50)
                game.current.opponentHealth -= (game.player.strength * .25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * .25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.strength * .25)
            }
        } else if (game.playerChoice === "dodge") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * 25)
                game.current.opponentHealth -= (game.player.speed * .50)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .75)
                game.current.opponentHealth -= (game.player.speed * .75)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.speed * .25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * .25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            }
        } else if (game.playerChoice === "fast") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.speed * .25)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.5)
                game.current.opponentHealth -= (game.player.speed * 1.5)
            }
        } else if (game.playerChoice === "heavy") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * .25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.strength * .25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.5)
                game.current.opponentHealth -= (game.player.strength * 1.5)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            }
        }
        updateHealthDisplay()
    },
    updateHealthDisplay: function(){
        //update player and opponent health
        $("#playerHP").css("width", game.healthbar(game.player.health, game.current.playerHealth)+"%");
        $("#playerHP").css("background-color", game.healthbarColor(game.player.health, game.current.playerHealth));

        $("#opponentHP").css("width", game.healthbar(game.opponent.health, game.current.opponentHealth)+"%");
        $("#opponentHP").css("background-color", game.healthbarColor(game.opponent.health, game.current.opponentHealth));
        
    },
    healthbar: function(max, health){
        return ((100 / max)*health)
    },
    healthbarColor: function(max, health){
        if(health <= max/2 && health > max/4){
            return "yellow"
        } else if (health <= max/4) {
            return "red"
        }
    }

}