const xClass = 'x'
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

const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn=''
const board = document.getElementById('game-board')

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click' , handleClick,{ once: true })
    })
    setBoardHoverClass()
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
    
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
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

if(circleTurn){
    console.log("circle turn")
}