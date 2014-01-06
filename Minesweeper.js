board = []
var boardCount =8,
 	playSpace = '<table>';

for (var i = 0; i < boardCount; i++) {
	board.push([]);
	for (var x =0; x < boardCount; x++) {
		board[i].push(new tile());
	};
	
};

for (var i = 0; i < boardCount; i++) {
	 playSpace+="<tr>";
	for (var x =0; x < boardCount; x++) {
    	playSpace+='<td id="board['+[i]+']['+[x]+']">x</td>';
   
	};
	playSpace+="</tr>";
	
};

playSpace+="</table>"

$(".game").html(playSpace);

function tile() {
	this.beenClicked = false;
	this.hasBomb = false;
}

for (var i = 0; i < 10;) {
	var x = Math.floor((Math.random()*7)+1),
		y = Math.floor((Math.random()*7)+1);
		if (board[x][y].hasBomb==false) {
			board[x][y].hasBomb=true;
			i++;
		}
};


	