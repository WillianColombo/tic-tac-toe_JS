//Inicia e controla os turnos

import { createTurnPlayer1, createTurnPlayer2 } from "./controlTurns.js";

export let turn = true;
export function setTurn(value){
    turn = value
}

export function initTurn() {
    const random = Math.floor(Math.random() * (100))
    if (random >= 50) {
        turn = true
        createTurnPlayer1()
    } else {
        turn = false
        createTurnPlayer2()
    }
}

//Função para habilitar o tabuleiro
export function enabledBoard() {
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.disabled = false
    })
}
