// Just a whole lot of functions (Most functions)

//Does the tile clicks
function on_click() {
  if (
    !play_game &&
    !document.querySelector(".tile:hover").classList.contains("locked") &&
    !document.querySelector(".tile:hover").classList.contains("goal") &&
    !document.querySelector(".tile:hover").classList.contains("player") &&
    !document.querySelector(".tile:hover").classList.contains("enemy")
  ) {
    var object = document.querySelector(".tile:hover");
    if (
      object.classList.contains("empty_tile") &&
      class_to_apply != "empty_tile"
    ) {
      blocks_placed += 1;
    } else if (
      !object.classList.contains("empty_tile") &&
      class_to_apply == "empty_tile"
    ) {
      blocks_placed -= 1;
    }
    object.classList = "tile " + class_to_apply;
  }
  update_blocks_placed();
  if (play_game) {
    var object = document.querySelector(".tile:hover");
  }
}

//Does the button clicks
function lvl_buttons() {
  var object = document.querySelector(".button:hover");
  if (!play_game) {
    if (object.id == "101") {
      class_to_apply = "bounce";
    }
    if (object.id == "102") {
      class_to_apply = "wall";
    }
    if (object.id == "103") {
      class_to_apply = "arrow right";
    }
    if (object.id == "104") {
      class_to_apply = "arrow left";
    }
    if (object.id == "105") {
      class_to_apply = "arrow up";
    }
    if (object.id == "106") {
      class_to_apply = "arrow down";
    }

    if (object.id == "107") {
      class_to_apply = "empty_tile";
    }

    if (object.id == "108") {
      copy();
    }
    o_html_current_selected.classList = "button " + class_to_apply;
  }
  if (object.id == "109") {
    play_game = !play_game;
    if (!play_game) {
      reset_lvl();
    }
  }

  playing();
}

//Moves the player
function move_player(lvl_current, direction) {
  if (document.querySelector(".player") != null && play_game) {
    var player_location = lvl_current.indexOf("tile player " + direction);
    var can_move = true;
    /* Arrow detections */
    if (lvl_start[player_location].includes("arrow")) {
      if (lvl_start[player_location].includes("up")) {
        direction = "up";
      }
      if (lvl_start[player_location].includes("down")) {
        direction = "down";
      }
      if (lvl_start[player_location].includes("left")) {
        direction = "left";
      }
      if (lvl_start[player_location].includes("right")) {
        direction = "right";
      }
    }
    /* Move */

    /** Move directions */

    var move_amount;

    if (direction == "up") {
      move_amount = -9;
    }
    if (direction == "down") {
      move_amount = 9;
    }
    if (direction == "left") {
      move_amount = -1;
    }
    if (direction == "right") {
      move_amount = 1;
    }

    //bounce

    if (lvl_start[player_location].includes("bounce")) {
      move_amount = move_amount * 2;
      if (
        direction == "right" &&
        side_edge_tiles_right.indexOf(player_location + 1) != -1
      ) {
        can_move = false;
      } else if (
        direction == "left" &&
        side_edge_tiles_left.indexOf(player_location - 1) != -1
      ) {
        can_move = false;
      }
    }

    /**Move check */
    if (
      player_location + move_amount < 1 ||
      player_location + move_amount > 81
    ) {
      can_move = false;
    } else if (lvl_current[player_location + move_amount].includes("wall")) {
      can_move = false;
    } else if (!play_game) {
      can_move = false;
    } else if (
      direction == "right" &&
      side_edge_tiles_right.indexOf(player_location) != -1
    ) {
      can_move = false;
    } else if (
      direction == "left" &&
      side_edge_tiles_left.indexOf(player_location) != -1
    ) {
      can_move = false;
    } else if (lvl_current[player_location + move_amount].includes("enemy")) {
      move_amount *= -1;
    }

    //Direction Check

    if (move_amount ** 2 == 1 || move_amount ** 2 == 4) {
      if (move_amount > 0) {
        direction = "right";
      } else {
        direction = "left";
      }
    } else {
      if (move_amount > 0) {
        direction = "down";
      } else {
        direction = "up";
      }
    }

    if (can_move) {
      /** Acctual movement */
      lvl_current[player_location + move_amount] = "tile player " + direction;

      document.getElementById(String(player_location + move_amount)).classList =
        "tile player " + direction;

      if (lvl_start[player_location] != "tile player " + direction) {
        lvl_current[player_location] = lvl_start[player_location];
        document.getElementById(String(player_location)).classList =
          lvl_current[player_location];
      }
      if (
        lvl_start[player_location].includes("player") ||
        lvl_start[player_location].includes("enemy")
      ) {
        lvl_current[player_location] = default_tile;
        document.getElementById(String(player_location)).classList =
          default_tile;
      }

      if (lvl_start[player_location + move_amount].includes("arrow")) {
        document.getElementById(
          String(player_location + move_amount)
        ).classList.value += " arrow";
      }
      if (lvl_start[player_location + move_amount].includes("goal")) {
        document.getElementById(
          String(player_location + move_amount)
        ).classList.value += " goal";
      }
      if (lvl_start[player_location + move_amount].includes("bounce")) {
        document.getElementById(
          String(player_location + move_amount)
        ).classList.value += " bounce";
      }

      setTimeout(function () {
        if (can_move) {
          move_player(lvl_current, direction);
          move_enemy(lvl_current);
        } else {
          document.getElementById(String(player_location)).classList =
            "tile player " + direction;
          play_game = false;
        }
      }, 200);
    } else {
      document.getElementById(String(player_location)).classList =
        "tile player " + direction;
      if (!lvl_creator_mode) {
        if (play_game) {
          reset_lvl();
        }
      }
    }

    /**Goal Checker */
    if (
      lvl_start[lvl_current.indexOf("tile player " + direction)].includes(
        "goal"
      ) &&
      play_game
    ) {
      current_lvl += 1;
      if (!lvl_creator_mode) {
        load_lvl(current_lvl);
      }
      play_game = false;
    }
  } else {
    if (play_game) {
      reset_lvl();
    }
  }
}

