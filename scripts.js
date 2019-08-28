const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; // para limitar la seleccion a 2
let fistCard, secondCard;
let intentos = 10;
let canttotal = 0;

function flipCard() {
    if (lockBoard) return;
    //if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //primer click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //segundo click
    secondCard = this;
    checkearMatch();
}

function checkearMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? desactivarCartas() : darVuelta();
}

function desactivarCartas() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    canttotal++;
    if (canttotal === 8) {
        alert("Has ganado!");
    }
    resetBoard()
}

function darVuelta() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard = null;
        secondCard = null;
        resetBoard()
        if (intentos > 1) {
            intentos--;
            console.log("Quedan " + intentos +" intentos.");
            if(intentos <= 3){
                alert("Quedan " + intentos +" intentos.");
            }
        }
        else {
            alert("Has perdido");
            location.reload();
        }
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [fistCard, secondCard] = [null, null];
}

(function sortear() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 11);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));