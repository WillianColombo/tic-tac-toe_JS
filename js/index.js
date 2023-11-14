import checkWin from "./checkWin.js"
import { getTurn } from "./controlTurns.js"
import { enabledBoard, initTurn, turn } from "./initGame.js"
import { board } from "./logicBoard.js"
import restart, { i, setI } from "./restart.js"
import { win } from "./result.js"

//Evento inicial para habilitar o tabuleiro
document.getElementById('names-player').addEventListener('submit', function (ev) {
    ev.preventDefault()
    initTurn()
    enabledBoard()
    const button = document.getElementById('play')
    button.innerText = 'Restart'
    button.type = 'button'
    button.addEventListener('click', restart)
})


//Evento click das keys
document.querySelectorAll('.keys').forEach(function (key) {
    key.addEventListener('click', function (ev) {
        key.disabled = true
        addChar(turn, ev.currentTarget)
        checkWin(i, key)
        setI(i + 1)
        if (i <= 9 && win === false) {
            getTurn()
        }
    })
})

//Função para adicionar na key a marcação
function addChar(turn, button) {
    let key = ''
    if (turn === true) {
        button.innerText = 'X'
        key = button.dataset.value
        board[key - 1].char = 'X'
    } else {
        button.innerText = 'O'
        key = button.dataset.value
        board[key - 1].char = 'O'
    }
}





