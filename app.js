// Card+suit generator
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = suits.map(suit => {
    return cards.map(card => {
        return {
            card,
            suit
        }
    })
}).flat();


const bubbleSort = (arr) => {
    let arrArr = [arr.slice()]
    let wall = arr.length - 1; //we start the wall at the end of the array
    while (wall > 0){
        let index = 0;
        while (index < wall) {
          //compare the adjacent positions, if the right one is bigger, we have to swap
          if (arr[index] > arr[index + 1]) { 
            let aux = arr[index]; 
            arr[index] = arr[index + 1];
            arr[index + 1] = aux;
          }
          arrArr.push(arr.slice());
          index++;
        }
        wall--; //decrease the wall for optimization
    }
	return arrArr;
};

function suiteBuiler(card){
    let suit = card.split(" ")[2];
    let value = card.split(" ")[0];
    
    return `<div class="card-top">${suit}</div>
            <div class="card-value">${value}</div>
            <div class="card-suit">${suit}</div>`;
}

function createCard(hand, cardText=deck[Math.floor(Math.random() * deck.length)].card + " of " + deck[Math.floor(Math.random() * deck.length)].suit){
    let card = document.createElement("div");
    card.classList.add("card","col-2");
    card.innerHTML = suiteBuiler(cardText);
    hand.appendChild(card);
}

function cardValue(card){
    let value = card.innerHTML.split(" ")[0];
    if(value == "A"){
        return 1;
    }else if(value == "J"){
        return 11;
    }else if(value == "Q"){
        return 12;
    }else if(value == "K"){
        return 13;
    }else{
        return parseInt(value);
    }
}
function sort(){
    let hand = document.getElementById("hand");
    let cards = hand.childNodes;
    let handValues = [];
    for(let i = 0; i < cards.length; i++){
        let value = cardValue(cards[i]);
        handValues.push(value);
    }
    let sortSteps = bubbleSort(handValues);
    let log = document.getElementById("logs");
    log.innerHTML = "";
    for(let i = 0; i < sortSteps.length; i++){
        let step = document.createElement("div");
        step.innerHTML = sortSteps[i];
        log.appendChild(step);
    }
    console.log(sortSteps);
}

function draw(){
    let hand = document.getElementById("hand");
    if(hand.childNodes.length > 0){
        hand.innerHTML = "";
    }
    let x = document.getElementById("card-input");
    console.log(x.value)
    for(let i = 0; i < x.value; i++){
        createCard(document.getElementById("hand"));
    }
}
