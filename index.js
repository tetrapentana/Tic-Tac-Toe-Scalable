$(document).ready(function(){
	let settleTheGame = new Array();
	let maxBoardSize = 12;
	let minBoardSize = 3;
	let gameBoard = $('#gameBoard');
	let gameStart = $('.game-start');
	let game = $('#game');
	let currentPlayer = 0;
	let moveCount = 0;
	const player = ['X','O'];
	const score = [0,0];

// Settle up the game
function setUpTheGame(){
	settleTheGame = new Array(boardSize * 2 + 2); 
	settleTheGame.fill(0)
}		
 

// Max square size
function letMaxSquareSize(){
	let	maxSize = 600,
		squareSize = 100; // Default squareSize
	
	if(boardSize * 100 > maxSize){
		squareSize = Math.floor(maxSize / boardSize);
	}

	return squareSize;
}

// Displaying the Board
function makeBoard(){
	let squareSize = letMaxSquareSize(); // Square Size

	game.width(boardSize * squareSize + 50);	// correcting the width size because the li tag has been appended

	for(a = 0; a < boardSize; a++){
		for(b = 0; b < boardSize; b++){
			game.append('<li data-row='+ a +' data-col='+ b +'></li>'); // here we put the squeres using list item inside the game div
		}
	}

	game.find('li')
		.width(squareSize)
		.height(squareSize);

	gameBoard.fadeOut();
}

// Update Board Size
function resizeBoardSize(size){
	boardSize = size > maxBoardSize ? maxBoardSize : size < minBoardSize ? minBoardSize : size; // 
	setUpTheGame();
	makeBoard();
}

// Result Win Condition
function resultWin(row, col, player){
	let adding = (player == 0) ? -1 : 1    // -1 for 'O' and +1 for player 'X'

	// row changes
	settleTheGame[row] += adding

	// column changes
	settleTheGame[boardSize + col] += adding

	// first diagonal changes
	if (row == col){
		settleTheGame[2 * boardSize] += adding 
	
		let newDiagonal = (boardSize + 1) / 2 == col ? true : false;
		
			if(newDiagonal){
				settleTheGame[2 * boardSize + 1] += adding
			}
		// console.log(settleTheGame);
		}


	// second diagonal changes
	if (row + col == boardSize + 1)
		settleTheGame[2 * boardSize + 1] += adding

		let a = settleTheGame.indexOf(boardSize);
		let b = settleTheGame.indexOf(-boardSize);

		return (a >= 0 || b >= 0) ? true : false;
}
// console.log(player)
 
// Tell the winner
function tellWinner(player){
	if(player !== 'Tie Game'){
	$('#game').text('Player ' + player + ' Win');
	}else{
		$('#game').text('Tie Game');
	}
	$('.game-start').fadeIn();
	// console.log(player);
}

function tellTie(){
	$('#game').text('Tie Game');
	gameStart.fadeIn();
}

// Score Board
function scoreBoard(player){
	if(player === 1){
		score[1]++;
	}else {
		score[0]++;	
	}
	
	$('#score-x').text(score[0]);
	$('#score-o').text(score[1])
}

// Make sure the element is empty. so player cant change squere input twice
function ifVoid(cek){
	return !$.trim(cek.html()) 
} 

// Event start the game
$('#starting').on('click',function(){
	let size = parseInt($('#boardSize').val());
	resizeBoardSize(size);
});

// Game playing
function move(e){
	const cek = $(this);
		  row = cek.data('row');
		  col = cek.data('col');

	moveCount++;
	console.log(moveCount, (boardSize * boardSize));

	if(resultWin(row, col, currentPlayer)){
		tellWinner(player[currentPlayer]);
		scoreBoard(currentPlayer);
	}else if(moveCount === (boardSize * boardSize)){
		tellWinner('Tie Game');
	}


	if(ifVoid(cek)){
		if(currentPlayer === 0){
			cek.html('X');
			currentPlayer++;
		}else{
			cek.html('O');
			currentPlayer--;
		}

	}
	// console.log(currentPlayer);
}

// Restart the game
function restartTheGame(){
	boardSize = 0;
	gameBoard.fadeIn();
	settleTheGame = new Array('');
	game.html('');
	moveCount = 0;
	currentPlayer = currentPlayer ? 0 : 1;
}

// Event play and reset the game
	
	$('#game').on('click', 'li', move);
	$('#resetting').on('click', restartTheGame);

}); // End load script












