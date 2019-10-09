window.onload = function() {watch()}
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); // disabled because the game hasnt started
}


function rollForTurn() {
    var xArray = [];
    var ranNum = "";
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        ranNum = Math.floor(Math.random()*(maximum - minimum) + minimum);
        xArray.push(ranNum);

    }
    diceRoll();
    //plays sound and shows what player rolled what on the dice
    for (i=0;i<xArray.length;i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var ptwo = xArray[1];
        if (pOne == pTwo) {
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled ["+pOne+"]<br>";
        writeMag(txt1);
        txt = txt1 + "Player 2 rolled ["+pTwo+"]<br><br>";
        setTimeout(function() (writeMag(txt1);), 1000); //time delay for effect
    }
    // determine and concatenate string showing which player wins the roll
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function(){txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function(){txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    //pass which player won the roll
    return first;


    //start game
    function startGame() {
        var xTurn = 0;
        activePlayer = rollForTurn();
        if (activePlayer == "") {
            activePlayer = rollForTurn();
        }
        setTimeout(function() {hideGameMsg();}, 4000);

        var btn = document.getElementById('btnStart');
        btnDisabled(btn);
        var btn = document.getElementById('btnStop');
        stopEnabled(btn);
        //assign the active player to console
        var showPlayer = document.getElementById('showPlayer')
        showPlayer.innerHTML = activePlayer;
        showPlayer.style.color = "green";
    }

    function btnDisabled(btn) {
        btn.style.color = "#fff";
        btn.style.border = "2px solid rgb(153, 153, 102)";
        btn.style.backgroundColor = "rgb(214, 214, 194)";
        btn.disabled = true;
    }
    
    funtion stopEnabled(btn) {
        btn.style.color = "#fff";
        btn.style.border = "2px solid rgb(204, 0, 0)";
        btn.style.backgroundColor = "rgb(255, 51, 51)";
        btn.disabled = false;
    }

    funtion startEnabled(btn) {
        btn.style.color = "#fff";
        btn.style.border = "2px solid rgb(0, 153, 0)";
        btn.style.backgroundColor = "rgb(57, 230, 0)";
        btn.disabled = false;
    }

    function stopGame() {
        hideGameMsg();
        var btn = document.getElementById('btnStart');
        startEnabled(btn);
        var btn = document.getElementById('btnStop');
        btnDisabled(btn);
        var showPlayer = document.getElementById('showPlayer')
        showPlayer.innerHTML = "Game stopped";
        showPlayer.style.color="red";

        //reset all squares to their starting empty state.
        var arrayO = document.getElementByClassName("O")
        var arrayX = document.getElementByClassName("X")
        for (var i=0; i<arrayX.length;i++){
            arrayO[i].style.transform = "translateY(-100%)";
        }
        for (var i=0; i<arrayX.length;i++) {
            arrayX[i].style.transform = "translateY(100%)";
        }
        // this clears the running log of all game moves
        document.getElementById('boardState').innerHTML = "";
    }

    function showGameMsg() {
        document.getElementById('gameMsgBox').style.display = 'block';
    }

    function hideGameMsg() {
        clearMsg()
        document.getElementById('gameMsgBox').style.display = "none"; //hide the div
    }

    function writeMsg(txt) {
        showGameMsg();
        document.getElementById('gameMsg').innerHTML = txt;
    }

    function clearMsg() {
        document.getElementById('gameMsg').innerHTML = "";
    }

    //this function is for the player configuration panel and checks the 
    // proposed avatar assingments and prevents them from being the same.
    function saveSettings()
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("Player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text){
        alert("Error - Player 1 and Player 2 cannot both be assigned as: "+p1Selected[p1Index].text)

    } else {
        document.getElementById('p1Display').innerHTML=p1Selected[p1Index].text;
        document.getElementById('p2Display').innerHTML=p2Selected[p2Index].text;
    }

}

function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}

function determineAvatar() {
    //determine the avatar to paint for active player
    var avatarArray = getAvatars();
    var active = document.getElementById('showPlayer').innerHTML;
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player1") {
        var paintAvatar = p1Avatar;
    } else if (active == "player 2"){
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; // returned back the correct avatar
}

function avatarPlace() {
    var parseText = document.getElementById('gameMsg').innerHtml;
    var showPlayer = document.getElementById('showPlayer');
    // check if there is already a winner...if there is, the  dont continue the game
    if (parseText == "Thats three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!") {
        showPlayer.innerHTMl = "Game Stopped";
        showPlayer.style.color="red";
    } 
    activePlayer = showPlayer.innerHtml;
    if (activePlayer == "Player 1"){
        showPlayer.innerHTML = "Player 2";
    } else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie();
}
//this function will get the array of the current board
//and check the proposed move for validity
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0); // comparing index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

function check(info, square) {
    for (var i in info){
        var tempInfo = info[i].charAt(0);
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

//as squares are selected they check in with this function to see if that particular
//square has already been assigned and if it has not, record new square with the assigned avatar
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById('boardState').innerHTML;
    var info = boardState.split(",");
    verdict = check(info, square);
    return verdict;
}
// this fuction will get a lst of previous moves and concatenate 
//them to current move
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var perviousMoves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove;
}

function checksForWinCon() {
    var squareArray = [];
    var target = document.getElementById('boardstate');
    var info  = target.innerHTML;
    info = info.sustring(1);
    info = info.split(',');
    info.sort();
    for (var i in info){
        squareArray.push(info[i].charAt(0));
    }
}
//call this following array of functions to check for any of the possible win cons
checkWinCon1(info,squareArray);
checkWinCon2(info,squareArray);
checkWinCon3(info,squareArray);
checkWinCon4(info,squareArray);
checkWinCon5(info,squareArray);
checkWinCon6(info,squareArray);
checkWinCon7(info,squareArray);
checkWinCon8(info,squareArray);
check4Tie();

