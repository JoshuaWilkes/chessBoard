
const EMPTY = -1;
const [ PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING ] = [0, 1, 2, 3, 4, 5];
const [ WHITE, BLACK ] = [0, 6];
const WHITE_TILE_COLOR = "silver";
const BLACK_TILE_COLOR = "maroon";
const pieceType = (n) => (n == -1 ? -1 : n % 6);
const pieceColour = (n) => (n - pieceType(n));
const BOARD = [
	[ BLACK + RUCK, BLACK + KNIGHT, BLACK + BISHOP, BLACK + QUEEN, BLACK + KING, BLACK + BISHOP, BLACK + KNIGHT, BLACK + RUCK ],
	[ BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN ],
	[ WHITE + RUCK, WHITE + KNIGHT, WHITE + BISHOP, WHITE + QUEEN, WHITE + KING, WHITE + BISHOP, WHITE + KNIGHT, WHITE + RUCK ]
];

/*
* Possible moves for pawn
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesPawn(board, posx, posy){
	//no validation of pieceNo yet
	//black : 1
	//white : -1
	var player = (board[posy][posx] < BLACK) ? -1:1;
	var moves = [];

	//within bounds
	if(boundaries(posy+player,posx)){
		//Forward movements
		if(board[posy + player][posx] == -1){
			//valid move 1 space forward
			moves.push([posy + player,posx]);
			//if its the first move
			if((player == 1 && posy == 1) || (player == -1  && posy == 6)) {
				if(board[posy + 2*player][posx] == -1){
					//first move, 2 space forward valid
					moves.push([posy + 2*player,posx]);
				}
			}
		}
	}

	//Capture movements
	var x = [-1,1];
	for(var i = 0; i < 2; i++){
		//boundary check
		if(boundaries(posy+player,posx+x[i])){
			var p = board[posy + player][posx + x[i]];
			//check if its an opponent piece
			if(p != -1 && capture(board[posy][posx],p)){
				moves.push([posy + player,posx + x[i]]);

			}
		}
	}
	return moves;
}
/*
* Possible moves for Ruck
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesRuck(board, posx, posy){
	//need to add teh castle move
	var moves = [];

	var posArr = [[posy,posx],[posy,posx],[posy,posx],[posy,posx]];
	for(var i = 1; i < 8; i++){
		//increment search
		//forwards backwards left right
		++posArr[0][0];
		--posArr[1][0];
		--posArr[2][1];
		++posArr[3][1];

		var thisMove = searchLines(board, posx, posy, posArr);
		//if no further moves found
		//stop searching
		if(thisMove.length === 0){
			break;
		}else {
			moves.concat(thisMove);
		}
	}
	return moves;
}
/*
* Possible moves for Knight
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesKnight(board, posx, posy){
	var moves = [];
	var posArr = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[1,-2],[-1,2],[-1,-2]];
	//forwards left
	var y = 0;
	var x = 0;
	for(var i = 0; i < 8; i++){
		y = posy + posArr[i][0];
		x = posx + posArr[i][1];
		if(boundaries(y,x)){
			if(capture(board[posy][posx],board[y][x])){
				moves.push([y,x]);
			}
		}
	}
	return moves;
}
/*
* Possible moves for Bishop
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesBishop(board, posx, posy){
	var moves = [];
	//forward-left forward-right back-left back-right
	var posArr = [[posy,posx],[posy,posx],[posy,posx],[posy,posx]];
	for(var i = 1; i < 8; i++){
		//if all searched terminated, stop iteration;
		//increment search
		//forward-left forward-right back-left back-right
		++posArr[0][0];
		--posArr[0][1];

		++posArr[1][0];
		++posArr[1][1];

		--posArr[2][0];
		--posArr[2][1];

		--posArr[3][0];
		++posArr[3][1];
		var thisMove = searchLines(board, posx, posy, posArr);
		//if no further moves found
		//stop searching
		if(thisMove.length === 0){
			break;
		}else {
			moves.concat(thisMove);
		}
	}
	return moves;
}
/*
* Possible moves for Queen
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesQueen(board, posx, posy){
	var moves = [];
	//up down left right
	moves.concat(posMovesRuck(board, posx, posy));
	//forward-left forward-right back-left back-right
	moves.concat(posMovesBishop(board, posx, posy));
	return moves;
}
/*
* Possible moves for King
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesKing(board, posx, posy){
	//need to add castling
	var moves = [];

	for(var y = -1; y<2; y++){
		for(var x = -1; x < 2; x++){
			//ignore the current position
			if(!(x==0 && y==0)){
				//boundary check
				if(boundaries(posy+y,posx+x)){
					if(capture(board[posy][posx],board[posy + y][posx+x])){
						moves.push([posy + y,posx + x]);
					}
				}
			}
		}
	}
	return moves;
}
/*
* This is a utility function to test the validity of 4 tiles for a given piece
* @param posArr a 4x2 array containing the coords for tiles to test
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function searchLines(board, posx, posy, posArr){
	var moves = [];
	for(var j = 0; j < 4;j++){
		if(boundaries(posArr[j][0],posArr[j][1])){
			var p = board[posArr[j][0]][posArr[j][1]];
			//tile is empty, add continue searching
			//tile is opponents piece, add and stop searching
			if(capture(board[posy][posx],p)){
				moves.push([posArr[j][0],posArr[j][1]]);
			}
		}
	}
	return moves;
}

/*
* utility function for testing boundaries
* @param y y coord
* @param x x coord
* @return true or false
*/
function boundaries(y,x){
	return (x < 8 && y < 8 && x > -1 && y > -1)
}

