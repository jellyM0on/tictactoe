//game board data 
const gameBoard = (() => {

    //array to contain player moves
    let board = Array(9).fill("");
    const boxes = document.querySelectorAll(".box"); 

    //assigns each div box to an index in board array
    const assignMark = () => {
        let i = 0; 
        for (box of boxes) {
            box.setAttribute("data-code", `${i}`);
            i++; 
        }; 
    };

    //to show player move/mark on board
    const showMark = () => {
        for (box of boxes) {
            box.textContent = board[box.dataset.code]; 
        };
    };

    //mechanism for player to make their move. board is checked after every move
    const makeMark = () => {
        boxes.forEach((box) => box.addEventListener("click", () => {
            const boxCode = box.dataset.code; 
            if (board[boxCode] !== ""){
                return; 
            }
            if (playerInfo.userInfo[0].status == null || !playerInfo.userInfo[0].status) {
            board[boxCode] = switchTurn(); 
            showMark();
            checkBoard();
            };
        }));
    }; 

    //alternates players 
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
    
    //winning patterns
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
    
    //checks for wins  
    const checkWins = (a, b, c, ia, ib, ic) => {
        if ((a == b) && (b == c) && (a !== "")) {
            boxes[ia].classList.add("highlight");
            boxes[ib].classList.add("highlight");
            boxes[ic].classList.add("highlight");
            gameControls.winRound(a);
            return;
        } else if (!board.includes("")) {
            gameControls.tieRound();
            return;
        };
    };

    //shortens winning patterns
    function shr(a, b, c){
        checkWins(board[a], board[b], board[c], a, b, c);
    }; 

    return { board, boxes, assignMark, makeMark, showMark }
})();

const gameControls = (() => {
    //starts game
    const startGame = () => {
        gameBoard.assignMark(); 
        gameBoard.makeMark(); 
    };

    //functions when round is won versus tied
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

    //restarts game data 
    const restartGame = () => {
        const restartBtn = document.querySelector(".restart-btn"); 
        restartBtn.addEventListener("click", () => {
        playerInfo.userInfo.map(user => user.status = null); 
        gameBoard.board.fill("");
        gameBoard.showMark(); 
        gameBoard.boxes.forEach((box) => box.classList.remove("highlight"));
        document.documentElement.style.setProperty("--end-visibility", "none");
        });
        gameControls.startGame(); 
    };

    return { startGame, winRound, tieRound, restartGame }
})(); 

const playerInfo = (() => {

    //container for user information 
    let userInfo = []; 

    //factory to make players
    const makePlayer = (name, playerMark) => {
        const status = null;
        return { name, playerMark, status };
    };

    //gets user input from form to assign user info
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

//game flow
const gameFlow = (() => {
    playerInfo.getInfo(); 
    gameControls.startGame();
    gameControls.restartGame(); 
})();