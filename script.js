const game = (function () {
    let player1 = {};
    let player2 = {};
    const playerFactory = (name, mark) => {
        return { name, mark};
    };
    const generatePlayers = (function () {
        // player1 = playerFactory(prompt('Player 1 name?'), 'x');
        // player2 = playerFactory(prompt('player 2 name?'), 'o');
        player1 = playerFactory('jeff', 'x');
        player2 = playerFactory('jim', 'o');
    });
    const addInfo = (function () {
        const htmlInfo = document.getElementById('main-info');
        htmlInfo.innerHTML = player1.name;
    });
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const addMarkToArray = (function (cell) {
      console.log(cell.id);
      let cellNumber = cell.id;
      gameBoard[cellNumber] = currentPlayer;
  });
  let currentPlayer = "x";
  const addMark = (function() {
    if (this.className == "game-grid-cell populated") {
      alert(`that one's taken!`);
    } else {
        addMarkToArray(this);
      this.innerHTML = currentPlayer;
      this.setAttribute("class", "game-grid-cell populated");
      if (currentPlayer == "x") {
        currentPlayer = "o";
      } else {
        currentPlayer = "x";
      }
    }
  });
  const htmlBoard = document.getElementsByClassName("game-grid-cell");
  const addEventListenersToCells = (function () {
    for (let i = 0; i < htmlBoard.length; i++) {
      console.log(`added event listener to ${htmlBoard[i]}`);
      const gridCell = htmlBoard[i];
      gridCell.addEventListener("click", addMark, true);
    }
  })();
  
  generatePlayers();
  addInfo();
  return {
      gameBoard
  }
})();