//Moves the enemies
function move_enemy(lvl_current) {
  if (document.querySelector(".enemy") != null)
    document.querySelectorAll(".enemy").forEach(function (self) {
      var self_location = Number(self.id);
      var can_move = true;

      var direction = self.classList[2];

      /* Arrow detections */
      if (lvl_start[self_location].includes("arrow")) {
        if (lvl_start[self_location].includes("up")) {
          direction = "up";
        }
        if (lvl_start[self_location].includes("down")) {
          direction = "down";
        }
        if (lvl_start[self_location].includes("left")) {
          direction = "left";
        }
        if (lvl_start[self_location].includes("right")) {
          direction = "right";
        }
      }
      /* Move */

      /** Move directions*/

      var move_amount;

      if (direction == "up") {
        move_amount = -9;
      }
      if (direction == "down") {
        move_amount = 9;
      }
      if (direction == "left") {
        move_amount = -1;
      }
      if (direction == "right") {
        move_amount = 1;
      }

      if (lvl_start[self_location].includes("bounce")) {
        move_amount = move_amount * 2;
        if (
          direction == "right" &&
          side_edge_tiles_right.indexOf(self_location + 1) != -1
        ) {
          can_move = false;
        } else if (
          direction == "left" &&
          side_edge_tiles_left.indexOf(self_location - 1) != -1
        ) {
          can_move = false;
        }
      }

      /**Move check */
      if (self_location + move_amount < 1 || self_location + move_amount > 81) {
        move_amount = move_amount * -1;
      } else if (lvl_current[self_location + move_amount].includes("wall")) {
        move_amount = move_amount * -1;
      } else if (!play_game) {
        can_move = false;
      } else if (
        direction == "right" &&
        side_edge_tiles_right.indexOf(self_location) != -1
      ) {
        move_amount = move_amount * -1;
      } else if (
        direction == "left" &&
        side_edge_tiles_left.indexOf(self_location) != -1
      ) {
        move_amount = move_amount * -1;
      }
      print(lvl_current[self_location - move_amount]);
      if (
        (side_edge_tiles_right.indexOf(self_location) != -1 &&
          lvl_current[self_location - move_amount].includes("wall")) ||
        (side_edge_tiles_left.indexOf(self_location) != -1 &&
          lvl_current[self_location - move_amount].includes("wall")) ||
        (lvl_current[self_location - move_amount].includes("wall") &&
          self_location < 10) ||
        (lvl_current[self_location - move_amount].includes("wall") &&
          self_location > 72)
      ) {
        can_move = false;
      }
      //Direction Check

      if (move_amount ** 2 == 1 || move_amount ** 2 == 4) {
        if (move_amount > 0) {
          direction = "right";
        } else {
          direction = "left";
        }
      } else {
        if (move_amount > 0) {
          direction = "down";
        } else {
          direction = "up";
        }
      }

      if (can_move) {
        /** Acctual movement */
        lvl_current[self_location + move_amount] = "tile enemy " + direction;

        document.getElementById(String(self_location + move_amount)).classList =
          "tile enemy " + direction;

        if (lvl_start[self_location + move_amount].includes("arrow")) {
          document.getElementById(
            String(self_location + move_amount)
          ).classList.value += " arrow";
        }
        if (lvl_start[self_location + move_amount].includes("goal")) {
          document.getElementById(
            String(self_location + move_amount)
          ).classList.value += " goal";
        }
        if (lvl_start[self_location + move_amount].includes("bounce")) {
          document.getElementById(
            String(self_location + move_amount)
          ).classList.value += " bounce";
        }

        if (
          !lvl_start[self_location].includes("enemy") &&
          !lvl_start[self_location].includes("player")
        ) {
          lvl_current[self_location] = lvl_start[self_location];
          document.getElementById(String(self_location)).classList =
            lvl_start[self_location];
        }
        if (
          lvl_start[self_location].includes("enemy") ||
          lvl_start[self_location].includes("player")
        ) {
          lvl_current[self_location] = default_tile;
          document.getElementById(String(self_location)).classList =
            default_tile;
        }
      }
    });
}

