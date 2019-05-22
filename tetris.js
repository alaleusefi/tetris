const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

 const ROW = 20;
 const COL = COLUMN = 10;
 const SQ = squareSize = 20;
 const VACANT ="white";


 //draw a square
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

//create board

let board = [];
for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = VACANT;
    }
}

//draw the Board
function drawBoard(){
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

//the pieces and their color
const PIECES = [
    [Z,"red"]
    [S,"green"]
    [T,"yellow"]
    [O,"blue"]
    [L,"purple"]
    [I,"orange"]
    [J,"cyan"]
];

// intiate a piece
let p = new Piece(PIECES[0][0], PIECES[0][1]);
//the object piece

function Piece(tetromino, color){
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    //control the piece
    this.x = 0;
    this.y = 0;
}

//draw the piece to the board
Piece.prototype.draw = function(){
    for(r=0; r < this.activeTetromino.length; r++){
        for(c=0; c < this.activeTetromino.length; c++){
            if(this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, this.color);
            }
        }
    }
}

p.draw();