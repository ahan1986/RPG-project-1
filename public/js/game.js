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
    }

}