function createPlayer(name, side){

    const getName = () => name;
    const getSide = () => side;

    return {
        getName, getSide
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
    console.log(player.getSide());

});

o_btn.addEventListener("click", function(){

    player = createPlayer("You", "O");
    ai = createPlayer("AI", "X");
    console.log(player.getSide());


});




const cells = document.querySelectorAll(".cellbtn");
cells.forEach( element => {
    
    element.addEventListener("click", function() {
        
        element.textContent = player.getSide();
    });
});


for (let i = 0; i < 9; i++)
{
    gameBoard[i] = cells[i].textContent;
    console.log(gameBoard[i]);
}
