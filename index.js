let board = [{ key: 1, char: 'y' }, { key: 2, char: 'y' }, { key: 3, char: 'y' },
{ key: 4, char: 'y' }, { key: 5, char: 'y' }, { key: 6, char: 'y' },
{ key: 7, char: 'y' }, { key: 8, char: 'y' }, { key: 9, char: 'y' }]

let i = 1

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

//Função para habilitar o tabuleiro
function enabledBoard() {
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.disabled = false
    })
}

//Evento click das keys
document.querySelectorAll('.keys').forEach(function (key) {
    key.addEventListener('click', function (ev) {
        key.disabled = true
        addChar(turn, ev.currentTarget)
        checkWin(i, key)
        i++
        if (i <= 9 && win === false) {
            getTurn()
        }
    })
})

//-------------------------------------------------------------
//Geração e controle dos turnos

let turn = true;

function initTurn() {
    const random = Math.floor(Math.random() * (100))
    if (random >= 50) {
        turn = true
        createTurnPlayer1()
    } else {
        turn = false
        createTurnPlayer2()
    }
}

function getTurn() {
    if (turn === true) {
        turn = !turn
        removeTurnPlayer1()
        createTurnPlayer2()
    } else {
        turn = !turn
        removeTurnPlayer2()
        createTurnPlayer1()
    }
}
//------------------------------------------------------------

//------------------------------------------------------------
//Funções que controlam os turnos na tela
const divPlayer1 = document.getElementById('div-player-1')
const divPlayer2 = document.getElementById('div-player-2')
const p = document.createElement('p')
p.innerText = 'É a sua vez'

function createTurnPlayer1() {
    const charX = document.createElement('span')
    charX.innerText = 'X'

    divPlayer1.classList = 'turns'
    divPlayer1.append(p, charX)
}

function createTurnPlayer2() {
    const charO = document.createElement('span')
    charO.innerText = 'O'

    divPlayer2.classList = 'turns'
    divPlayer2.append(p, charO)
}

function removeTurnPlayer1() {
    const p1 = document.querySelector('p')
    const span1 = document.querySelector('span')
    p1.remove()
    span1.remove()
    divPlayer1.classList = ''
}

function removeTurnPlayer2() {
    const p2 = document.querySelector('p')
    const span2 = document.querySelector('span')
    p2.remove()
    span2.remove()
    divPlayer2.classList = ''
}
//------------------------------------------------------------

//Função para reiniciar o tabuleir
function restart() {
    enabledBoard()
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.innerText = ''
    })

    board.forEach(function (element) {
        element.char = 'y'
    })

    if (divPlayer1.children.length > 0) {
        removeTurnPlayer1()
    } else if(divPlayer2.children.length > 0){
        removeTurnPlayer2()
    }

    if (document.getElementById('result').children.length > 0) {
        const p = document.getElementById('text-result')
        p.remove()
    }

    i = 1
    win = false
    sectionResult.classList = ''

    initTurn()
}

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

//Verifica condição para vitória 
function checkWin(i, key) {
    const index = key.dataset.value
    const char = board[index - 1].char
    if (i < 5) {
        return
    } else {
        switch (index) {
            case '1':
                test_1_2_3(char)
                test_1_4_7(char)
                test_1_5_9(char)
                break;
            case '2':
                test_1_2_3(char)
                test_2_5_8(char)
                break;
            case '3':
                test_1_2_3(char)
                test_3_6_9(char)
                test_3_5_7(char)
                break;
            case '4':
                test_1_4_7(char)
                test_4_5_6(char)
                break;
            case '5':
                test_4_5_6(char)
                test_2_5_8(char)
                test_1_5_9(char)
                test_3_5_7(char)
                break;
            case '6':
                test_4_5_6(char)
                test_3_6_9(char)
                break;
            case '7':
                test_7_8_9(char)
                test_1_4_7(char)
                test_3_5_7(char)
                break;
            case '8':
                test_7_8_9(char)
                test_2_5_8(char)
                break;
            case '9':
                test_7_8_9(char)
                test_3_6_9(char)
                test_1_5_9(char)
                break;
        }
        if (i === 9) {
            resultTie(char)
        }
    }
}

//---------------------------------------------------------
//Funções para teste de condição para vitória
function test_1_2_3(char) {
    if (board[0].char === char && board[1].char === char && board[2].char === char) {
        resultWin(char)
    } else return
}
function test_4_5_6(char) {
    if (board[3].char === char && board[4].char === char && board[5].char === char) {
        resultWin(char)
    } else return
}
function test_7_8_9(char) {
    if (board[6].char === char && board[7].char === char && board[8].char === char) {
        resultWin(char)
    } else return
}
function test_1_4_7(char) {
    if (board[0].char === char && board[3].char === char && board[6].char === char) {
        resultWin(char)
    } else return
}
function test_2_5_8(char) {
    if (board[1].char === char && board[4].char === char && board[7].char === char) {
        resultWin(char)
    } else return
}
function test_3_6_9(char) {
    if (board[2].char === char && board[5].char === char && board[8].char === char) {
        resultWin(char)
    } else return
}
function test_1_5_9(char) {
    if (board[0].char === char && board[4].char === char && board[8].char === char) {
        resultWin(char)
    } else return
}
function test_3_5_7(char) {
    if (board[2].char === char && board[4].char === char && board[6].char === char) {
        resultWin(char)
    } else return
}
//--------------------------------------------------------------


//Função vitória
let win = false
const sectionResult = document.getElementById('result')
const pResult = document.createElement('p')
pResult.id = 'text-result'
function resultWin(char) {
    document.querySelectorAll('.keys').forEach(function (buttons) {
        buttons.disabled = true
    })

    let winner = ''

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

//Função empate
function resultTie(char) {
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




