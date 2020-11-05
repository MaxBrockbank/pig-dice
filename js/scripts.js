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

Game.prototype.reset = function(){
  this.players.forEach(function(player){
    player.total = 0;
    player.score = 0;
  })
  $(".total").text('');
}

function Player (name){
  this.name = name;
  this.total= 0;
  this.score = 0;
  this.wins = 0;
  this.losses = 0;
}

Player.prototype.newScore = function(roll){
  this.score += roll;
  return this.score;
}

Player.prototype.winner = function(game){
  if (this.total >= 20 || this.score >=20) {
    this.wins++;
    $(`.wins.${this.id}`).text(this.wins);
    game.reset();
    switchUser(this);

    for(let i = 0; i < game.players.length; i++){
      if(game.players[i] !== this){
        game.players[i].losses ++;
        $(`.losses.${game.players[i].id}`).text(game.players[i].losses);
      }
    }
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
    roll(currentPlayer, game);
  }); 
  $(".buttons").on('click', 'button.hold', function(){
    let currentPlayer = game.findPlayer(this.classList[1]);
    hold(currentPlayer, game);
  })
  
}

function roll(currentPlayer, game){
  let dice = document.getElementById("dice");
  let roll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = roll;
  if (roll === 1) {
    $("#score").text("Round Total: "+ 0);
    switchUser(currentPlayer);
  } else if (roll != 1) {
    currentPlayer.newScore(roll);
    currentPlayer.winner(game);
    $("#score").text("Round Total: "+ currentPlayer.score);
  }
}

function hold(currentPlayer, game){
  currentPlayer.winner(game);
  currentPlayer.total += currentPlayer.score;
  currentPlayer.winner(game);
  $(`.total.${currentPlayer.id}`).text(currentPlayer.total);
  $("#score").text("Round Total: "+ 0);
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