

//start a new game
function newBoard() {
    board = [] //used to created the html 
    bombSet =[] //where the bombs are, used to mark them in god mode
    correctMark=0; //count of how many of the markers are correctly place
    markedBomb=0; //count of how many makers have been placed
    boardCount = document.getElementById('boardSize').value;
    bombCount = document.getElementById('bombin').value;
    $('#gameBoard').remove();
    for (var i = 0; i < boardCount; i++) {
        board.push([]);
        for (var x =0; x < boardCount; x++) {
                board[i].push(new tile());
        };
    };
//build html board
    var playSpace = '<table id="gameBoard">';
    for (var i = 0; i < boardCount; i++) {
        playSpace+="<tr>";
        for (var x =0; x < boardCount; x++) {
            playSpace+='<td>?</td>';
            
        };
        playSpace+="</tr>";
    };

    playSpace+="</table>";

    $(".game").append(playSpace);

    function tile() {
        this.beenClicked = false;
        this.hasBomb = false;
    }

//determine bomb placement
    for (var i = 0; i < bombCount;) {
        var x = Math.floor((Math.random()*boardCount)),
            y = Math.floor((Math.random()*boardCount));
            debugger
        if (board[x][y].hasBomb==false) {
            board[x][y].hasBomb=true;
            bombSet.push([x,y])
            i++;
        }
    }; 

//triggers the check tile funcion
    function blindClick(){
        var col=$(this).parent().children().index($(this)),
            row=$(this).parent().parent().children().index($(this).parent());
        clickTile(row,col);
    };

    $( "td" ).click(blindClick);

    $("td").hover(function(){
        $(this).toggleClass('target');
    });
}

//mark the bombs
$(document).keypress(function(){
    if (markedBomb != bombCount) {
        $(".target").html('X').unbind('click').beenClicked=true;
        var row = $(".target").parent().parent().children().index($(".target").parent()),
            col = $(".target").parent().children().index($(".target"));
        $('.target').addClass('Bomb');
       if (board[row][col].hasBomb){
            correctMark++;
        }
        markedBomb++;
    }  
});

$(document).ready (function(){ 
    newBoard();

//new game
    $("#newGame").click(function(){ 
        newBoard();
    });
//check for victory
    $("#validate").click(function(){
        if (correctMark==bombCount){
            alert("you win!");
        }
        else {
            alert("not quite")
        }
    });
//god mode
    $("#powerOverwhelming").click(function(){
        for (var i = 0; i <bombSet.length; i++) {
            $("tr:eq("+bombSet[i][0]+") td:eq("+bombSet[i][1]+")").text("O").addClass('revealed');
        };
    });

});

//check a tile to see if it or it's neighbors have any bombs
function clickTile(row,col) {        
    if (board[row][col].hasBomb){
        $("tr:eq("+row+") td:eq("+col+")").text("X").addClass('Bomb').unbind('click');;
        alert("Boom! Game over.")
    }
    else{        
        board[row][col].beenClicked=true;
        mineCount=countMine(row,col);
        if (mineCount==0){
            $("tr:eq("+row+") td:eq("+col+")").addClass('known').text("");
            testNeighbors(row,col);
            //run more tests
        }
        else {
            $("tr:eq("+row+") td:eq("+col+")").text(mineCount).addClass('known');
        }
    }        
};


function countMine(row,col){
    var mineCount=0;
    for (var y=-1; y <=1;y++){
        for (var z = -1; z<=1;z++){
            if (checkBoundaries(row+y,col+z) && board[row+y][col+z].hasBomb){
                mineCount++;
            }
        }
    }
    return mineCount;
}

function checkBoundaries(row,col){
    if (row<0 || col<0 || row>boardCount-1 || col>boardCount-1){
        return false;
    }
    else {
        return true;
    }
}

function testNeighbors(row,col){
    for (var y=-1; y <=1;y++){
        for (var z = -1; z<=1;z++){
            if (checkBoundaries(row+y,col+z) && !board[row+y][col+z].beenClicked){
                clickTile(row+y,col+z);
            }
        }
    }
}

