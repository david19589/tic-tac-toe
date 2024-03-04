const menu = document.getElementById("menu");
const Board = document.getElementById("solo");
const restartGame = document.getElementById("restart-game");
const roundTied = document.getElementById("round-tied");
const windowBacks = document.getElementsByClassName("back-of-windows");
const oLost = document.getElementById("o-lost");
const oWins = document.getElementById("o-wins");
const xLost = document.getElementById("x-lost");
const xWins = document.getElementById("x-wins");
const menuX = document.getElementById("x");
const menuO = document.getElementById("o");
const menuCpu = document.getElementById("cpu");
const menuPlayer = document.getElementById("player");
const P1 = document.getElementById("p1");
const P2 = document.getElementById("p2");
const P1Wins = document.getElementsByClassName("u-won");
const P2Wins = document.getElementsByClassName("u-lost");
const xScore = document.getElementById("xscore");
const tieScore = document.getElementById("tiescore");
const oScore = document.getElementById("oscore");
const turnXO = document.querySelector(".img-turn img");
const restart = document.getElementById("restart");
const miniBoxes = document.getElementsByClassName("mini-box");
const quit = document.getElementsByClassName("quit");
const nextRound = document.getElementsByClassName("next-round");
const noCancel = document.getElementById("no-cancel");
const yesRestart = document.getElementById("yes-restart");

let player1 = "x";
let playMode = "cpu";
let turn = "x";
let cpuTurn = false;
let freebutons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let arrayX = [];
let arrayO = [];
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const choice = (icon) => {
  if (icon === "x") {
    player1 = "x";
  } else {
    player1 = "o";
  }
};

const checkXWin = () => {
  return winningPattern.find((combination) =>
    combination.every((button) => arrayX.includes(button))
  );
};

const checkOWin = () => {
  return winningPattern.find((combination) =>
    combination.every((button) => arrayO.includes(button))
  );
};

const ifXWins = () => {
  if (player1 === "x") {
    xWins.style.display = "flex";
    Board.style.opacity = 0.5;
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "block";
    }
    scoreX++;
    xScore.textContent = scoreX;
  } else {
    oLost.style.display = "flex";
    Board.style.opacity = 0.5;
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "block";
    }
    scoreX++;
    xScore.textContent = scoreX;
  }
};

const ifOWins = () => {
  if (player1 === "o") {
    oWins.style.display = "flex";
    Board.style.opacity = 0.5;
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "block";
    }
    scoreO++;
    oScore.textContent = scoreO;
  } else {
    xLost.style.display = "flex";
    Board.style.opacity = 0.5;
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "block";
    }
    scoreO++;
    oScore.textContent = scoreO;
  }
};

const winStyle = (array) => {
  if (turn === "x") {
    miniBoxes[array[0]].style.backgroundColor = "#31C3BD";
    miniBoxes[array[1]].style.backgroundColor = "#31C3BD";
    miniBoxes[array[2]].style.backgroundColor = "#31C3BD";
    miniBoxes[array[0]].firstElementChild.src = "assets/icon-x-win.svg";
    miniBoxes[array[1]].firstElementChild.src = "assets/icon-x-win.svg";
    miniBoxes[array[2]].firstElementChild.src = "assets/icon-x-win.svg";
  } else {
    miniBoxes[array[0]].style.backgroundColor = "#F2B137";
    miniBoxes[array[1]].style.backgroundColor = "#F2B137";
    miniBoxes[array[2]].style.backgroundColor = "#F2B137";
    miniBoxes[array[0]].firstElementChild.src = "assets/icon-o-win.svg";
    miniBoxes[array[1]].firstElementChild.src = "assets/icon-o-win.svg";
    miniBoxes[array[2]].firstElementChild.src = "assets/icon-o-win.svg";
  }
};

