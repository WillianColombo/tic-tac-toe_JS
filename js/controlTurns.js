//Funções que controlam os turnos na tela

import { setTurn, turn } from "./initGame.js"

export const divPlayer1 = document.getElementById('div-player-1')
export const divPlayer2 = document.getElementById('div-player-2')
const p = document.createElement('p')
p.innerText = 'É a sua vez'

export function createTurnPlayer1() {
    const charX = document.createElement('span')
    charX.innerText = 'X'

    divPlayer1.classList = 'turns'
    divPlayer1.append(p, charX)
}

export function createTurnPlayer2() {
    const charO = document.createElement('span')
    charO.innerText = 'O'

    divPlayer2.classList = 'turns'
    divPlayer2.append(p, charO)
}

export function removeTurnPlayer1() {
    const p1 = document.querySelector('p')
    const span1 = document.querySelector('span')
    p1.remove()
    span1.remove()
    divPlayer1.classList = ''
}

export function removeTurnPlayer2() {
    const p2 = document.querySelector('p')
    const span2 = document.querySelector('span')
    p2.remove()
    span2.remove()
    divPlayer2.classList = ''
}

export function getTurn() {
    if (turn === true) {
        setTurn(!turn)
        removeTurnPlayer1()
        createTurnPlayer2()
    } else {
        setTurn(!turn)
        removeTurnPlayer2()
        createTurnPlayer1()
    }
}