function check4Tie() {
    var boardState = document.getElementById('boardState').innerHTML;
    boardState = boardState.substring(1); //remove leading comma
    boardState = boardState.split(','); //separates the string by commas into an array
    var check = document.getElementById('gameMsg').innerHTML;
    if (boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!")
        var txt1 = "Oh no! Nobody wins, it was a tie!";
        tieSound();
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
}

function winner(winDetected,winCon) {
    if (winDetected == "win") {
        var showme = winDetected;
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = "That's three in a row, "+activePlayer+ " wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        btnDisabled(btn);
        document.getElementById('showPlayer').innerHTML = "Game Stopped";
        glowBoard(winCon);
    }
}

function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementByClassName('square')
    for (var i=0;1<squares.length;i++){
        if (i == index0) {
            var bg1 = squares[1];
            blink();
            winSound();
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(244,179,66)';}, 100);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(244,238,66)';}, 200);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(197,238,66)';}, 300);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(122,244,66)';}, 400);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(66,244,235)';}, 500);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(244,179,66)';}, 600);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(244,238,66)';}, 700);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(197,244,66)';}, 800);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(122,244,66)';}, 900);
            setTimeout(function() {bg1.style.backgroundColor = 'rgb(66,244,235)';}, 1000);
            setTimeout(function() {bg1.style.backgroundColor = '#d7f3f7';}, 1100);
        } else if (i == index1) {
            var bg2 = squares[i];
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(66,244,235)';}, 100);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(122,244,66)';}, 200);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(197,244,66)';}, 300);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244,238,66)';}, 400);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244,179,66)';}, 500);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(66,244,235)';}, 600);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(122,244,66)';}, 700);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(197,244,66)';}, 800);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(224,238,66)';}, 900);
            setTimeout(function() {bg2.style.backgroundColor = 'rgb(244,179,235)';}, 1000);
            setTimeout(function() {bg2.style.backgroundColor = '#d7f3f7';}, 1100);

        } else if (i == index2) {
            var bg3 = squares[i];
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244,179,66)';}, 100);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244,238,66)';}, 200);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(197,244,66)';}, 300);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(122,244,66)';}, 400);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(66,244,235)';}, 500);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244,179,66)';}, 600);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(244,238,66)';}, 700);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(197,244,66)';}, 800);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(122,244,66)';}, 900);
            setTimeout(function() {bg3.style.backgroundColor = 'rgb(66,244,235)';}, 1000);
            setTimeout(function() {bg3.style.backgroundColor = '#d7f3f7';}, 1100);
        }
    }
    setTimeout(function() (stopGame();), 1200);

}

function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() (sound.pause();), 400);
    setTimeout(function() (sound.currentTime = 0;), 500);
}
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById("gameMsg").innerHTML;
    setTimeout(function() (sound.play();), 500);
}
function winSound() {
    var sound = document.getElementById("tieGame");
    setTimeout(function() (sound.play();), 500);
    setTimeout(function() (sound.play();), 2700);
    setTimeout(function() (sound.currentTime = 0;), 2800);
}
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}

function blink() [
    var body = document.getElementById('body');
    setTimeout(function() (body.style.backgroundColor = '#94f7ed'), 100);
    setTimeout(function() (body.style.backgroundColor = '#94cef7'), 200);
    setTimeout(function() (body.style.backgroundColor = '#94a6f7'), 300);
    setTimeout(function() (body.style.backgroundColor = '#b094f7'), 400);
    setTimeout(function() (body.style.backgroundColor = '#cc94f7'), 500);
    setTimeout(function() (body.style.backgroundColor = '#c894f7'), 600);
    setTimeout(function() (body.style.backgroundColor = '#f794d9'), 700);
    setTimeout(function() (body.style.backgroundColor = '#f73881'), 800);
    setTimeout(function() (body.style.backgroundColor = '#c6034e'), 900);
    setTimeout(function() (body.style.backgroundColor = '#e00202'), 1000);
    setTimeout(function() (body.style.backgroundColor = '#ffffff'), 1100);
]


function checkWinCon1(info,squareArray) {
    var winDetected = "on";
    var winCon = [0,1,2];

    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }

        if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
            if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
                winDetected = "win";
                winner(winDetected,winCon1);
                return;
            }
        }
        winner(winDetected,winCon1);
    }
}
//checking for 345
function checkWinCon2(info,squareArray) {
    var winDetected = "on";
    var winCon = [3,4,5];

    for (var i in info) {
        if (info[i].charAt(0) == "3") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "4") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match2Avatar = info[i].charAt(1);
        }

        if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) {
            if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
                winDetected = "win";
                winner(winDetected,winCon1);
                return;
            }
        }
        winner(winDetected,winCon1);
    }
}





function square1Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "0"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [0];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square2Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "1"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [1];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square3Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "2"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [2];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square4Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "3"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [3];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square5Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "4"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [4];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square6Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "5"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [5];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square7Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "6"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [6];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square8Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "7"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [7];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function square9Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != ("Game Stopped") {
        var square = "8"; //identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementByClassName(paintAvatar) [8];
            if (paintAvatar == "O") {
                animateO(selected); //calls function to animate
            } else if (paintAvatar == "X"){
                animateX(selected);
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checksForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound(); //play a sound when avatar is placed
        }
    }
}

function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0)" : "translateY(-100%)";
}

function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "translateY(0)" : "translateY(100%)";
}

