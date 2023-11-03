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

//Chama função para vereficar vitória a cada key acionada
function checkWin(i, key) {
    const index = key.dataset.value
    const char = board[index - 1].char
    if (i < 5) {
        return
    } else {
        switch (index) {
            case '1':
                testWin(1, 2, 3, char)
                testWin(1, 4, 7, char)
                testWin(1, 5, 9, char)
                break;
            case '2':
                testWin(1, 2, 3, char)
                testWin(2, 5, 8, char)
                break;
            case '3':
                testWin(1, 2, 3, char)
                testWin(3, 6, 9, char)
                testWin(3, 5, 7, char)
                break;
            case '4':
                testWin(1, 4, 7, char)
                testWin(4, 5, 6, char)
                break;
            case '5':
                testWin(4, 5, 6, char)
                testWin(2, 5, 8, char)
                testWin(1, 5, 9, char)
                testWin(3, 5, 7, char)
                break;
            case '6':
                testWin(4, 5 ,6, char)
                testWin(3, 6, 9, char)
                break;
            case '7':
                testWin(7, 8, 9, char)
                testWin(1, 4, 7, char)
                testWin(3, 5, 7, char)
                break;
            case '8':
                testWin(7, 8, 9, char)
                testWin(2, 5, 8, char)
                break;
            case '9':
                testWin(7, 8, 9, char)
                testWin(3, 6, 9, char)
                testWin(1, 5, 9, char)
                break;
        }
        if (i === 9) {
            resultTie(char)
        }
    }
}


//Funções para teste de condição para vitória
function testWin(x, y, z, char){
    if (board[x - 1].char === char && board[y - 1].char === char && board[z - 1].char === char) {
        regionForWin(x, y, z)
        resultWin(char)
    } else return
}

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

//Função para destacar as keys que incidiram na vitória
function regionForWin(x, y, z){
    const keyX = document.getElementById('key' + x)
    const keyY = document.getElementById('key' + y)
    const keyZ = document.getElementById('key' + z)
    keyX.classList = 'keys-win'
    keyY.classList = 'keys-win'
    keyZ.classList = 'keys-win'
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





