var board = [['X', 'X', 'O'],
             [' ', 'O', ' '],
             [' ', ' ', ' ']];

var idList = [["box1", "box2", "box3"], 
              ["box4", "box5", "box6"],
              ["box7", "box8", "box9"]];


var count = 0;
var gameOver = false;
var min = "O";
var max = "X";

function printBoard(){
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            document.getElementById(idList[i][j]).innerHTML = board[i][j];

        }

    }
    
}

function checkStatus(board){
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][0] == board[i][1]  && board[i][1] == board[i][2] && board[i][0] != " "){
                return board[i][0];
            }    
               

            if(board[0][j] == board[1][j]  && board[1][j] == board[2][j] && board[0][j] != " "){
                return board[0][j] 
            } 
                 
        }
    }
                    

    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != " "){
        return board[0][0];

    }             
        

    if(board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[0][2] != " "){
        return board[2][0];

    }
    if(getAvailableMoves(board).length == 0){
        return " ";

    } 
    return null;



}


function displayStatus(){
    var winner = checkStatus(board);
    if(checkStatus(board) != null || count == 9){
        gameOver = true;

    }
    if(!gameOver){
        document.getElementById("status").innerHTML = "It's Player " + getPlayer() + "'s turn";
        

    }
    else{
        if(winner == " "){
            document.getElementById("status").innerHTML = "Game over, It's a draw!!";


        }
        else{
            document.getElementById("status").innerHTML = "Game over, " + winner + " is the winnner!!";


        }

    }
    
  

}

function getPlayer(){
    if(count % 2 == 0){
        return "X";

    }
    return "O";

}

function placeMove(move){
    if(!gameOver){
        if(move == 1 && board[0][0] == " "){setPiece(board, max, 0, 0);}
        else if(move == 2 && board[0][1] == " "){setPiece(board, max, 0, 1);}
        else if(move == 3 && board[0][2] == " "){setPiece(board, max, 0, 2);}
        else if(move == 4 && board[1][0] == " "){setPiece(board, max, 1, 0);}
        else if(move == 5 && board[1][1] == " "){setPiece(board, max, 1, 1);}
        else if(move == 6 && board[1][2] == " "){setPiece(board, max, 1, 2);}
        else if(move == 7 && board[2][0] == " "){setPiece(board, max, 2, 0);}
        else if(move == 8 && board[2][1] == " "){setPiece(board, max, 2, 1);}
        else if(move == 9 && board[2][2] == " "){setPiece(board, max, 2, 2);}
        else{alert("Enter a valid move");return;}
        console.log(getBestMove(board));
        printBoard();
        displayStatus();
        

        
    }
    

}


function getBestMove(board){
    var bestMove;
    var bestScore = Infinity;
    var availableMoves = getAvailableMoves(board);
    for(var i = 0; i < availableMoves.length; i++){
        var score = minimax(board, min, false);
        if(score < bestScore){
            bestScore = score;
            bestMove = i;

        }
    }
    console.log(availableMoves, availableMoves[bestMove]);

}

function minimax(board, player, isMaximizing){
    if(isTerminal(board) != null){
        return isTerminal(board);
    }

    if(isMaximizing){
        var bestScore = -Infinity;
        var availableMoves = getAvailableMoves(board);
        for(var i = 0; i < availableMoves.length; i++){
            setPiece(board, player, availableMoves[i][0], availableMoves[i][1]);
            bestScore = Math.max(bestScore, minimax(board, min));
            setPiece(board, " ", availableMoves[i][0], availableMoves[i][1]);

        }
        return bestScore;

    }
    else{
        var bestScore = Infinity;
        var availableMoves = getAvailableMoves(board);
        for(var i = 0; i < availableMoves.length; i++){
            setPiece(board, player, availableMoves[i][0], availableMoves[i][1]);
            bestScore = Math.min(bestScore, minimax(board, max));
            setPiece(board, " ", availableMoves[i][0], availableMoves[i][1]);

        }
        return bestScore;

    }
    
    
}





function handleInput(move){
    if(event.key == "Enter"){
        if(1 <= move.value && move.value <= 9){
            placeMove(move.value);
            
        }
        else{
            alert("Enter a valid move");
        }
    }
    document.getElementById("ipt").value = '';
    
    

}

function setPiece(board, piece, i, j){
    board[i][j] = piece;

}

function isTerminal(board){
    if(checkStatus(board) == "X"){
        return 1;

    }
    else if(checkStatus(board) == "O"){
        return -1;

    }
    else if(checkStatus(board) == " "){
        return 0;

    }
    return null;

}


function getAvailableMoves(board){
    var moveList = [];
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][j] == " "){
                moveList.push([i, j]);
            }

        }
    }

    return moveList;

}


printBoard();
displayStatus();


