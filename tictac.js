//gameboard
const gameBoard = (() => {

    let board = Array(9).fill("");
    const boxes = document.querySelectorAll(".box"); 

    const assignMark = () => {
        let i = 0; 
        for (box of boxes) {
            box.setAttribute("data-code", `${i}`);
            i++; 
        }; 
    };

    const showMark = () => {
        for (box of boxes) {
            box.textContent = board[box.dataset.code]; 
        };
    };

    const makeMark = () => {
        boxes.forEach((box) => box.addEventListener("click", () => {
            const boxCode = box.dataset.code; 
            if (board[boxCode] !== "" ){
                return; 
            }
            board[boxCode] = switchTurn(); 
            showMark();
            checkBoard();
        }));
    }; 

    let mark; 
    const switchTurn = () => {
        if (mark == undefined || mark == "X"){
            mark = "O";
            return "X";
        } if (mark == "O") {
            mark = "X";
            return "O"; 
        };
    };
    
    const checkBoard = () => {
        shr(0,1,2);
        shr(3,4,5);
        shr(6,7,8);
        shr(0,3,6);
        shr(1,4,7);
        shr(2,5,8); 
        shr(0,4,8);
        shr(2,4,6);
    }; 

    const checkWins = (a, b, c) => {
        if ((a == b) && (b == c) && (a !== "")) {
            gameControls.winRound(a);
        } else if (!board.includes("")) {
            gameControls.tieRound();
        };
    };

    function shr(a, b, c){
        checkWins(board[a], board[b], board[c]);
    }; 

    return { assignMark, makeMark }
})();

//make players


const gameControls = (() => {
    const startGame = () => {
        gameBoard.assignMark(); 
        gameBoard.makeMark(); 
    };

    const resultText = document.querySelector(".end-result"); 
    const winRound = (a) => {
        document.documentElement.style.setProperty("--end-visibility", "block");
        let winnerName = playerInfo.userInfo[0].playerMark == a ? playerInfo.userInfo[0].name : playerInfo.userInfo[1].name;
        resultText.textContent = `${winnerName} won the round!`
    };

    const tieRound = () => {
        document.documentElement.style.setProperty("--end-visibility", "block");
        resultText.textContent = `Tie!`
    };

    const endGame = () => {

    };
    return { startGame, winRound, tieRound }
})(); 

const playerInfo = (() => {

    let userInfo = []; 

    const makePlayer = (name, playerMark) => {
        const status = null;
        return { name, playerMark, status };
    };

    const getInfo = () => {
    const startBtn = document.querySelector("#start-game-btn");
    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById("player-form"));
        const firstName = form.get("player1-name");
        const secondName = form.get("player2-name");
        userInfo.push(makePlayer(firstName, "X"));
        userInfo.push(makePlayer(secondName, "O")); 
        document.documentElement.style.setProperty("--form-visibility", "none");
    })};
    return { userInfo, getInfo }; 
})();

//gameFlow
const gameFlow = (() => {
    playerInfo.getInfo(); 
    gameControls.startGame();
})();






















// const boxes = document.querySelectorAll(".box"); 
// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//     box.textContent = "X";
//     }); 
// });

// const gameBoard = (() => {
//     let board = ["", "", "", "", "", "", "", "", ""];
// })(); 

// //make players
// const makePlayer = (name, playerMark) => {
//     const status = null;
//     return { name, playerMark, status };
// };

// // game flow
// const gameFlow = (() => {

//     const startBtn = document.querySelector("#start-game-btn");
//     startBtn.addEventListener("click", () => {
//         document.documentElement.style.setProperty("--form-visibility", "none");
//         startGame(); 

//         let form = new FormData(document.getElementById("player-form"));
//         let firstName = form.get("player1-name");
//         let secondName = form.get("player2-name");
//     });
    
//     function startGame() {
//         for (i=1; i < 9; i++){
//             startTurn(); 
//         }; 
//     }; 

//     function startTurn() {
        
//     }

//     return { sample }; 
// })(); 

// let playerInfo = [];

// const firstPlayer = makePlayer(playerInfo[0], "X");
// const secondPlayer = makePlayer(playerInfo[1], "O");


// let sample; 

// const startBtn = document.querySelector("#start-game-btn");
// startBtn.addEventListener("click", () => {
//     sample = 1; 
    
//     let form = new FormData(document.getElementById("player-form"));
//     let firstName = form.get("player1-name");
//     let secondName = form.get("player2-name");
//     document.documentElement.style.setProperty("--form-visibility", "none");
// });




//placing mark 

//players will enter name. Player 1 will recieve X mark, Player 2 O mark. 
//each index in gameboard corresponds to a specific position. everytime
// player places mark, mark is put in array 
//after every mark, checking is done. 
//marks that coincide w a specific pattern ends game
//turns, 1-9. 