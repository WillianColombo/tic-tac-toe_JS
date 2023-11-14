import { removeTurnPlayer1, removeTurnPlayer2 } from "./controlTurns.js"

//Função vitória
export let win = false
export function setWin(value){
    win = value
}

export const sectionResult = document.getElementById('result')
const pResult = document.createElement('p')
pResult.id = 'text-result'

let winner = ''

export function resultWin(char) {
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.disabled = true
    })

    if (char === 'X') {
        removeTurnPlayer1()
        winner = document.getElementById('name-1').value
    } else {
        removeTurnPlayer2()
        winner = document.getElementById('name-2').value
    }
    sectionResult.classList = 'result-win'
    pResult.innerText = winner + " wins"
    sectionResult.appendChild(pResult)

    win = true
}

//Função para destacar as keys que incidiram na vitória
export function regionForWin(x, y, z){
    const keyX = document.getElementById('key' + x)
    const keyY = document.getElementById('key' + y)
    const keyZ = document.getElementById('key' + z)
    keyX.classList = 'keys-win'
    keyY.classList = 'keys-win'
    keyZ.classList = 'keys-win'
}

//Função empate
export function resultTie(char) {
    if (win === false) {
        sectionResult.classList = 'result-tie'
        pResult.innerText = 'Game tied'
        sectionResult.appendChild(pResult)
        if (char === 'X') {
            removeTurnPlayer1()
            winner = document.getElementById('name-1').value
        } else {
            removeTurnPlayer2()
            winner = document.getElementById('name-2').value
        }
    }
}