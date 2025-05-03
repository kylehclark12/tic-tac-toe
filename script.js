const gameinfo = document.getElementById('gamedisplay')
const list = [
	"g0", 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'
]
const closecalls = [
	[0,1,2],[0,2,1],[0,4,8],[0,8,4],[0,3,6],[0,6,3],
	[1,0,2],[1,2,0],[1,4,7],[1,7,4],
	[2,1,0],[2,0,1],[2,4,6],[2,6,4],[2,5,8],[2,8,5],
	[3,0,6],[3,6,0],[3,4,5],[3,5,4],
	[4,0,8],[4,1,7],[4,2,6],[4,5,3],[4,8,0],[4,7,1],[4,6,2],[4,3,5],
	[5,2,8],[5,8,2],[5,4,3],[5,3,4],
	[6,3,0],[6,0,3],[6,4,2],[6,2,4],[6,7,8],[6,8,7],
	[7,8,6],[7,6,8],[7,4,1],[7,1,4],
	[8,5,2],[8,2,5],[8,4,0],[8,0,4],[8,7,6],[8,6,7]
]

const wincombos = [
	[0,1,2],[3,4,5],[6,7,8],
	[0,3,6],[1,4,7],[2,5,8],
	[0,4,8],[2,4,6]
]

const cpuspeed = 1000
const boxshadow = "0 0 10px 3px green"
var counter = 2
var worked = false
var xs = "p"
var os = "p"
var currentstanding = []
var winner = ""
var cpu
var turn = -1

function gamestart(gametype) {
	restart()
	if (gametype === "pvp") {
		xs = "p"
		os = "p"
		gameinfo.innerText = "Your turn, X"
		gameinfo.style.color = "red"
		counter = 0
	}
	else if (gametype === "pvc") {
		if (Math.random() <= .5) {
			xs = "p"
			os = "c"
		}
		else {
			xs = "c"
			os = "p"
		}
		gameinfo.innerText = "Your Turn, X"
		gameinfo.style.color = "red"
		counter = 0
		checkwinner()
	}
	else if (gametype === "cvc") {
		xs = "c"
		os = "c"
		gameinfo.innerText = "Computer is playing"
		gameinfo.style.color = "red"
		counter = 0
		checkwinner()
	}
}

function tictactoe(var1) {
	if (counter === 0 && var1.innerText === "" && xs === "p" && winner === "") {
		var1.innerText = "X"
		var1.style.color = "red"
		counter +=1
		counter %= 2
		gameinfo.innerText = "Your turn, O"
		gameinfo.style.color = "blue"
		setTimeout(checkwinner, 10)
	}
	else if (counter === 1 && var1.innerText === "" && os === "p" && winner === "") {
		var1.innerText = "O"
		var1.style.color = "blue"
		counter +=1
		counter %= 2
		gameinfo.innerText = "Your turn, X"
		gameinfo.style.color = "red"
		setTimeout(checkwinner, 10)
	}
}

function computerturn() {
	worked = false
	cellpick = false
	if (counter === 0 && xs === "c" && winner === "") {
		gameinfo.innerText = "Computer is playing"
		gameinfo.style.color = "red"
		cpu = setTimeout(cpux, cpuspeed)
	}
	else if (counter === 1 && os === "c" && winner === "") {
		gameinfo.innerText = "Computer is playing"
		gameinfo.style.color = "blue"
		cpu = setTimeout(cpuo, cpuspeed)
	}
}

function cpux() {
	finishorblocko()
	finishorblockx()
	randomspot()
	if (cellpick.innerText === "") {
		cellpick.innerText = "X"
		cellpick.style.color = "red"
		worked = true
		gameinfo.innerText = "Your turn, O"
		gameinfo.style.color = "blue"
		counter += 1
		counter %= 2
		setTimeout(checkwinner, 10)
	}
}

function cpuo() {
	finishorblockx()
	finishorblocko()
	randomspot()
	
	if (cellpick.innerText === "") {
		cellpick.innerText = "O"
		cellpick.style.color = "blue"
		worked = true
		gameinfo.innerText = "Your turn, X"
		gameinfo.style.color = "red"
		counter += 1
		counter %= 2
		setTimeout(checkwinner, 10)
	}
}


