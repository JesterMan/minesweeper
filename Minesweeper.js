board = []
var boardCount =8,
 	table = '<table>';
for (var i = 0; i < boardCount; i++) {
	board.push([]);
	 table+="<tr>";
	for (var x =0; x < boardCount; x++) {
		board[i].push(new tile());
    	table+='<td></td>';
	};
	table+="</tr>";
	
};
table+="</table>"
debugger;
$(".game").html(table);

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


	