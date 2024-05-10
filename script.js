const xClass = 'x'
let winCircleCount = 0
let winXCount = 0
const circleClass = 'circle'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessagetxt = document.getElementById("winning-message")
const restartBtn = document.getElementById("restart-btn")
const circleWinCount = document.getElementById("circle-count")
const xWinCount = document.getElementById("x-count")
const circleScoreFromLocalStorage = JSON.parse(localStorage.getItem("winCircleCount")) || 0
const xScoreFromLocalStorage = JSON.parse(localStorage.getItem("winXCount")) || 0
const resetScore = document.getElementById("reset-score")



const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn=''
const board = document.getElementById('game-board')

winCircleCount = circleScoreFromLocalStorage

winXCount = xScoreFromLocalStorage


function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click' , handleClick,{ once: true })
    })
    setBoardHoverClass()
    playWelcomeSound()
}

startGame()

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    //mark
    placeMark(cell, currentClass)
    //win
    if(checkWin(currentClass)){
        endGame(false)
        //draw
    } else if(isDraw()) {
        endGame(true)
    } else {
            //switch turns
        swapTurn()
        setBoardHoverClass()
    }
    displayTurnMessage()
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
        playErrorSound()
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        if (circleTurn) {
            winCircleCount++
            localStorage.setItem("winCircleCount", JSON.stringify(winCircleCount))
            showWinCount(circleWinCount)
        } else {
            winXCount++
            localStorage.setItem("winXCount", JSON.stringify(winXCount))
            showWinCount(xWinCount)
        }
        }
    winningMessagetxt.classList.add('show')
    
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn =! circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains (xClass) || cell.classList.contains(circleClass)
    } )
}

function restart(){
    window.location.reload()
}

function displayTurnMessage() {

    const messageDiv = document.getElementById('message')
    messageDiv.innerText = circleTurn ?   "Circle's Turn":"X's Turn"
}

function showWinCount(winCountElement) {
    winCountElement.innerText = circleTurn ? winCircleCount : winXCount;
}

resetScore.addEventListener("click",function(){
    localStorage.clear()
    restart()
})

function playErrorSound() {
    const errorSound = document.getElementById('error-sound');
    errorSound.play();
}

function playWelcomeSound() {
    const welcomeSound = document.getElementById('welcome-sound');
    welcomeSound.play();
}

function displayPopupWithMessage(title, width, height) {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const url = 'message.html'
    const options = `width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, title, options);
}


displayPopupWithMessage('Popup with Message', 400, 300)


xWinCount.innerText = winXCount
circleWinCount.innerText = winCircleCount





