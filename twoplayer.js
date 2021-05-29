var board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']];

var idList = [["box1", "box2", "box3"], 
              ["box4", "box5", "box6"],
              ["box7", "box8", "box9"]];

var count = 0;
var gameOver = false;

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
        
    return " ";


}


function displayStatus(){
    var winner = checkStatus(board);
    if(checkStatus(board) != " " || count == 9){
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
        if(move == 1 && board[0][0] == " "){setPiece(board, getPlayer(), 0, 0);}
        else if(move == 2 && board[0][1] == " "){setPiece(board, getPlayer(), 0, 1);}
        else if(move == 3 && board[0][2] == " "){setPiece(board, getPlayer(), 0, 2);}
        else if(move == 4 && board[1][0] == " "){setPiece(board, getPlayer(), 1, 0);}
        else if(move == 5 && board[1][1] == " "){setPiece(board, getPlayer(), 1, 1);}
        else if(move == 6 && board[1][2] == " "){setPiece(board, getPlayer(), 1, 2);}
        else if(move == 7 && board[2][0] == " "){setPiece(board, getPlayer(), 2, 0);}
        else if(move == 8 && board[2][1] == " "){setPiece(board, getPlayer(), 2, 1);}
        else if(move == 9 && board[2][2] == " "){setPiece(board, getPlayer(), 2, 2);}
        else{alert("Enter a valid move");return;}
        count ++;
        printBoard();
        displayStatus();

        
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
    return board;
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

// function max(arr){
//     var maxVal = -10;
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i] > maxVal){
//             maxVal = arr[i];
//         }
//     }

//     return maxVal;
// }

// function min(arr){
//     var minVal = 10;
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i] < minVal){
//             minVal = arr[i];
//         }
//     }

//     return minVal;
// }



printBoard();
displayStatus();