const hoverEffect = () => {
  for (let i = 0; i < freebutons.length; i++) {
    const playButtonIndex = freebutons[i];
    if (playMode !== "cpu") {
      if (turn === "x") {
        miniBoxes[playButtonIndex].classList.add("hoverX");
        miniBoxes[playButtonIndex].classList.remove("hoverO");
      } else {
        miniBoxes[playButtonIndex].classList.add("hoverO");
        miniBoxes[playButtonIndex].classList.remove("hoverX");
      }
    } else {
      if (player1 === "x") {
        miniBoxes[playButtonIndex].classList.add("hoverX");
        miniBoxes[playButtonIndex].classList.remove("hoverO");
      } else {
        miniBoxes[playButtonIndex].classList.add("hoverO");
        miniBoxes[playButtonIndex].classList.remove("hoverX");
      }
    }
  }
};

const createClickedFunction = () => {
  for (let i = 0; i < miniBoxes.length; i++) {
    miniBoxes[i].style.background = "";
    miniBoxes[i].innerHTML = "";
    miniBoxes[i].onclick = (e) => {
      e.target.classList.remove("hoverX");
      e.target.classList.remove("hoverO");
      const spliceIndex = freebutons.indexOf(i);
      freebutons.splice(spliceIndex, 1);
      const icon = document.createElement("img");
      icon.classList.add("playIcons");
      if (turn === "x") {
        icon.src = "assets/icon-x.svg";
        e.target.append(icon);
        arrayX.push(i);
        const win = checkXWin();
        if (win) {
          ifXWins();
          winStyle(win);
          return;
        }
        if (arrayX.length === 5) {
          roundTied.style.display = "flex";
          for (let i = 0; i < windowBacks.length; i++) {
            windowBacks[i].style.display = "flex";
          }
          Board.style.opacity = 0.5;
          scoreTie++;
          tieScore.textContent = scoreTie;
        }
        turn = "o";
        turnXO.src = "assets/icon-o-gray.svg";
      } else {
        icon.src = "assets/icon-o.svg";
        e.target.append(icon);
        arrayO.push(i);
        const win = checkOWin();
        if (win) {
          ifOWins();
          winStyle(win);
          return;
        }
        turn = "x";
        turnXO.src = "assets/icon-x-gray.svg";
      }
      hoverEffect();
      e.target.onclick = null;
    };
  }
};

