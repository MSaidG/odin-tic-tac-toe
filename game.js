function createPlayer(name, side){

    const getName = () => name;
    const getSide = () => side;

    function move() {

        let sign = getSide();
        let place = Math.floor((Math.random() * 9));
    
        while (gameBoard[place] !== "")
        {
            place = Math.floor((Math.random() * 9));
        }
    
        cells[place].textContent = sign;
        gameBoard[place] = sign;
    }

    return {
        getName, getSide, move
    }

}

const Gameboard = (function() {

    return {

    }

})();


const DisplayController = (function() {

    return {

    }

})();






let gameBoard = [];
let player = createPlayer("You", "X");
let ai = createPlayer("AI", "O");

const x_btn = document.querySelector(".x");
const o_btn = document.querySelector(".o");
const winText = document.querySelector("h1");


x_btn.addEventListener("click", function(){

    player = createPlayer("You", "X");
    ai = createPlayer("AI", "O");
    resetGame();

});

o_btn.addEventListener("click", function(){

    player = createPlayer("You", "O");
    ai = createPlayer("AI", "X");
    resetGame();
    ai.move();

});


const cells = document.querySelectorAll(".cellbtn");
cells.forEach( element => {
    
    element.addEventListener("click", function() {

        let sign = player.getSide();

        if (element.textContent === "")
        {
            element.textContent = sign;
            gameBoard[+element.id] = sign;
            if (checkGameState(player.getName())) return;
            ai.move();
            if(checkGameState(ai.getName())) return;
        }

        
    });
});


function resetGame() {

    for (let i = 0; i < 9; i++)
    {
        cells[i].textContent = "";
        gameBoard[i] = "";
    }

}

function checkGameState(turn) {

    if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] !== ""
        ||gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] !== ""
        ||gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== ""
        ||gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] !== ""
        ||gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] !== ""
        ||gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] !== ""
        ||gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] !== "")
    {
        if (turn === "You") 
        {
            winText.textContent = "You Win!";
            setTimeout(function() {
                winText.textContent = "";
            }, 3000)

            setTimeout(resetGame, 3000);


        }
        else if (turn === "AI")
        {
            winText.textContent = "You Lost!";
            setTimeout(function() {
                winText.textContent = "";
            }, 3000)

            setTimeout(resetGame, 3000);


        }

        return true;
    }

    let count = 0;
    for (let i = 0; i < 9; i++)
    {
        if (gameBoard[i] !== "")
        {
            count++;
            if (count === 9)
            {
                winText.textContent = "It's a tie!";
                setTimeout(function() {
                    winText.textContent = "";
                }, 3000)
    
                setTimeout(resetGame, 3000);
            }
        }
    }

    return false;
}