/*
* utility function for testing if a move is a capture or valid empty tile
* @param thisNumber current piece
* @param thatNumber the tile to be captured
* @return true or false
*/
function capture(thisNumber, thatNumber){
	return (thatNumber === -1 || pieceColour(thisNumber) != pieceColour(thatNumber));
}


/*
* function used to generate possible moves for a single piece
* @param board the current game board array
* @param x the x index
* @param y the y index
* @return the array of possible moves for this piece
*/
function possibleMove(board, x, y){
	var moves = [];
	//If empty tile an empty array is returned
	if(board[y][x] == -1){
		return moves;
	} else {
		switch(pieceType(board[y][x])) {
			case PAWN:
				moves = posMovesPawn(board,x,y);
				break;
			case RUCK:
				moves = posMovesRuck(board,x,y);
				break;
			case KNIGHT:
				moves = posMovesKnight(board,x,y);
				break;
			case BISHOP:
				moves = posMovesBishop(board,x,y);
				break;
			case QUEEN:
				moves = posMovesQueen(board,x,y);
				break;
			case KING:
				moves = posMovesKing(board,x,y);
				break;
		}
	}
	//return the possible moves
	return moves;
}

/*
* Function to test if a move is valid
* @param board the game board
* @param fromY the piece Y coord
* @param fromX the piece X coord
* @param toY the coord after moving
* @param toX the coord after moving
* @return true or false if move is valid or not
*/
function validateMove(board, fromY, fromX, toY, toX){
	var moves = possibleMove(board,fromX,fromY);
	for(var i =0; i < moves.length;i++){
		//if move is valid
		if(moves[i][0] === toY && moves[i][1] === toX){
			return true;
		}
	}
	return false;
}


/*~~~~~ TESTING FUNCTIONS TO BE REMOVED BEFORE SUBMISSION ~~~~~*/


/*FOR TESTING ONLY, REMOVE BEFORE SUBMISSION*/
//just a test function that generates a string
//it does not exectute possibe moves for all pieces
//just a pawn and a king.
function displayMoves(){
	var moves = posMoves(BOARD);
	var text = "";
	for(var i = 0; i < 12; i++){
		text += "|" + i;
		for(j = 0; j < moves[i].length; j++){
			text += ": " + moves[i][j][0] + "," + moves[i][j][1];
		}
	}
	document.getElementById("moves").innerHTML = "hello " + text;
	//console.log(validateMove(BOARD,6,7,3,7)); //validate false
	//console.log(validateMove(BOARD,6,7,4,7)); //validate true
}