const cpumode = () => {
  for (let i = 0; i < miniBoxes.length; i++) {
    miniBoxes[i].style.background = "";
    miniBoxes[i].innerHTML = "";
    miniBoxes[i].onclick = (e) => {
      const spliceIndex = freebutons.indexOf(i);
      freebutons.splice(spliceIndex, 1);
      if (playMode === "cpu") {
        if (player1 === "x") {
          const icon = document.createElement("img");
          icon.classList.add("playIcons");
          icon.src = "assets/icon-x.svg";
          e.target.append(icon);
          arrayX.push(i);
          const winX = checkXWin();
          if (winX) {
            ifXWins();
            winStyle(winX);
            return;
          }
          for (let i = 0; i < windowBacks.length; i++) {
            windowBacks[i].style.display = "flex";
          }
          if (arrayX.length === 5) {
            roundTied.style.display = "flex";
            Board.style.opacity = 0.5;
            scoreTie++;
            tieScore.textContent = scoreTie;
          }
          turn = "o";
          turnXO.src = "assets/icon-o-gray.svg";

          let placeForO;
          do {
            const randomIndex = Math.floor(Math.random() * freebutons.length);
            placeForO = freebutons[randomIndex];
          } while (arrayX.includes(placeForO) || arrayO.includes(placeForO));
          freebutons = freebutons.filter((box) => box !== placeForO);
          setTimeout(() => {
            const newIcon = document.createElement("img");
            newIcon.classList.add("playIcons");
            newIcon.src = "assets/icon-o.svg";
            miniBoxes[placeForO].appendChild(newIcon);
            arrayO.push(placeForO);
            const spawnedBox = miniBoxes[placeForO];
            spawnedBox.classList.remove("hoverX");
            spawnedBox.onclick = null;
            const winO = checkOWin();
            if (winO) {
              ifOWins();
              winStyle(winO);
              return;
            }
            turn = "x";
            turnXO.src = "assets/icon-x-gray.svg";

            for (let i = 0; i < windowBacks.length; i++) {
              windowBacks[i].style.display = "none";
            }
          }, 500);
        } else {
          const icon = document.createElement("img");
          icon.classList.add("playIcons");
          icon.src = "assets/icon-o.svg";
          e.target.append(icon);
          arrayO.push(i);
          const winO = checkOWin();
          if (winO) {
            ifOWins();
            winStyle(winO);
            return;
          }
          for (let i = 0; i < windowBacks.length; i++) {
            windowBacks[i].style.display = "flex";
          }
          if (arrayO.length === 5) {
            roundTied.style.display = "flex";
            Board.style.opacity = 0.5;
            scoreTie++;
            tieScore.textContent = scoreTie;
          }
          turn = "x";
          turnXO.src = "assets/icon-x-gray.svg";

          let placeForX;
          do {
            const randomIndex = Math.floor(Math.random() * freebutons.length);
            placeForX = freebutons[randomIndex];
          } while (arrayO.includes(placeForX) || arrayX.includes(placeForX));
          freebutons = freebutons.filter((box) => box !== placeForX);

          setTimeout(() => {
            const newIcon = document.createElement("img");
            newIcon.classList.add("playIcons");
            newIcon.src = "assets/icon-x.svg";
            miniBoxes[placeForX].appendChild(newIcon);
            arrayX.push(placeForX);
            const spawnedBox = miniBoxes[placeForX];
            spawnedBox.onclick = null;
            spawnedBox.classList.remove("hoverO");
            miniBoxes[i].classList.remove("hoverO");
            const winX = checkXWin();
            if (winX) {
              ifXWins();
              winStyle(winX);
              return;
            }
            turn = "o";
            turnXO.src = "assets/icon-o-gray.svg";

            for (let i = 0; i < windowBacks.length; i++) {
              windowBacks[i].style.display = "none";
            }
          }, 500);
        }
      }
      e.target.onclick = null;
    };
  }
};

menuX.addEventListener("click", (e) => {
  if (menuX) {
    if (menuX.classList !== "x active") {
      menuX.classList.add("active");
    }
    menuO.classList.remove("active");
    menuX.classList.remove("active-2");
    menuX.style.backgroundColor = "#A8BFC9";
    menuO.style.backgroundColor = "#1A2A33";
  }
});

menuO.addEventListener("click", (e) => {
  if (menuO) {
    if (menuO.classList !== "x active") {
      menuO.classList.add("active");
    }
    menuX.classList.add("active-2");
    menuO.style.backgroundColor = "#A8BFC9";
    menuX.style.backgroundColor = "#1A2A33";
  }
});

menuCpu.addEventListener("click", (e) => {
  cpumode();
  if (player1 === "x") {
    P1.textContent = "X(YOU)";
    P2.textContent = "O(CPU)";
  } else {
    P1.textContent = "X(CPU)";
    P2.textContent = "O(YOU)";
  }
});

menuPlayer.addEventListener("click", (e) => {
  createClickedFunction();
  if (player1 === "x") {
    P1.textContent = "X(P1)";
    P2.textContent = "O(P2)";
    for (let i = 0; i < P1Wins.length; i++) {
      P1Wins[i].textContent = "P1 WON!";
    }
    for (let i = 0; i < P2Wins.length; i++) {
      P2Wins[i].textContent = "P2 WON!";
    }
  } else {
    P1.textContent = "X(P2)";
    P2.textContent = "O(P1)";
    for (let i = 0; i < P2Wins.length; i++) {
      P2Wins[i].textContent = "P2 WON!";
    }
    for (let i = 0; i < P1Wins.length; i++) {
      P1Wins[i].textContent = "P1 WON!";
    }
  }
});

