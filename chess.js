var board = [[0,1,2,3,4,5,6,7],
			[8,9,10,11,12,13,14,15],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[16,17,18,19,20,21,22,23],
			[24,25,26,27,28,29,30,31]];
			
			
//pawn 0, ruck 1, knight 2,bishop 3,  queen 4, king 5

//32 pieces [x,y,type]  0,15 black 16,31 white
var piece = [[0,0,1],[1,0,2],[2,0,3],[3,0,4],[4,0,5],[5,0,3],[6,0,2],[7,0,1],
			[0,1,0],[1,1,0],[2,1,0],[3,1,0],[4,1,0],[5,1,0],[6,1,0],[7,1,0],
			[0,6,0],[1,6,0],[2,6,0],[3,6,0],[4,6,0],[5,6,0],[6,6,0],[7,6,0],
			[0,7,1],[1,7,2],[2,7,3],[3,7,4],[4,7,5],[5,7,3],[6,7,2],[7,7,1]];

//stores the possible moves			
var moves = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];


function posMovesPawn(pieceNo){
	//clear the previous available moves
	moves[pieceNo] = [];
	//no validation of pieceNo yet
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
		
	if(direction+posy >=0 && direction+posy <8){
		//Forward movements
		if(board[posy + direction][posx] == -1){
			//valid move 1 space forward
			moves[pieceNo].push([posy + direction,posx]);
			if((direction == 1 && piece[pieceNo][1] == 1) || (direction == -1  && piece[pieceNo][1] == 6)) {
				if(board[posy + 2*direction][posx] == -1){
					//first move, 2 space forward valid
					moves[pieceNo].push([posy + 2*direction,posx]);
				}
			}
		}
		
		//Capture movements
		//left
		if(posx >0){
			
			//diagonal left
			var p = board[posy + direction][posx-1];
			if(p != -1){
				//check if its an opponent piece
				if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
					moves[pieceNo].push([posy + direction,posx-1]);
				}
			}
			
		}
		//right
		if(posx <7){
			//diagonal right
			var p = board[posy + direction][posx+1];
			if(p != -1){
				//check if its an opponent piece
				if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
					moves[pieceNo].push([posy + direction,posx+1]);
				}	
			}
			
		}
	}		
}
function posMovesRuck(pieceNo){
	//clear the previous available moves
	//need to add teh castle move
	moves[pieceNo] = [];
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	//forward
	var x,y = 0;
	while(true){
		++y;
		var p = board[posy + y][posx];
		if(posy+y > 7){
			break;
		} else {
			var p = board[posy + y][posx];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx]);
				break;
			}
		}
	}
	//back
	x,y = 0;
	while(true){
		--y;
		if(posy+y < 0){
			break;
		} else {
			var p = board[posy + y][posx];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx]);
				break;
			}
		}
	}
	//left
	x,y = 0;
	while(true){
		--x;
		if(posx+x < 0){
			break;
		} else {
			var p = board[posy][posx + x];
			if(p == -1){
				moves[pieceNo].push([posy,posx + x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy,posx + x]);
				break;
			}
		}
	}
	//right
	x,y = 0;
	while(true){
		++x;
		if(posx+x > 7){
			break;
		} else {
			var p = board[posy][posx + x];
			if(p == -1){
				moves[pieceNo].push([posy,posx + x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy,posx + x]);
				break;
			}
		}
	}
	
}
function posMovesKnight(pieceNo){
	//clear the previous available moves
	moves[pieceNo] = [];
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	
	//forwards left
	var y = 2;
	var x= -1;
	if(posy+y < 8 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//forwards right
	y = 2;
	x= +1;
	if(posy+y < 8 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//backwards left
	y = -2;
	x= -1;
	if(posy+y >= 0 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//backwards right
	y = -2;
	x= +1;
	if(posy+y >= 0 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//left forwards
	y = 1;
	x= -2;
	if(posy+y < 8 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//left back
	y = -1;
	x= -2;
	if(posy+y >=0 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//right forward
	y = 1;
	x= 2;
	if(posy+y < 8 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//right back
	y = -1;
	x= 2;
	if(posy+y >=0 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
}
function posMovesBishop(pieceNo){
	//clear the previous available moves
	//need to add teh castle move
	moves[pieceNo] = [];
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	//forward left
	var x,y = 0;
	while(true){
		++y;
		--x;
		if(posy+y > 7 || posx+x <0){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//forward right
	x,y = 0;
	while(true){
		++y;
		++x;
		if(posy+y > 7 || posx+x >7){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//back left
	x,y = 0;
	while(true){
		--y;
		--x;
		if(posy+y < 0 || posx+x < 0){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//back right
	x,y = 0;
	while(true){
		--y;
		++x;
		if(posy+y < 0 || posx+x > 7){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
}
function posMovesQueen(pieceNo){
		//clear the previous available moves
	moves[pieceNo] = [];
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	//forward
	var x,y = 0;
	while(true){
		++y;
		var p = board[posy + y][posx];
		if(posy+y > 7){
			break;
		} else {
			var p = board[posy + y][posx];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx]);
				break;
			}
		}
	}
	//back
	x,y = 0;
	while(true){
		--y;
		if(posy+y < 0){
			break;
		} else {
			var p = board[posy + y][posx];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx]);
				break;
			}
		}
	}
	//left
	x,y = 0;
	while(true){
		--x;
		if(posx+x < 0){
			break;
		} else {
			var p = board[posy][posx + x];
			if(p == -1){
				moves[pieceNo].push([posy,posx + x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy,posx + x]);
				break;
			}
		}
	}
	//right
	x,y = 0;
	while(true){
		++x;
		if(posx+x > 7){
			break;
		} else {
			var p = board[posy][posx + x];
			if(p == -1){
				moves[pieceNo].push([posy,posx + x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy,posx + x]);
				break;
			}
		}
	}
	//add diagonal movement
	
	//forward left
	x,y = 0;
	while(true){
		++y;
		--x;
		if(posy+y > 7 || posx+x <0){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//forward right
	x,y = 0;
	while(true){
		++y;
		++x;
		if(posy+y > 7 || posx+x >7){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//back left
	x,y = 0;
	while(true){
		--y;
		--x;
		if(posy+y < 0 || posx+x < 0){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
	//back right
	x,y = 0;
	while(true){
		--y;
		++x;
		if(posy+y < 0 || posx+x > 7){
			break;
		} else {
			var p = board[posy + y][posx+x];
			if(p == -1){
				moves[pieceNo].push([posy + y,posx+x]);
			} else if((direction == 1 && p > 15) || (direction == -1 && p < 16)){
				moves[pieceNo].push([posy + y,posx+x]);
				break;
			}
		}
	}
}
function posMovesKing(pieceNo){
	//clear the previous available moves
	//need to add castling
	moves[pieceNo] = [];
	var direction = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	
	//-1-1   0-1   1 1
	
	//-1 0         1 0
	
	//-1 1   0 1   1 1
	
	for(var y = -1; y<2; y++){
		for(var x = -1; x < 2; x++){
			//ignore the current position
			if(!(x==0 && y==0)){
				//boundary check
				if(posy+y != 8 && posy+y !=-1 && posx+x !=-1 && posx+x !=8){
					var p = board[posy + y][posx+x];
					if(p == -1 || (direction == 1 && p > 15) || (direction == -1 && p < 16)){
						moves[pieceNo].push([posy + y,posx + x]);
					}
				}
			}
		}
	}
	
}

//just a test function that generates a string
//it does not exectute possibe moves for all pieces
//just a pawn and a king.
function displayMoves(){
	posMovesPawn(8);
	posMovesKing(4);
	var text = "";
	for(var i = 0; i < 32; i++){
		text += "|" + i;
		for(j = 0; j < moves[i].length; j++){
			text += ": " + moves[i][j][0] + "," + moves[i][j][1];
		}
	}
	document.getElementById("moves").innerHTML = "hello " + text;
}

/*
* Function to generate possible moves for all pieces
* Possible moves are stored in the moves array
*/
function posMoves(){
	for(var i = 0; i<32;i++){
		switch(piece[i][2]) {
			case 0:
				posMovesPawn(i);
				break;
			case 1:
				posMovesRuck(i);
				break;
			case 2:
				posMovesKnight(i);
				break;
			case 3:
				posMovesBishop(i);
				break;
			case 4:
				posMovesQueen(i);
				break;
			case 5:
				posMovesKing(i);
				break;
		}
	}
}

/*
* Function to draw a chess board in specified position
* 
*/
function paintBoard(){
	//The element the board is getting placed into
	var container = document.getElementsByClassName("maincontent");
	var board = generateBoard();
	container[0].appendChild(board);
}

/*
* Function to generate html for the chessboard
*@return the chessboard div element
*/
function generateBoard(){
		//set tile colours here
	var whiteTileCol = "white";
	var BlackTileCol = "grey";
	var board = document.createElement("div");
	
	//class used for css
	board.className = "board";
	//generates each tile, assigns unique ID
	//Colours tiles in standard pattern
	for(var y = 0; y < 8; y++){
		for(x = 0; x < 8; x++){
			var tile = document.createElement("div");
			//class used for css
			tile.className = "tile";
			tile.id = x + ":" + y;
			//alternates colours with row/column number
			if(y%2 - x%2 == 0){
				tile.style.backgroundColor = whiteTileCol;
			} else {
				tile.style.backgroundColor = BlackTileCol;
			}
			board.appendChild(tile);
		}
	}
	
	return board;
	
}







