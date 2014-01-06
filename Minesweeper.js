board = []
var boardCount =8;
for (var i = 0; i < boardCount; i++) {
	board.push([])
	for (var x =0; x < boardCount; x++) {
		board[i].push(new tile())
	};
};

function tile() {
	this.beenClicked = false;
	this.hasBomb = false;
}
