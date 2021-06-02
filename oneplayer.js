var board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']];

var idList = [["box1", "box2", "box3"], 
              ["box4", "box5", "box6"],
              ["box7", "box8", "box9"]];


var count = 0;
var gameOver = false;
var min = "O";
var max = "X";
var human = max;
var ai = min;

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
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != " "){
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

    
    return null;

}


function displayStatus(){
    var winner = checkStatus(board);
    if(getAvailableMoves(board).length == 0 || winner != null){
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


function getAvailableMoves(board){
    var moveList = [];
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][j] == " "){
                var result = [i, j];
                moveList.push(result);
            }

        }
    }
    return moveList;

}


function getPlayer(board){
    console.log(board);
    if(getAvailableMoves(board).length % 2 == 1){
        return "X";

    }
    return "O";

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

function setPiece(board, action){
    var newBoard = [[' ', ' ', ' '],
                    [' ', ' ', ' '],
                    [' ', ' ', ' ']];

    for(var x = 0; x < board.length; x++){
        for(var y = 0; y < board[x].length; y++){ 
            newBoard[x][y] = board[x][y];

        }

    }

    newBoard[action[0]][action[1]] = getPlayer(board);
    return newBoard; 

}


function isTerminal(board){
    if(checkStatus(board) != null){
        return true;

    }
    else if(checkStatus(board) == null && getAvailableMoves(board).length == 0){
        return true;

    }
    return false;

}

function utility(board){
    var winner = checkStatus(board);
    if(winner == "X"){
        return 1;

    }
    else if(winner == "O"){
        return -1;

    }

    return 0;

}


function placeMove(move){
    if(!gameOver){
        if(move == 1 && board[0][0] == " "){board[0][0] = human;}
        else if(move == 2 && board[0][1] == " "){board[0][1] = human;}
        else if(move == 3 && board[0][2] == " "){board[0][2] = human;}
        else if(move == 4 && board[1][0] == " "){board[1][0] = human;}
        else if(move == 5 && board[1][1] == " "){board[1][1] = human;}
        else if(move == 6 && board[1][2] == " "){board[1][2] = human;}
        else if(move == 7 && board[2][0] == " "){board[2][0] = human;}
        else if(move == 8 && board[2][1] == " "){board[2][1] = human;}
        else if(move == 9 && board[2][2] == " "){board[2][2] = human;}
        else{alert("Enter a valid move");return;}
        var result = getBestMove(board);
        //console.log(result);
        board[result[0]][result[1]] = getPlayer(board);
        printBoard();
        displayStatus();
        

        
    }
    

}

function minValue(board){
    if(isTerminal(board)){
        return utility(board);
    }

    var bestScore = Infinity;
    for(var i = 0; i < getAvailableMoves(board).length; i++){
        bestScore = Math.min(bestScore, maxValue(setPiece(board, getAvailableMoves(board)[i])));

    }

    return bestScore;  

}

function maxValue(board){
    if(isTerminal(board)){
        return utility(board);
    }

    var bestScore = -Infinity;
    for(var i = 0; i < getAvailableMoves(board).length; i++){
        bestScore = Math.max(bestScore, minValue(setPiece(board, getAvailableMoves(board)[i])));

    }

    return bestScore;  

}


function getBestMove(board){
    if(getPlayer(board) == "X"){
        var bestScore = -Infinity;
        //console.log("Ran through getPlayer", getAvailableMoves(board));
        for(var i = 0; i < getAvailableMoves(board).length; i++){
            //console.log(score, bestScore, bestMove, getAvailableMoves(board)[i]);
            var score = minValue(setPiece(board, getAvailableMoves(board)[i]));
            if(score > bestScore){
                bestScore = score;
                var bestMove = getAvailableMoves(board)[i];
            }
        }


    }
    else if(getPlayer(board) == "O"){
        var bestScore = Infinity;
        //console.log("Ran through getPlayer");
        for(var i = 0; i < getAvailableMoves(board).length; i++){
            var score = maxValue(setPiece(board, getAvailableMoves(board)[i]));
            //console.log(score, bestScore, bestMove, getAvailableMoves(board)[i]);
            if(score < bestScore){
                bestScore = score;
                var bestMove = getAvailableMoves(board)[i];
            }
        }


    }

    return bestMove;

}

if(human == min){
    var result = getBestMove(board);
    board[result[0]][result[1]] = getPlayer(board);

}
printBoard();
displayStatus();


