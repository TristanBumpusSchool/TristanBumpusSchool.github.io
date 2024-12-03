//Main game loop

//Load first level
if (!lvl_creator_mode) {
  load_lvl(1);
}

//Functions

//Starts the playing loop
function playing() {
  if (play_game) {
    class_to_apply = "empty_tile";
    var player = document.querySelector(".player");
    if (player == null) {
      play_game = false;
    } else {
      var lvl_temp = Array.from(document.querySelectorAll(".tile"));
      lvl_start = [null];
      while (lvl_temp.length) {
        lvl_start.push(lvl_temp[0].classList.value);
        lvl_temp.shift();
      }
      var lvl_current = [...lvl_start];
      var player_classes = Array.from(player.classList);
      move_player(lvl_current, player_classes[2]);
    }
  }
}
