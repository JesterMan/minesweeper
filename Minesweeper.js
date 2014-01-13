board = []
bombSet =[]
marked=[]
var boardCount =8,
        bombCount = 10,
        bombed=false,
        mineCount,
        playSpace;
         
function newBoard() {
     $( "td" ).unbind('click');
    correctMark=0;
    markedBomb=0;
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
debugger
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

    for (var i = 0; i < bombCount;) {
        var x = Math.floor((Math.random()*7)+1),
            y = Math.floor((Math.random()*7)+1);
        if (board[x][y].hasBomb==false) {
            board[x][y].hasBomb=true;
            console.log("x:"+x+"  y:"+y)
            bombSet.push([x,y])
            i++;
        }
    }; 

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

$(document).keypress(function(){
    if (markedBomb != 10) {
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

    $("#newGame").click(function(){ 
        newBoard();
    });

    $("#validate").click(function(){
        if (correctMark==bombCount){
            alert("you win!");
        }
        else {
            alert("not quite")
        }
    });

    $("#powerOverwhelming").click(function(){
        for (var i = 0; i <bombSet.length; i++) {
            $("tr:eq("+bombSet[i][0]+") td:eq("+bombSet[i][1]+")").text("O").addClass('revealed');
        };
    });

});


function clickTile(row,col) {        
    if (board[row][col].hasBomb){
        $("tr:eq("+row+") td:eq("+col+")").text("X").addClass('Bomb');
        $("td").unbind('click');
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
    if (row<0 || col<0 || row>7 || col>7){
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

