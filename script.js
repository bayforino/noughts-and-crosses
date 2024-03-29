const noughtsAndCrosses = (function () {
	//players module
	const players = (function () {
		const _playerFactory = (name, mark) => {
			return { name, mark };
		};

		const generatePlayers = function () {
			// player1 = playerFactory(prompt('Player 1 name?'), 'x');
			// player2 = playerFactory(prompt('player 2 name?'), 'o');
			player1 = _playerFactory("Player X", "x");
			player2 = _playerFactory("Player O", "o");
		};
		generatePlayers();

		let currentPlayer = player1;

		const changeCurrentPlayer = function () {
			if (players.currentPlayer == player1) {
				players.currentPlayer = player2;
			} else {
				players.currentPlayer = player1;
			}
		};

		const addCurrentPlayerInfo = function () {
			gameBoard.htmlEditor.htmlInfo.innerHTML = `${players.currentPlayer.name}'s turn`;
		};

		const getCurrentPlayerSign = function () {
			return players.currentPlayer.mark;
		};

		return {
			generatePlayers,
			currentPlayer,
			changeCurrentPlayer,
			addCurrentPlayerInfo,
			getCurrentPlayerSign,
		};
	})();

	//game board module
	const gameBoard = (function () {
		let index = ["", "", "", "", "", "", "", "", ""];
		const _addMarkToArray = function (cell) {
			let cellNumber = cell.id;
			gameBoard.index[cellNumber] = players.currentPlayer.mark;
		};

		//game board html editing module
		const htmlEditor = (function () {
			const _htmlBoard = document.getElementsByClassName("game-grid-cell");
			const htmlInfo = document.getElementById("main-info");
			const _resetButton = document.getElementById("reset-button");
			const _generateGameBoard = function () {
				for (let i = 0; i < _htmlBoard.length; i++) {
					if (gameBoard.index[i] != "") {
						_htmlBoard[i].innerHTML = `<p>${gameBoard.index[i]}</p>`;
					} else {
						_htmlBoard[i].innerHTML = "";
					}
				}
			};

			const addMark = function () {
				if (gameBoard.index[this.id] != "") {
					this.classList.add("flashing");
					setTimeout(() => this.classList.remove("flashing"), 400);
				} else {
					this.setAttribute("class", "game-grid-cell populated");
					_addMarkToArray(this);
					_generateGameBoard();
					_actionsAfterTurn();
				}
			};

			const _actionsAfterTurn = function () {
				game.turn++;
				game.checkWinner();
				if (game.win == false) {
					if (game.turn != 9) {
						players.changeCurrentPlayer();
						players.addCurrentPlayerInfo();
					} else {
						return;
					}
				} else {
					return;
				}
			};

			const _addEventListenersToCells = function () {
				for (let i = 0; i < _htmlBoard.length; i++) {
					const gridCell = _htmlBoard[i];
					gridCell.addEventListener("click", addMark, true);
				}
			};

			const removeEventListenersFromCells = function () {
				for (let i = 0; i < _htmlBoard.length; i++) {
					const gridCell = _htmlBoard[i];
					gridCell.removeEventListener("click", addMark, true);
				}
			};

			const addWinnerText = function () {
				gameBoard.htmlEditor.htmlInfo.innerHTML = `${players.currentPlayer.name} wins!`;
			};

			const addTieText = function () {
				gameBoard.htmlEditor.htmlInfo.innerHTML = `It's a tie!`;
			};

			const _buttonStyleOn = function () {
				_resetButton.classList.add("emboldened");
				_resetButton.style.border = "3px solid white";
			};

			const _buttonStyleOff = function () {
				_resetButton.classList.remove("emboldened");
				_resetButton.style.border = "";
			};

			const _addEventListenerToButtons = function () {
				_resetButton.addEventListener("click", resetGrid, true);
			};

			const resetGrid = function () {
				gameBoard.index = ["", "", "", "", "", "", "", "", ""];
				players.generatePlayers();
				players.currentPlayer = player1;
				game.turn = 0;
				game.win = false;
				_generateGameBoard();
				_resetCellClasses();
				initialiseDOM();
				_buttonStyleOff();
			};

			const _resetCellClasses = function () {
				for (let i = 0; i < _htmlBoard.length; i++) {
					const gridCell = _htmlBoard[i];
					gridCell.setAttribute("class", "game-grid-cell");
				}
			};

			const initialiseDOM = function () {
				_addEventListenersToCells();
				_addEventListenerToButtons();
				players.addCurrentPlayerInfo();
			};

			const endGameActions = function () {
				removeEventListenersFromCells();
				_buttonStyleOn();
				if (game.win == true) {
					addWinnerText();
				} else {
					addTieText();
				}
			};

			return {
				resetGrid,
				htmlInfo,
				initialiseDOM,
				removeEventListenersFromCells,
				endGameActions,
			};
		})();

		return {
			index,
			htmlEditor,
		};
	})();

	const game = (function () {
		let turn = 0;
		let win = false;
		let winner = "";

		// Winning combinations:
		// 			[0, 1, 2],
		// 			[3, 4, 5],
		// 			[6, 7, 8],
		// 			[0, 3, 6],
		// 			[1, 4, 7],
		// 			[2, 5, 8],
		// 			[0, 4, 8],
		// 			[2, 4, 6]

		const checkWinner = function () {
			const CheckWinnerActions = function () {
				game.win = true;
				gameBoard.htmlEditor.endGameActions();
			};

			// Checking for winning combinations

			if (
				(gameBoard.index[0] == "x" &&
					gameBoard.index[1] == "x" &&
					gameBoard.index[2] == "x") ||
				(gameBoard.index[0] == "o" &&
					gameBoard.index[1] == "o" &&
					gameBoard.index[2] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[3] == "x" &&
					gameBoard.index[4] == "x" &&
					gameBoard.index[5] == "x") ||
				(gameBoard.index[3] == "o" &&
					gameBoard.index[4] == "o" &&
					gameBoard.index[5] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[6] == "x" &&
					gameBoard.index[7] == "x" &&
					gameBoard.index[8] == "x") ||
				(gameBoard.index[6] == "o" &&
					gameBoard.index[7] == "o" &&
					gameBoard.index[8] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[0] == "x" &&
					gameBoard.index[3] == "x" &&
					gameBoard.index[6] == "x") ||
				(gameBoard.index[0] == "o" &&
					gameBoard.index[3] == "o" &&
					gameBoard.index[6] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[1] == "x" &&
					gameBoard.index[4] == "x" &&
					gameBoard.index[7] == "x") ||
				(gameBoard.index[1] == "o" &&
					gameBoard.index[4] == "o" &&
					gameBoard.index[7] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[2] == "x" &&
					gameBoard.index[5] == "x" &&
					gameBoard.index[8] == "x") ||
				(gameBoard.index[2] == "o" &&
					gameBoard.index[5] == "o" &&
					gameBoard.index[8] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[0] == "x" &&
					gameBoard.index[4] == "x" &&
					gameBoard.index[8] == "x") ||
				(gameBoard.index[0] == "o" &&
					gameBoard.index[4] == "o" &&
					gameBoard.index[8] == "o")
			) {
				CheckWinnerActions();
			} else if (
				(gameBoard.index[2] == "x" &&
					gameBoard.index[4] == "x" &&
					gameBoard.index[6] == "x") ||
				(gameBoard.index[2] == "o" &&
					gameBoard.index[4] == "o" &&
					gameBoard.index[6] == "o")
			) {
				CheckWinnerActions();
			} else if (game.turn === 9) {
				// It's a tie
				gameBoard.htmlEditor.endGameActions();
			} else {
				return;
			}
		};
		return {
			win,
			checkWinner,
			turn,
			winner,
		};
	})();
	gameBoard.htmlEditor.initialiseDOM();
})();
