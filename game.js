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
            checkGameState(player.getName()); 
            ai.move();
            checkGameState(ai.getName()); 
        }

        for (let i = 0; i < 9; i++)
        {
            console.log(`${i}, ${gameBoard[i]}`);
        }

        console.log("-----");
        
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

    console.log(turn);
    console.log(gameBoard[0]);

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
            console.log("You win!")
            resetGame();
        }
        else
        {
            console.log("You lost!")
            resetGame();
        }


    }

    let count = 0;
    for (let i = 0; i < 9; i++)
    {
        if (gameBoard[i] !== "")
        {
            count++;
            if (count === 9)
            {
                resetGame();
                console.log("reset");
            }
        }
    }
}




