// Business Logic
function Game (){
  this.players = [];
  this.playerNumber = 0;
}

Game.prototype.addPlayer = function(playerObject){
  playerObject.id = this.playerNumber;
  this.playerNumber ++ ;
  this.players.push(playerObject);
}

Game.prototype.findPlayer = function(buttonClasslist){
  for( let i = 0; i < this.players.length; i++){
    if(buttonClasslist.includes(this.players[i].id)){
      return this.players[i].id;
    }
  }
}

function Player (name){
  this.name = name;
}
// User Logic

function gameStart(players_array){
  for(let i = 0; i < players_array.length; i ++){
    if(players_array.length === 2){
      $(".player-1").text(players_array[0].name);
      $(".player-2").text(players_array[1].name);
      switchUser();
      $("#form").hide();
      $("#game").show();
    }
  }
}

function switchUser (currentPlayer) {
  if (currentPlayer === 0) {
    $("#1").fadeOut();
    $("#2").fadeIn();
  } else {
    $("#2").fadeOut();
    $("#1").fadeIn();
  }
}

function addClickEvent(game){

  $(".buttons").on('click', 'button.roll', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    roll(currentPlayer);
  }); 
}

function roll(currentPlayer){
  let dice = document.getElementById("dice");
  let roll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = roll;
  if (roll === 1) {
    switchUser(currentPlayer);
  } else if (roll != 1) {

  }

}

$(document).ready(function() {
  let game = new Game();
  addClickEvent(game);
  $("#player-name").submit(function(event) {
    event.preventDefault();

    let name = $("input#player1").val();
    let player = new Player(name);
    game.addPlayer(player);
    gameStart(game.players);
    $("input#player1").val("");
  });
});