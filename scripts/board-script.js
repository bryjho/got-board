/*
GLOBAL VARS
 */
const pubSub = PubSubInstance.getInstance();

/* The following functions are used to create board tiles and number them from 1-30 */
function createBoard() {
    function createBoardTiles1() {
        var numbers = [25,26,27,28,29,30]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer1");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");

            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles2() {
        var numbers = [24,23,22,21,20,19]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer2");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 !== 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles3() {
        var numbers = [13,14,15,16,17,18]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer3");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles4() {
        var numbers = [12,11,10,9,8,7]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer4");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 !== 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles5() {
        var numbers = [1,2,3,4,5,6]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer5");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }


    createBoardTiles1();
    createBoardTiles2();
    createBoardTiles3();
    createBoardTiles4();
    createBoardTiles5();
}



/* Dice Rolloer */
var dice1 = {
    sides: 6,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
}

function printNumber(number) {
    var placeholder = document.getElementById('diceNumber');
    placeholder.innerHTML = number;
    LocalStorage.set(StorageKeys.DICE, number);
}

var button = document.getElementById('rollerButton');
button.onclick = function() {
    var result = dice1.roll();
    pubSub.publish(ActionEvents.DICE_ROLL, result);
    printNumber(result);

    var alert = document.getElementById("diceAlert")
    alert.textContent = "You have rolled a " + result + "!";

};

const saveBoardNumber = function(boardNumber, current) {
    const curr = () => LocalStorage.set(StorageKeys.CURRENT_BOARD_NUMBER, boardNumber);
    const prev = () => LocalStorage.set(StorageKeys.PREVIOUS_BOARD_NUMBER, boardNumber);
    current ? curr() : prev();
};

const onMoveCharacterToken = function(dice) {
    const currentBoardNumber = parseInt(LocalStorage.get(StorageKeys.CURRENT_BOARD_NUMBER));
    const character = LocalStorage.get(StorageKeys.CHARACTER);
    let tmpMove = dice + currentBoardNumber;

    toMove = tmpMove >= 30 ? 30 : tmpMove;

    // save current
    saveBoardNumber(toMove, true);
    // save previous
    saveBoardNumber(currentBoardNumber, false);
    // execute move
    moveCharacterToken(character, currentBoardNumber, toMove);

    if (tmpMove === 5) {
        setTimeout(function () {
            alert('Lord Walder Frey has lured you to a wedding where he massacred a lot of men as revenge against Kind Rob Stark for breaking the pact between their houses. You managed to escape this deadly fate. Move back 3 spaces.');
            return;
        }, 200);

        moveBack = tmpMove - 3;

        saveBoardNumber(moveBack, true);
        saveBoardNumber(currentBoardNumber, false);
        moveCharacterToken(character, currentBoardNumber, moveBack);
        
    } else if (tmpMove === 12) {
        setTimeout(function () {
            alert('Some of the wildlings managed to climb over the wall and venture into the land of the seven kingdoms. You were caught off guard and had to flee your post on the wall. Move back 2 spaces.');
            return;
        }, 200);

        moveBack = tmpMove - 2;

        saveBoardNumber(moveBack, true);
        saveBoardNumber(currentBoardNumber, false);
        moveCharacterToken(character, currentBoardNumber, moveBack);

    } else if (tmpMove === 15) {
        setTimeout(function () {
            alert('On your way to Highgarden, you were ambushed by the Dothraki horde. They are very vicious and barbaric. Having no other choice, you decided to fall back and regroup. Move back 4 spaces.');
            return;
        }, 200);

        moveBack = tmpMove - 4;

        saveBoardNumber(moveBack, true);
        saveBoardNumber(currentBoardNumber, false);
        moveCharacterToken(character, currentBoardNumber, moveBack);

    } else if (tmpMove === 20) {
        setTimeout(function () {
            alert('The Night King has already raised his army of white walkers and attacked the village of Hardhome. Through a very desperate effort, you were able to get a hold of a boat and save yourself from being turned into a white walker. Move back 6 spaces.');
            return;
        }, 200);

        moveBack = tmpMove - 6;

        saveBoardNumber(moveBack, true);
        saveBoardNumber(currentBoardNumber, false);
        moveCharacterToken(character, currentBoardNumber, moveBack);

    } else if (tmpMove === 27) {
        setTimeout(function () {
            alert('As you make your final approach to the iron throne, your enemies’ last attempt to thwart your plans came to you with a loud bang. A huge explosion blew you away and all you can see are green flames surrounding you. You have failed to take over King’s Landing. Move back to start.');
            return;
        }, 200);

        moveBack = tmpMove - 26;

        saveBoardNumber(moveBack, true);
        saveBoardNumber(currentBoardNumber, false);
        moveCharacterToken(character, currentBoardNumber, moveBack);
    }
};

const addListeners = function() {
    pubSub.subscribe(ActionEvents.DICE_ROLL, onMoveCharacterToken);
};

const initValues = function() {
    const currentBoardNumber = parseInt(LocalStorage.get(StorageKeys.CURRENT_BOARD_NUMBER));
    if (!currentBoardNumber) {
        saveBoardNumber(0, true);
    }
    const dice = parseInt(LocalStorage.get(StorageKeys.DICE));
    if (dice) {
        printNumber(dice);
    }
};

const main = function () {
    const character = LocalStorage.get(StorageKeys.CHARACTER);
    createBoard();

    initValues();
    addListeners();
    renderCharacterToken(character);

};

(function () {
    main();
})();

