import { divPlayer1, divPlayer2, removeTurnPlayer1, removeTurnPlayer2 } from "./controlTurns.js"
import { enabledBoard, initTurn } from "./initGame.js"
import { board } from "./logicBoard.js"
import { sectionResult, setWin } from "./result.js"

export let i = 1
export function setI(value){
    i = value
}


//Função para reiniciar o tabuleir
export default function restart() {
    //Retira as marcações de vitória nos botões
    document.querySelectorAll('.keys-win').forEach(function (buttons) {
        buttons.classList = 'keys'
    })

    //Habilita todos os botões
    enabledBoard()

    //Limpa os símbolos dos botões
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.innerText = ''
    })

    //reseta a board lógica
    board.forEach(function (element) {
        element.char = 'y'
    })

    //Remove a mensagem de turnos
    
    if (divPlayer1.children.length > 0) {
        removeTurnPlayer1()
    } else if(divPlayer2.children.length > 0){
        removeTurnPlayer2()
    }

    //Remove a mensagem de resultado
    if (document.getElementById('result').children.length > 0) {
        const p = document.getElementById('text-result')
        p.remove()
    }

    i = 1
    setWin(false)
    sectionResult.classList = ''

    initTurn()
}