/*FOR TESTING ONLY, REMOVE BEFORE SUBMISSION
* Function to generate possible moves for all pieces
* Possible moves are stored in the moves array
* @param board the current game board array
* @param posx the x index
* @param posy the y index
* @return the array of possible moves for all pieces
*/
function posMoves(board){
	var moves = [[],[],[],[],[],[],[],[],[],[],[]];
	for(var y = 0; y<8;y++){
		for(var x = 0; x < 8; x++){
			//clear the previous moves
			switch(pieceType(board[y][x])) {
				case PAWN:
					moves[board[y][x]] = posMovesPawn(board,x,y);

					break;
				case RUCK:
					moves[board[y][x]] = posMovesRuck(board,x,y);
					break;
				case KNIGHT:
					moves[board[y][x]] = posMovesKnight(board,x,y);
					break;
				case BISHOP:
					moves[board[y][x]] = posMovesBishop(board,x,y);
					break;
				case QUEEN:
					moves[board[y][x]] = posMovesQueen(board,x,y);
					break;
				case KING:
					moves[board[y][x]] = posMovesKing(board,x,y);
					break;
			}
		}
	}
	return moves;
}


/*
* Function to draw a chess board in specified position
* 
*/
function paintBoard(){
	//The element the board is getting placed into
	var container = document.getElementsByClassName("maincontent");
	var chessBoard = generateBoard(currentBoardState);
	var highlightedBoard = highlightBoard(chessBoard, currentHighlight);
	container[0].appendChild(highlightedBoard);
}
	
	
	var currentBoardState = BOARD;
	var currentHighlight = [];
	
	function displayMoves(x,y, id){
		console.log("triggered " + id);
		//var tile = document.getElementById(id);
		//tile.onmouseout(clearHighlight(x,y,x+":"+y));
		currentHighlight = possibleMove(currentBoardState, x, y);
		paintBoard();
	}
	function highlightBoard(chessBoard, highlight){
		var cb = chessBoard;
		for(var i = 0; i < highlight.length; i++){
			cb.getElementById(highlight[i][1] + ":" + highlight[i][0]).style.borderColor = "green";
		}
		return cb;
	}
	function clearHighlight(x,y,id){
		var tile = document.getElementById(id);
		tile.onmouseover(displayMoves(x,y,x+":"+y));
		currentHighlight = [];
		paintBoard();
	}
			//imgfile = imgsrc + (pieceColour(piece)+pieceType(piece)) + ".svg";
			//var pieceImg = <img src="images/pieces/0.svg" alt="hi">;
/*
* Function to generate html for the chessboard
*@return the chessboard div element
*/
function generateBoard(board){
	var imgsrc = "images/pieces/"
	var imgfile = "";
	var chessBoard = document.createElement("div");
	
	//class used for css
	chessBoard.className = "board";
	//generates each tile, assigns unique ID
	//Colours tiles in standard pattern
	for(var y = 0; y < 8; y++){
		for(x = 0; x < 8; x++){
			var piece = board[y][x];
			var tile = document.createElement("div");
			var text = document.createElement("p");
			//class used for css
			tile.className = "tile";
			tile.id = x + ":" + y;
			//alternates colours with row/column number
			if(y%2 - x%2 == 0){
				tile.style.backgroundColor = WHITE_TILE_COLOR;
			} else {
				tile.style.backgroundColor = BLACK_TILE_COLOR;
			}
			
			//initial testing, write piece name on the board
			if(board[y][x] != -1){
				var textCol = "green";
				if(board[y][x] >= BLACK){
					textCol = "black";
				}
				text.style.color = textCol;
				
				//pawn 0, ruck 1, knight 2,bishop 3,  queen 4, king 5
				
				switch (board[y][x]%6) {
					case -1:
						break;
					case 0:
						text.innerHTML = "PAWN";
						break;
					case 1:
						text.innerHTML = "RUCK";
						break;
					case 2:
						text.innerHTML = "KNIGHT";
						break;
					case 3:
						text.innerHTML = "BISHOP";
						break;
					case 4:
						text.innerHTML = "QUEEN";
						break;
					case 5:
						text.innerHTML = "KING";
						break;
					
				}
			}
			if(piece != -1){
				imgfile = imgsrc + (pieceColour(piece)+pieceType(piece)) + ".png";
				var pieceImg = document.createElement("img");
				pieceImg.src = imgfile;
				pieceImg.id = x + "," + y;
				tile.onclick = displayMoves(x,y);
				//tile.style.backgroundImage = imgfile;
				tile.appendChild(pieceImg);
			}
			chessBoard.appendChild(tile);
		}
	}
	
	return chessBoard;
	
}