//Im tired of wrighting console.log() to print text so I made my own function
function print(text) {
  //Prints the text in the console
  console.log(text);
}

//Loads the level
function load_lvl(lvl_to_load) {
  total_blocks_placed += [blocks_placed];
  blocks_placed = 0;
  update_blocks_placed();
  play_game = false;
  lvl_start = [];
  if (lvls.length < lvl_to_load) {
    print("S");
    document.querySelector("#game").classList += "invisible";
    document.querySelector("#ending").classList = "";
  } else {
    document.querySelectorAll(".tile").forEach(function (self) {
      var tile_to_be;
      var self_id = lvls[lvl_to_load - 1][Number(self.id) - 1];

      if (Math.abs(self_id) == 1) {
        tile_to_be = "tile empty_tile";
      }
      if (Math.abs(self_id) == 11) {
        tile_to_be = "tile player up";
      }
      if (Math.abs(self_id) == 12) {
        tile_to_be = "tile player right";
      }
      if (Math.abs(self_id) == 13) {
        tile_to_be = "tile player down";
      }
      if (Math.abs(self_id) == 14) {
        tile_to_be = "tile player left";
      }

      if (Math.abs(self_id) == 21) {
        tile_to_be = "tile arrow up locked";
      }
      if (Math.abs(self_id) == 22) {
        tile_to_be = "tile arrow right locked";
      }
      if (Math.abs(self_id) == 23) {
        tile_to_be = "tile arrow down locked";
      }
      if (Math.abs(self_id) == 24) {
        tile_to_be = "tile arrow left locked";
      }

      if (Math.abs(self_id) == 3) {
        tile_to_be = "tile wall locked";
      }

      if (Math.abs(self_id) == 4) {
        tile_to_be = "tile empty_tile locked";
      }

      if (Math.abs(self_id) == 5) {
        tile_to_be = "tile goal";
      }
      if (Math.abs(self_id) == 6) {
        tile_to_be = "tile bounce locked";
      }

      if (Math.abs(self_id) == 71) {
        tile_to_be = "tile enemy up";
      }
      if (Math.abs(self_id) == 72) {
        tile_to_be = "tile enemy right";
      }
      if (Math.abs(self_id) == 73) {
        tile_to_be = "tile enemy down";
      }
      if (Math.abs(self_id) == 74) {
        tile_to_be = "tile enemy left";
      }

      if (self_id < 0) {
        tile_to_be += " locked";
      }

      self.classList = tile_to_be;
    });

    if (lvl_desc[current_lvl - 1] != null) {
      o_html_lvl_desc.textContent = lvl_desc[current_lvl - 1];
    } else {
      o_html_lvl_desc.textContent = "";
    }

    o_html_lvl_text.textContent = "Niveau " + String(current_lvl);
  }
}

//copies the level to input it into the level loader also this is only in debug mode
function copy() {
  var final = "[";
  var tiles = Array.from(document.querySelectorAll(".tile"));
  while (tiles.length) {
    var temp = tiles[0].classList.value;
    tiles.shift();
    var to_add = "";

    if (temp.includes("locked")) {
      to_add += "-";
    }

    if (temp.includes("empty_tile")) {
      to_add += "1";
    }
    if (temp.includes("player")) {
      to_add += "1";
    }
    if (temp.includes("arrow")) {
      to_add += "2";
    }
    if (temp.includes("wall")) {
      to_add += "3";
    }
    if (temp.includes("goal")) {
      to_add += "5";
    }
    if (temp.includes("bounce")) {
      to_add += "6";
    }
    if (temp.includes("enemy")) {
      to_add += "7";
    }

    if (temp.includes("up")) {
      to_add += "1";
    }
    if (temp.includes("right")) {
      to_add += "2";
    }
    if (temp.includes("down")) {
      to_add += "3";
    }
    if (temp.includes("left")) {
      to_add += "4";
    }

    to_add += ",";

    final += to_add;
  }
  final += "]";
  navigator.clipboard.writeText(final);
}

// Resets the level
function reset_lvl() {
  play_game = false;
  document.querySelectorAll(".tile").forEach(function (self) {
    var tile_to_be;

    tile_to_be = lvl_start[self.id];

    self.classList = tile_to_be;
  });
}

//Updates the blocks placed counter
function update_blocks_placed() {
  o_html_blocks_placed.textContent = blocks_placed;
}
