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

    //varname = querySelectorAll('[data-row~="variable"])
    //if varname[1].textContent == varname[2].textContent
    
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
            winRound();
        } else if (!board.includes("")) {
            tieRound();
        };
    };

    function shr(a, b, c){
        checkWins(board[a], board[b], board[c]);
    }; 


    const winRound = () => {
        console.log("win"); 
    }

    const tieRound = () => {
        console.log("tie")
    }

    return { assignMark, makeMark, checkWins }
})();

//make players
const makePlayer = (name, playerMark) => {
    const status = null;
    return { name, playerMark, status };
};

//gameFlow
const gameFlow = (() => {
    gameBoard.assignMark();
    gameBoard.makeMark();
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