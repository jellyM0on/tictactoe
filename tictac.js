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
            if (playerInfo.userInfo[0].status == null) {
            board[boxCode] = switchTurn(); 
            showMark();
            checkBoard();
            };
        }));
    }; 

    let mark; 
    const switchTurn = () => {
        const turnText = document.querySelector(".player-turn"); 
        if (mark == undefined || mark == "X"){
            mark = "O";
            turnText.textContent = "Turn to Move: O";
            return "X";
        } if (mark == "O") {
            mark = "X";
            turnText.textContent = "Turn to Move: X";
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
            return;
        } else if (!board.includes("")) {
            gameControls.tieRound();
            return;
        };
    };

    function shr(a, b, c){
        checkWins(board[a], board[b], board[c]);
    }; 

    return { board, mark, assignMark, makeMark, showMark }
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
        playerInfo.userInfo.map(user => user.status = "fin"); 
        resultText.textContent = `${winnerName} won the round!`
    };

    const tieRound = () => {
        document.documentElement.style.setProperty("--end-visibility", "block");
        playerInfo.userInfo.map(user => user.status = "tie"); 
        resultText.textContent = `Tie!`;
    };

    const restartGame = () => {
        const restartBtn = document.querySelector(".restart-btn"); 
        restartBtn.addEventListener("click", () => {
        playerInfo.userInfo.map(user => user.status = null); 
        gameBoard.board.fill("");
        gameBoard.showMark(); 
        document.documentElement.style.setProperty("--end-visibility", "none");
        });
        gameControls.startGame(); 
    };

    return { startGame, winRound, tieRound, restartGame }
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
    })
   };
    return { userInfo, getInfo }; 
})();

//gameFlow
const gameFlow = (() => {
    playerInfo.getInfo(); 
    gameControls.startGame();
    gameControls.restartGame(); 
})();