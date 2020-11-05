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
      return this.players[i];
    }
  }
}

function Player (name){
  this.name = name;
  this.total= 0;
  this.score = 0;
  this.wins = 0;
}

Player.prototype.newScore = function(roll){
  this.score += roll;
  return this.score;
}

Player.prototype.winner = function(){
  if (this.total + this.score >= 50) {
    $(`.wins.${this.id}`).text(this.wins++);
  }
}

// User Logic

function gameStart(players_array){
  for(let i = 0; i < players_array.length; i ++){
    if(players_array.length === 2){
      $(".player-1").text(players_array[0].name);
      $(".player-2").text(players_array[1].name);
      $("#2").hide();
      $("#form").hide();
      $("#game").show();
    }
  }
}

function switchUser (currentPlayer) {
  currentPlayer.score = 0;
  if (currentPlayer.id === 0) {
    $("#1").hide();
    $("#2").show();
  } else {
    $("#2").hide();
    $("#1").show();
  }
}

function addClickEvent(game){
  $(".buttons").on('click', 'button.roll', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    roll(currentPlayer);
  }); 
  $(".buttons").on('click', 'button.hold', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    hold(currentPlayer);
  })
  
}

function roll(currentPlayer){
  let dice = document.getElementById("dice");
  let roll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = roll;
  if (roll === 1) {
    $("#score").text("Round Total: "+ 0);
    switchUser(currentPlayer);
  } else if (roll != 1) {
    currentPlayer.newScore(roll);
    $("#score").text("Round Total: "+ currentPlayer.score);
    currentPlayer.winner();
  }
}
// span id targeting needs work
function hold(currentPlayer){
  currentPlayer.total += currentPlayer.score;
  currentPlayer.winner();
  $(`.total.${currentPlayer.id}`).text(currentPlayer.total);
  switchUser(currentPlayer);
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