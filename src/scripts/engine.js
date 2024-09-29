const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curreTime: 60,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curreTime--;
    state.view.timeLeft.textContent = state.values.curreTime; // Correção aqui

    if (state.values.curreTime <= 0) {
       clearInterval(state.actions.countDownTimerId);
       clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}
function playSound(){
    let audio = new Audio("src/audios/Super Mario Bros. Coin - QuickSounds.com.mp3");
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((squares) => {
        squares.addEventListener("mousedown", () => {
            if (squares.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();