function finishorblockx() {
	for (let i = 0; i < wincombos.length; i++) {
		let checka = document.getElementById(list[wincombos[i][0]]) 
		let checkb = document.getElementById(list[wincombos[i][1]])
		let checkc = document.getElementById(list[wincombos[i][2]])
		let checklist = [checka, checkb, checkc]
		let checkx = 0
		let checko = 0
		let empty
		for (let j = 0; j < checklist.length; j++) {
			if (checklist[j].innerText === "O") {
				checko += 1
			}
			else if (checklist[j].innerText === "X") {
				checkx += 1
			}
			else {
				empty = j
			}
		}
		if (checkx === 2 && checko === 0) {
			cellpick = checklist[empty]
			break
		}	
	}
}
function finishorblocko() {
	for (let i = 0; i < wincombos.length; i++) {
		let checka = document.getElementById(list[wincombos[i][0]]) 
		let checkb = document.getElementById(list[wincombos[i][1]])
		let checkc = document.getElementById(list[wincombos[i][2]])
		let checklist = [checka, checkb, checkc]
		let checkx = 0
		let checko = 0
		let empty
		for (let j = 0; j < checklist.length; j++) {
			if (checklist[j].innerText === "O") {
				checko += 1
			}
			else if (checklist[j].innerText === "X") {
				checkx += 1
			}
			else {
				empty = j
			}
		}
		if (checko === 2 && checkx === 0) {
			cellpick = checklist[empty]
			break
		}	
	}
}

function randomspot() {
let att = 0
	while (cellpick === false || cellpick.innerText != "") {
		att += 1 
		cpuplay = Math.floor(Math.random() * 9)
		cellpick = document.getElementById(list[cpuplay])
		if (att > 50) {
			break
		}
	}
}


function restart() {
	clearTimeout(cpu)
	for (let i = 0; i < list.length; i++) {
		document.getElementById(list[i]).innerText = ""
		document.getElementById(list[i]).style.boxShadow = "none"
	}
	counter = 2
	gameinfo.innerText = "Pick a game"
	gameinfo.style.color = "black"
	currentstanding = []
	winner = ""
	turn = -1
	Math.random()
}

function checkwinner() {
	currentstanding = []
	turn += 1
	var isboardfull = 0
	for (let i = 0; i < list.length; i++) {
		currentstanding.push(document.getElementById(list[i]).innerText)
	}
	if (currentstanding[0] != "" && currentstanding[0] === currentstanding[4] && currentstanding[0] === currentstanding[8]) {
		document.getElementById(list[0]).style.boxShadow = boxshadow
		document.getElementById(list[4]).style.boxShadow = boxshadow
		document.getElementById(list[8]).style.boxShadow = boxshadow
		winner = currentstanding[0]
	}
	if (currentstanding[2] != "" && currentstanding[2] === currentstanding[4] && currentstanding[2] === currentstanding[6]) {
		document.getElementById(list[2]).style.boxShadow = boxshadow
		document.getElementById(list[4]).style.boxShadow = boxshadow
		document.getElementById(list[6]).style.boxShadow = boxshadow
		winner = currentstanding[2]
	}
	for (let i = 0; i < currentstanding.length; i++) {
		if (winner != "") {
			break
		}
		if (currentstanding[i] === "") {
			isboardfull += 1
		}
		if (i % 3 === 0) {
			if (currentstanding[i] === currentstanding[i + 1] && currentstanding[i] === currentstanding[i + 2]) {
				winner = currentstanding[i]
				if (winner != "") {
					document.getElementById(list[i]).style.boxShadow = boxshadow
					document.getElementById(list[i + 1]).style.boxShadow = boxshadow
					document.getElementById(list[i + 2]).style.boxShadow = boxshadow
				}
			}
		}
		if (i < 3) {
			if (currentstanding[i] === currentstanding[i + 3] && currentstanding[i] === currentstanding[i + 6]) {
				winner = currentstanding[i]
				if (winner != "") {
					document.getElementById(list[i]).style.boxShadow = boxshadow
					document.getElementById(list[i + 3]).style.boxShadow = boxshadow
					document.getElementById(list[i + 6]).style.boxShadow = boxshadow
				}
			}
		}
	}
	if (winner != "") {
		let winmsg = winner + " is the winner!"
		gameinfo.innerText = winmsg
		if (winner === "X") {
			gameinfo.style.color = "red"
		}
		else {
			gameinfo.style.color = "blue"
		}
	}
	else if (isboardfull === 0 && winner === "") {
		gameinfo.innerText = "Draw!"
		gameinfo.style.color = "black"
	}
	else if (winner === "") {
		Math.random()
		cpu = setTimeout(computerturn, 10)
	}
}






