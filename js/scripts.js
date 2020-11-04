// Business Logic
function Game (){
  this.players = [];
  this.playerNumber = 0;
}

Game.prototype.addPlayer = function(playerObject){
  playerObject.id = this.playerNumber;
  this.playerNumber ++ ;
  this.players.push(playerObject);
  console.log(playerObject);
}


function Player (name){
  this.name = name;
}
// User Logic

function gameStart(players_array){
  for(let i = 0; i < players_array.length; i ++){
    if(players_array.length === 2){
      $(".player-1").text(players_array[0].name);
      $("#card1").append("<div> <button class= 'roll " + players_array[0].id + "'>Roll</button> <button class= 'hold "+ players_array[0].id +"'>Hold</button><div>");
      $(".player-2").text(players_array[1].name);
      $("#card2").append("<div> <button class= 'roll " + players_array[1].id + "'>Roll</button> <button class= 'hold "+ players_array[1].id +"'>Hold</button></div>");
      $("#form").hide();
      $("#game").show();
    }
  }
}

function roll(){
  let dice = document.getElementById("dice");
  let roll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = roll;
  if (roll === 1) {

  } else if (roll != 1) {

  }

}

$(document).ready(function() {
  let game = new Game();
  $("#player-name").submit(function(event) {
    event.preventDefault();

    let name = $("input#player1").val();
    let player = new Player(name);
    game.addPlayer(player);
    gameStart(game.players);
    $("input#player1").val("");
  });
});