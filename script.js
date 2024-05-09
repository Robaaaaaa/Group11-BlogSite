const xClass = 'x'
const circleClass = 'circle'
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

    //draw

    //switch turns
    swapTurn()
    setBoardHoverClass()
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

