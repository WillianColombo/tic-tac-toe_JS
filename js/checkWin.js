import { board } from "./logicBoard.js"
import { regionForWin, resultTie, resultWin } from "./result.js"

//Chama função para vereficar vitória a cada key acionada
export default function checkWin(i, key) {
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