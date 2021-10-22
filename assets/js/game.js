/*
    C = clubs (Trebol)
    D = Diamonds ( Diamantes)
    H = Hearts (Corazones)
    S = Swords (Espadas)
*/

let deck = [];
const specials = ['A','J','Q','K'];
const tipes = ['C','D','H','S'];
let playerPoints = 0,
    computerPoints = 0;
const btnNew = document.querySelector('#bnt-new');
const btnRequest = document.querySelector('#bnt-request');
const btnStop = document.querySelector('#bnt-stop');
const points = document.querySelectorAll('small');
const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');


const createDeck= () =>{
    for (let i =2;i<=10;i++) {
        for (let tipe of tipes) {
            deck.push(i+tipe);
        }
    }
    for (let special of specials){
        for (let tipe of tipes){
            deck.push(special+tipe);
        }
    }
    deck = _.shuffle(deck) // Para que salgan aleatorios, recordar que tuve que importar una libreria ya que JS no la trae por defecto.
    // console.log(deck)
    return deck;
}
createDeck()
const askForCard = () => {
    if (deck.length === 0) {
        throw 'The deck is already empty';
    }
    const card = deck.pop();
    // console.log(card)
    return card;
}
const cardValue = (card) => {
    const value = card.substring(0,card.length-1);
    return (isNaN(value))?
        (value === 'A')? 11 : 10
        :
        value*1;
}
// const valor = cardValue(askForCard())
// console.log(valor)

const computerTurn = (minPoints) => {
    do {
        const card = askForCard();
        computerPoints = computerPoints + cardValue(card);
        points[1].innerText=computerPoints;
        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/cartas/${card}.png`;
        imgCard.classList.add('cards');
        divComputerCards.append(imgCard);
        if (minPoints > 21){
            break;
        }
    }while ((computerPoints <= minPoints)&&(minPoints<=21));

    setTimeout(() => {
        if (computerPoints === minPoints){
            alert('No body won');
        }else if (minPoints > 21) {
            alert('The computer won!')
        }else if(computerPoints > 21){
            alert('Congratulations you won');
        }else {
            alert('The computer won!');
        }
    }, 400);
}
btnRequest.addEventListener('click',()=> {
    const card = askForCard();
    playerPoints = playerPoints + cardValue(card);
    points[0].innerText = playerPoints;
    console.log(playerPoints);
    const imgCard = document.createElement('img'); /*Con esto creo las CARTAS */
    imgCard.src = `./assets/cartas/cartas/${card}.png`;
    imgCard.classList.add('cards');
    divPlayerCards.append(imgCard);
    if (playerPoints>21) {
        console.warn('Sorry, you´ve lost');
        btnRequest.disabled= true;
        btnStop.disabled=true;
        computerTurn(playerPoints);
    } else if (playerPoints === 21) {
        console.warn('Congratulations, you won');
        btnRequest.disabled=true;
        btnStop.disabled=true;
        computerTurn(playerPoints);
    }
});
btnStop.addEventListener('click',()=>{
    btnStop.disabled=true;
    btnRequest.disabled=true;
    computerTurn(playerPoints);
});
btnNew.addEventListener('click',()=>{
    console.clear();
    deck=[];
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;
    points[0].innerText = 0;
    points[1].innerText = 0;
    divComputerCards.innerText = '';
    divPlayerCards.innerText = '';
    btnRequest.disabled = false;
    btnStop.disabled = false;
});