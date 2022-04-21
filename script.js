const game = (function () {




//players module
	const players = (function () {
		const _playerFactory = (name, mark) => {
			return { name, mark };
		};

		const _generatePlayers = function () {
			// player1 = playerFactory(prompt('Player 1 name?'), 'x');
			// player2 = playerFactory(prompt('player 2 name?'), 'o');
			player1 = _playerFactory("Player X", "x");
			player2 = _playerFactory("Player O", "o");
		};
		_generatePlayers();

		let currentPlayer = player1;
		const addInfo = function () {
			gameBoard.htmlEditor.htmlInfo.innerHTML = `${players.currentPlayer.name}'s turn`;
		};

		const getCurrentPlayerSign = function () {
			return players.currentPlayer.mark;
		};

		return {
			currentPlayer,
			addInfo,
			getCurrentPlayerSign
		};
	})();





//game board module
	const gameBoard = (function () {
		let index = ["", "", "", "", "", "", "", "", ""];
		const addMarkToArray = function (cell) {
			let cellNumber = cell.id;
			index[cellNumber] = players.currentPlayer.mark;
		};

	//game board html editing module
		const htmlEditor = (function () {
			const htmlBoard = document.getElementsByClassName("game-grid-cell");
			const htmlInfo = document.getElementById("main-info");
			const generateGameBoard = function () {
				for (let i = 0; i < htmlBoard.length; i++) {
					htmlBoard[i].innerHTML = index[i];
				}
			};
			generateGameBoard();

			const addMark = function () {
				if (index[this.id] != "") {
					alert(`that one's taken!`);
				} else {
					addMarkToArray(this);
					gameBoard.htmlEditor.generateGameBoard();
					// checkWinner(gameBoard.index);
					this.setAttribute("class", "game-grid-cell populated");
					if (players.currentPlayer == player1) {
						players.currentPlayer = player2;
					} else {
						players.currentPlayer = player1;
					}
					players.addInfo();
				}
			};

			const addEventListenersToCells = function () {
				for (let i = 0; i < htmlBoard.length; i++) {
					const gridCell = htmlBoard[i];
					gridCell.addEventListener("click", addMark, true);
				}
			};
			

			return {
				generateGameBoard,
				htmlBoard,
				htmlInfo,
				addEventListenersToCells
			}
		})();

		return {
			htmlEditor
		};
	})();

	// const declareWin = function () {
	// 	alert(`${players.currentPlayer.name} wins!`);
	// };

	// const checkWinner = (fieldIndex) => {
	// 	const winConditions = [
	// 		[0, 1, 2],
	// 		[3, 4, 5],
	// 		[6, 7, 8],
	// 		[0, 3, 6],
	// 		[1, 4, 7],
	// 		[2, 5, 8],
	// 		[0, 4, 8],
	// 		[2, 4, 6],
	// 	];
	// };



	gameBoard.htmlEditor.addEventListenersToCells()
	players.addInfo();
})();
