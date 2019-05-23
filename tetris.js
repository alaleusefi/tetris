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
    [Z,"red"],
    [T,"green"],
    [S,"pink"],
    [O,"blue"],
    [L,"purple"],
    [J,"orange"],
    [I,"cyan"],
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
    this.x = 3;
    this.y = 0;
}

//fill function
Piece.prototype.fill = function(color){
    for(r=0; r < this.activeTetromino.length; r++){
        for(c=0; c < this.activeTetromino.length; c++){
            if(this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}
//draw the piece to the board
Piece.prototype.draw = function(){
   this.fill(this.color);
}

//undraw a piece 
Piece.prototype.unDraw = function(){
    this.fill(VACANT);   
}

//move down the piece
Piece.prototype.moveDown = function(){
    this.unDraw();
    this.y++;
    this.draw();
};
//move right the piece
Piece.prototype.moveRight = function(){
    this.unDraw();
    this.x++;
    this.draw();
};
//move left the piece
Piece.prototype.moveLeft = function(){
    this.unDraw();
    this.x--;
    this.draw();
};

//rotate the piece
Piece.prototype.rotate = function(){
    this.unDraw();
    this.tetrominoN = (this.tetrominoN +1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
};
//collision function
Piece.prototype.collision = function(x,y,piece){
    for(r=0; r < piece.length; r++){
        for(c=0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;               
            }
            let newX = this.x + c + x;
            this.newY = this.y + r + y;
            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
            if(newY<0){
                continue;
            }
            if(board[newX][newY] != VACANT){
                return true;
            }
        }
    }
    return false;
}
//control the piece
document.addEventListener("keydown", CONTROL);
function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}
//drop the piece every 1sec
let dropStart = Date.now();
function drop(){
    let now = Date.now();
    let difference = now - dropStart;
    if(difference > 1000){
    p.moveDown();
     dropStart = Date.now();
    }
    requestAnimationFrame(drop);
};

drop();