const startGame = (modeParam) => {
  menu.style.display = "none";
  Board.style.display = "block";
  playMode = modeParam;
  hoverEffect();
  cpumode();
  if (player1 === "o") {
    turnXO.src = "assets/icon-o-gray.svg";
  } else {
    turnXO.src = "assets/icon-x-gray.svg";
  }
};

for (let i = 0; i < quit.length; i++) {
  quit[i].addEventListener("click", (e) => {
    location.reload();
  });
}

for (let i = 0; i < nextRound.length; i++) {
  nextRound[i].addEventListener("click", (e) => {
    if (playMode !== "cpu") {
      startGame(playMode);
      createClickedFunction();
      Board.style.opacity = "";
      restartGame.style.display = "none";
      roundTied.style.display = "none";
      turnXO.src = "assets/icon-x-gray.svg";
      xWins.style.display = "none";
      oLost.style.display = "none";
      oWins.style.display = "none";
      xLost.style.display = "none";
      playMode = "player";
      turn = "x";
      freebutons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      arrayX = [];
      arrayO = [];
      for (let i = 0; i < windowBacks.length; i++) {
        windowBacks[i].style.display = "none";
      }
    } else {
      startGame(playMode);
      cpumode();
      Board.style.opacity = "";
      restartGame.style.display = "none";
      roundTied.style.display = "none";
      if (player1 === "o") {
        turnXO.src = "assets/icon-o-gray.svg";
      } else {
        turnXO.src = "assets/icon-x-gray.svg";
      }
      xWins.style.display = "none";
      oLost.style.display = "none";
      oWins.style.display = "none";
      xLost.style.display = "none";
      playMode = "cpu";
      turn = "x";
      freebutons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      arrayX = [];
      arrayO = [];
      for (let i = 0; i < windowBacks.length; i++) {
        windowBacks[i].style.display = "none";
      }
    }
    hoverEffect();
  });
}

const reset = () => {
  Board.style.opacity = 0.5;
  restartGame.style.display = "flex";
  for (let i = 0; i < windowBacks.length; i++) {
    windowBacks[i].style.display = "block";
  }
};

noCancel.addEventListener("click", (e) => {
  Board.style.opacity = "";
  restartGame.style.display = "none";
  for (let i = 0; i < windowBacks.length; i++) {
    windowBacks[i].style.display = "none";
  }
});

yesRestart.addEventListener("click", (e) => {
  if (playMode !== "cpu") {
    startGame();
    createClickedFunction();
    Board.style.opacity = "";
    restartGame.style.display = "none";
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "none";
    }
    player1 = "x";
    turnXO.src = "assets/icon-x-gray.svg";
    playMode = "player";
    turn = "x";
    freebutons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    arrayX = [];
    arrayO = [];
    scoreX = 0;
    scoreO = 0;
    scoreTie = 0;
    tieScore.textContent = 0;
    xScore.textContent = 0;
    oScore.textContent = 0;
    for (let i = 0; i < miniBoxes.length; i++) {
      miniBoxes[i].style.background = "";
      miniBoxes[i].innerHTML = "";
    }
  } else {
    startGame();
    cpumode();
    Board.style.opacity = "";
    restartGame.style.display = "none";
    for (let i = 0; i < windowBacks.length; i++) {
      windowBacks[i].style.display = "none";
    }
    if (player1 === "o") {
      turnXO.src = "assets/icon-o-gray.svg";
    } else {
      turnXO.src = "assets/icon-x-gray.svg";
    }
    playMode = "cpu";
    turn = "x";
    freebutons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    arrayX = [];
    arrayO = [];
    scoreX = 0;
    scoreO = 0;
    scoreTie = 0;
    tieScore.textContent = 0;
    xScore.textContent = 0;
    oScore.textContent = 0;
    for (let i = 0; i < miniBoxes.length; i++) {
      miniBoxes[i].style.background = "";
      miniBoxes[i].innerHTML = "";
    }
    hoverEffect();
  }
});
