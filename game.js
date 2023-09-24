function createPlayer(name, side, difficulty){

    const getName = () => name;
    const getSide = () => side;

    function move() {

        let sign = getSide();
        let place = 0;

        if (difficulty === "random")
        {
            place = Math.floor((Math.random() * 9));
            while (Gameboard.getGameBoard(place) !== "")
            {
                place = Math.floor((Math.random() * 9));
            }
        }
        else if (difficulty === "unbeatable")
        {
            place = Gameboard.checkGameState();
            if (Gameboard.getGameBoard(4) === "") place = 4;
        }
    

        cells[place].textContent = sign;
        Gameboard.setGameBoard(place, sign);
    }
    

    return {
        getName, getSide, move
    }

}

const Gameboard = (function() {

    const winText = document.querySelector("h1");
    let gameBoard = new Array(9);

    const getGameBoard = (index) => gameBoard[index];
    const setGameBoard = (index, value) => (gameBoard[index] = value);

    function checkGameState() {

        let corners = [0, 2, 6, 8];
        let edges = [1, 3, 5, 7];
        let center = 4;
        console.log(`center: ${gameBoard[center]}`);
        console.log(`2, 4: ${gameBoard[2]} ${gameBoard[4]}`);
        console.log(`2, 4: ${gameBoard[2] === gameBoard[4] ? "ayni" : "farkli"}`);
        console.log(`0, 3: ${gameBoard[0] === gameBoard[3] ? "ayni" : "farkli"}`);
        console.log(`7, 8: ${gameBoard[7] === gameBoard[8] ? "ayni" : "farkli"}`);
        if ((gameBoard[0] !== "" && gameBoard[0] === gameBoard[8] || gameBoard[2] !== "" && gameBoard[2] === gameBoard[6] || gameBoard[1] !== "" && gameBoard[1] === gameBoard[7] || gameBoard[3] !== "" && gameBoard[3] === gameBoard[5]) && gameBoard[center] === "") return center;
        if ((gameBoard[1] !== "" && gameBoard[1] === gameBoard[2] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[8] || gameBoard[3] !== "" && gameBoard[3] === gameBoard[6]) && gameBoard[0] === "") return 0;
        if ((gameBoard[1] !== "" && gameBoard[1] === gameBoard[0] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[6] || gameBoard[5] !== "" && gameBoard[5] === gameBoard[8]) && gameBoard[2] === "") return 2;
        if ((gameBoard[0] !== "" && gameBoard[0] === gameBoard[3] || gameBoard[2] !== "" && gameBoard[2] === gameBoard[4] || gameBoard[7] !== "" && gameBoard[7] === gameBoard[8]) && gameBoard[6] === "") return 6;
        if ((gameBoard[5] !== "" && gameBoard[5] === gameBoard[2] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[0] || gameBoard[7] !== "" && gameBoard[7] === gameBoard[6]) && gameBoard[8] === "") return 8;
        if ((gameBoard[0] !== "" && gameBoard[0] === gameBoard[2] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[7]) && gameBoard[1] === "") return 1;
        if ((gameBoard[0] !== "" && gameBoard[0] === gameBoard[6] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[5]) && gameBoard[3] === "") return 3;
        if ((gameBoard[8] !== "" && gameBoard[8] === gameBoard[2] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[3]) && gameBoard[5] === "") return 5;
        if ((gameBoard[6] !== "" && gameBoard[6] === gameBoard[8] || gameBoard[4] !== "" && gameBoard[4] === gameBoard[1]) && gameBoard[7] === "") return 7;

        console.log("HEEY");


        for (let i = 0; i < 4; i++)
        {
            if (gameBoard[corners[i]] === "")
            {
                return corners[i];
            }
        }

        for (let i = 0; i < 4; i++)
        {
            if (gameBoard[edges[i]] === "")
            {
                return edges[i];
            }
        }

    }


    function checkGameboardFull ()
    {
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

    }

    function resetGame() {

        for (let i = 0; i < 9; i++)
        {
            cells[i].textContent = "";
            gameBoard[i] = "";
        }
    
    }

    function checkWinConditions (turn)
    {
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
                }, 2000)

                setTimeout(resetGame, 1000);


            }
            else if (turn === "AI")
            {
                winText.textContent = "You Lost!";
                setTimeout(function() {
                    winText.textContent = "";
                }, 2000)

                setTimeout(resetGame, 1000);


            }

            return true;
        }

        checkGameboardFull();
        return false;

    }



    return {
        resetGame, checkWinConditions, setGameBoard, getGameBoard, checkGameState
    }

})();


const displayController = (function() {

    const x_btn = document.querySelector(".x");
    const o_btn = document.querySelector(".o");

    const sidebtns = document.querySelectorAll(".side");

    sidebtns.forEach(btn => {

        btn.addEventListener("click", () => {
    
            document.querySelector(".selected-side")?.classList.remove("selected-side");
            btn.classList.add("selected-side");
            if (btn.id === "x")
            {
                player = createPlayer("You", "X");
                ai = createPlayer("AI", "O", difficulty);
                Gameboard.resetGame();
            }
            else if (btn.id === "o")
            {
                player = createPlayer("You", "O");
                ai = createPlayer("AI", "X", difficulty);
                Gameboard.resetGame();
                ai.move();
            }
        });
    });

    return {
    }

})();



document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("x").click();
    document.getElementById("random").click();

 });

let difficulty = "random";
let player = createPlayer("You", "X");
let ai = createPlayer("AI", "O", difficulty);


const diffbtns = document.querySelectorAll(".diff");

diffbtns.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".selected-difficulty")?.classList.remove("selected-difficulty");
        btn.classList.add("selected-difficulty");
        difficulty = btn.id; 
        if (player.getSide() === "X")
        {
            player = createPlayer("You", "X");
            ai = createPlayer("AI", "O", difficulty);
            Gameboard.resetGame();
        }
        if (player.getSide() === "O")
        {
            player = createPlayer("You", "O");
            ai = createPlayer("AI", "X", difficulty);
            Gameboard.resetGame();
            ai.move();
        }
    });
});

const cells = document.querySelectorAll(".cellbtn");
cells.forEach( element => {
    
    element.addEventListener("click", function() {
    
        let sign = player.getSide();
    
        if (element.textContent === "")
        {
            element.textContent = sign;
            Gameboard.setGameBoard(+element.id, sign);
            if (Gameboard.checkWinConditions(player.getName())) return;
            ai.move();
            if(Gameboard.checkWinConditions(ai.getName())) return;
        }
    
        
    });
});



