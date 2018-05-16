base starting stats

health
speed
strength

level
un-used skill points


heavy attack
fast attack
block
dodge

add loss at the start of match to prevent reloading

block > fast attack
dodge > heavy attack
heavy attack = heavy attack
fast attack = fast attack

Combat System:
Player is presented will four combat choices: "Heavy Attack", "Fast Attack", "Block & Parry", "Dodge & Counter"
They pick and the computer will pick from the same choices.
Exact numbers will be determined by stats, percentages will be determined by how the choices affect each other.

Game-play loop:

API GET player stats
API GET opponent stats
API UPDATE wins/losses
IF(healthbars are above zero ) comabt-loop   
    player choice
    computer choice
    resolve choices
    update healthbars
    update UI
ELSE
    push opponent into an array
    check if (leveled === true)
        MODAL stats
        API UPDATE stats 
    ELSE
        API UPDATE stats

IF (play again === true){
    API GET opponent
    combat-loop
} ELSE {
    go to leaderboard
}




