const firebaseConfig = {
    apiKey: "AIzaSyAb9zglNHMpwfHoQaL8v-jxd_dNN-A7_u4",
    authDomain: "game-site-d97cf.firebaseapp.com",
    projectId: "game-site-d97cf",
    storageBucket: "game-site-d97cf.appspot.com",
    messagingSenderId: "1058182439081",
    appId: "1:1058182439081:web:ccc1d2944102c2db9089b8",
    measurementId: "G-F04G3G3QTW"
};



//Logic for the game

//array of coins
var coinsArray = [];
var turnCounter = 0;
var coinsTaken = 0;
var winner = 'none';
//function for new game
function newNIMGame() {
    
    firebase
  .firestore()
  .collection('NIM').add({
    coins_taken: coinsTaken,
    winner: winner,
    game_length: turnCounter
  });

    turnCounter = 1;
    p1win = 0;
    p2win = 0;
    coinsTaken = 0;
    displayTurn();
    console.log("Turn: " + turnCounter);

    coinsArray = [];
    for (var i = 0; i < 12; i++) {
        coinsArray.push('<img src="../img/nim/coin.png" width="150">');
    }
    document.getElementById('coins_box').innerHTML = '';
    for (var i = 0; i < 12; i++) {
        document.getElementById('coins_box').innerHTML += coinsArray[i];
    }
}
document.getElementById('reloadNIM').addEventListener('click', newNIMGame, false);
window.onload = newNIMGame;

//function for take 1
function takeOne() {
    if (coinsArray.length) {
        document.getElementById('coins_box').innerHTML = '';
        coinsTaken++;
        coinsArray.pop();
        turnCounter++;
        displayTurn();
        console.log("Turn: " + turnCounter);
        console.log("Coins Taken: " + coinsTaken);
        for (var i = 0; i < coinsArray.length; i++) {
            document.getElementById('coins_box').innerHTML += coinsArray[i];
        }
    } else {
        alert('No coins remaining. Please select new game!');
    }
}
document.getElementById('takeOne').addEventListener('click', takeOne, false);

//function for take 2
function takeTwo() {
    if (coinsArray.length > 1) {
        document.getElementById('coins_box').innerHTML = '';
        coinsTaken += 2;
        coinsArray.pop();
        coinsArray.pop();
        turnCounter++;
        displayTurn();
        console.log("Turn: " + turnCounter);
        console.log("Coins Taken: " + coinsTaken);
        for (var i = 0; i < coinsArray.length; i++) {
            document.getElementById('coins_box').innerHTML += coinsArray[i];
        }
    } else if (coinsArray.length) {
        alert('Not enough coins!');
    } else {
        alert('No coins remaining. Please select new game!');
    }
}
document.getElementById('takeTwo').addEventListener('click', takeTwo, false);

//function for take 3
function takeThree() {
    if (coinsArray.length > 2) {
        document.getElementById('coins_box').innerHTML = '';
        coinsTaken += 3;
        coinsArray.pop();
        coinsArray.pop();
        coinsArray.pop();
        turnCounter++;
        displayTurn();
        console.log("Turn: " + turnCounter);
        console.log("Coins Taken: " + coinsTaken);

        for (var i = 0; i < coinsArray.length; i++) {
            document.getElementById('coins_box').innerHTML += coinsArray[i];
        }
    } else if (coinsArray.length) {
        alert('Not enough coins!');
    } else {
        alert('No coins remaining. Please select new game!');
    }
}
document.getElementById('takeThree').addEventListener('click', takeThree, false);

function displayTurn() {
    if (turnCounter % 2 == 0) {
        document.getElementById("playerTurn").textContent = "Player 2's turn";
        if (coinsArray.length<1) {
            document.getElementById("playerTurn").textContent = "Player 2 wins!";
            winner = "p2";
        }
    }
    else {
        document.getElementById("playerTurn").textContent = "Player 1's turn";
        if (coinsArray.length<1) {
            document.getElementById("playerTurn").textContent = "Player 1 wins!";
            winner = "p1";
        }
    }
}

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//If used outside a function, spits out an error. So I put it in window.onload
window.onload = function() {
    firebase.initializeApp(firebaseConfig);
}




