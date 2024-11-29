//handles all that creates the board and the game inputs

document
  .querySelector("#selected_container")
  .appendChild(o_html_current_selected);

document.addEventListener("keydown", function (event) {
  if (event.key == "e") {
    document.querySelector(".tile:hover").classList.value += " locked";
  }
  if (event.key == "q") {
    document.querySelector(".tile:hover").classList = "tile goal";
  }
  if (event.key == "x") {
    document.querySelector(".tile:hover").classList = "tile empty_tile";
  }

  if (event.key == "w") {
    document.querySelector(".tile:hover").classList = "tile player up";
  }
  if (event.key == "d") {
    document.querySelector(".tile:hover").classList = "tile player right";
  }
  if (event.key == "s") {
    document.querySelector(".tile:hover").classList = "tile player down";
  }
  if (event.key == "a") {
    document.querySelector(".tile:hover").classList = "tile player left";
  }

  if (event.key == "ArrowUp") {
    document.querySelector(".tile:hover").classList = "tile enemy up";
  }
  if (event.key == "ArrowRight") {
    document.querySelector(".tile:hover").classList = "tile enemy right";
  }
  if (event.key == "ArrowDown") {
    document.querySelector(".tile:hover").classList = "tile enemy down";
  }
  if (event.key == "ArrowLeft") {
    document.querySelector(".tile:hover").classList = "tile enemy left";
  }
  if (!lvl_creator_mode) {
    if (event.key == "n") {
      current_lvl += 1;
      load_lvl(current_lvl);
    }
    if (event.key == "r") {
      play_game = false;
      load_lvl(current_lvl);
    }
  }
});

/*Creation loop*/

while (i_creator_board > 0) {
  i_creator_board -= 1;
  var o_new = document.createElement("img");
  o_new.classList = default_tile;
  o_new.id = String(81 - i_creator_board);
  o_html_game_board.appendChild(o_new);

  o_new.addEventListener("click", on_click);
}

while (i_creator_buttons > 0) {
  i_creator_buttons -= 1;
  var o_new = document.createElement("img");
  o_new.classList = "button empty_tile";
  o_new.id = String(109 - i_creator_buttons);
  o_html_lvl_buttons.appendChild(o_new);

  o_new.addEventListener("click", lvl_buttons);

  switch (i_creator_buttons) {
    case 8:
      o_new.classList = "button bounce";
      break;
    case 7:
      o_new.classList = "button wall";
      break;
    case 6:
      o_new.classList = "button arrow right";
      break;
    case 5:
      o_new.classList = "button arrow left";
      break;
    case 4:
      o_new.classList = "button arrow up";
      break;
    case 3:
      o_new.classList = "button arrow down";
      break;
    case 1:
      o_new.classList = "button reset";
      break;
    case 0:
      o_new.classList = "button start";
      o_html_play_button = o_new;
      break;
  }
}
