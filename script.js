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
			const _generateGameBoard = function () {
				for (let i = 0; i < _htmlBoard.length; i++) {
					_htmlBoard[i].innerHTML = gameBoard.index[i];
				}
			};
			


			const addMark = function () {
				if (gameBoard.index[this.id] != "") {
					alert(`that one's taken!`);
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
				console.log(players.currentPlayer);
				players.changeCurrentPlayer();
				players.addCurrentPlayerInfo();
				
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
			}

			const _addEventListenerToButtons = function () {
				const resetButton = document.getElementById("reset-button");
				resetButton.addEventListener("click", resetGrid, true);
			};

			const resetGrid = function () {
				gameBoard.index = ["", "", "", "", "", "", "", "", ""];
				players.generatePlayers();
				players.currentPlayer = player1;
				game.turn = 0;
				_generateGameBoard();
				resetCellClasses();
				initialiseDOM();
			};

			const resetCellClasses = function () {
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

			return {
				resetGrid,
				htmlInfo,
				initialiseDOM,
				removeEventListenersFromCells
			};
		})();

		return {
			index,
			htmlEditor,
		};
	})();

	const game = (function () {
		let turn = 0;

		// const winConditions = [
		// 			[0, 1, 2],
		// 			[3, 4, 5],
		// 			[6, 7, 8],
		// 			[0, 3, 6],
		// 			[1, 4, 7],
		// 			[2, 5, 8],
		// 			[0, 4, 8],
		// 			[2, 4, 6],
		// 		];
		const checkWinner = function () {
			if (
				gameBoard.index[0] == "x" &&
				gameBoard.index[1] == "x" &&
				gameBoard.index[2] == "x"
			) {
				let winner = players.currentPlayer.name;
				//setTimeouts are to stop alerts firing at the wrong time
				setTimeout(function () {
					alert(`${winner} wins!!!`);
				}, 1);
					gameBoard.htmlEditor.removeEventListenersFromCells();
			} else if (game.turn === 9) {
				setTimeout(function () {
					alert(`Unfortunately it's a draw. I'm so sorry.`);
				}, 1);
					gameBoard.htmlEditor.removeEventListenersFromCells();
			} else {
				return;
			}
		};

		// const declareWinner = function () {
		// 	alert
		// }
		return {
			checkWinner,
			turn,
		};
	})();
	gameBoard.htmlEditor.initialiseDOM();
})();
