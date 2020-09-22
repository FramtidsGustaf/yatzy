class PlayerObject {
  constructor(number) {
    this.number = number;
  }
  //a method that counts sum, bonus and total
  playerSumBonusAndTotal() {
    let outputSum = document.getElementById(`sum-player-${this.number}`);
    let playerBonus = document.getElementById(`player-${this.number}-bonus`);
    let playerArray = Array.from(
      document.getElementsByClassName(`player-${this.number}`) //converts htmlcollection to array
    );
    let playerSecondArray = playerArray.map((element) => {
      return Number(element.value); //creates an array with the values as numbers from the cells
    });
    let sum = playerSecondArray.reduce((acc, currValue) => {
      return acc + currValue; //calculates the sum of the cells
    }, 0);

    if (sum <= 0) {
      outputSum.innerHTML = ""; //so it does not display zeros in sum
    } else {
      outputSum.innerHTML = sum;
    }
    if (sum >= 63) {
      playerBonus.innerHTML = 50; //so it does not display zeros in bonus
    } else {
      playerBonus.innerHTML = "";
    }

    //the rest of the code in the method is basically a copy from the code above
    //but it calculates the total of the player
    let playerArrayPostBonus = Array.from(
      document.getElementsByClassName(`player-${this.number}-post-bonus`)
    );
    let playerSecondArrayPostBonus = playerArrayPostBonus.map((element) => {
      return Number(element.value);
    });
    let total = playerSecondArrayPostBonus.reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);
    total += Number(outputSum.textContent) + Number(playerBonus.textContent);
    let playerTotal = document.getElementById(`total-player-${this.number}`);

    if (total <= 0) {
      playerTotal.textContent = "";
    } else {
      playerTotal.textContent = total;
    }
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  let start = document.getElementById("start-button");
  let wholeForm = document.getElementById("whole-form");
  disableCells();

  start.addEventListener("click", function (e) {
    createPlayers(amountOfPlayers()); //creating an object for each player

    wholeForm.addEventListener("change", function (e) {
      outPutCalcSum(amountOfPlayers().length);
    });
  });


  //Counter for how many throws the player has left

  let throwButton = document.getElementById("throw-dice");

  throwButton.addEventListener("click", counter(0));
  
  let randomDice; 
  let diceArray = []

  //Funktion som kanstar tärning och returnerar des värde
  function throwDices(i) {
    
    randomDice = Math.floor(Math.random() * (7 - 1) + 1);
    //hämtar bilder på tärningskast med hjälp av randomDice
    document.querySelectorAll(".diceArray")[i].setAttribute("src", "dices/dice" + randomDice + ".webp");
    return randomDice
  }         


  //Skapar eventlyssnare som kollar knapptryck för kast
  document.getElementById("throw-dice").addEventListener("click", function (e) {
    //Skapar variabel som har checkbox som referens
    let checkBox = document.getElementsByClassName("checkBox");
    //Loopar igenom varje box och kollar true or false, vid false kastas en ny tärning och sätts in i diceArray.
    for (let i = 0; i < 5; ++i) {
      if (!checkBox[i].checked) {
        throwDices(i);
      }
      diceArray[i] = randomDice
    }
    amountOfPlayers();
      
        
    isFullHous(diceArray);
  });

  let isFullHous = (myArray) => {
    let countValues = [0, 0, 0, 0, 0, 0, 0];
    let twoPairs = [];
    
    for (currentNumber of myArray) {
      countValues[currentNumber]++;  
    }

    if(countValues.includes(5)){
      console.log("Yatzy!") 
      let sum = 50
      console.log(sum)
    } 

    else if(countValues[2]>=1 && countValues[3]>=1 && countValues[4]>=1 &&countValues[5]>=1 &&countValues[6]>=1){
      console.log("Stor Stege!")
      let sum = 20;
      console.log(sum)

    }

    else if(countValues[1]>=1 && countValues[2]>=1 && countValues[3]>=1 &&countValues[4]>=1 &&countValues[5]>=1){
      console.log("Liten Stege!")
      let sum = 15; 
      console.log(sum)

    }
    
    else if(countValues.includes(2) && countValues.includes(3) ){
      console.log("KÅK!")
      let sum = (countValues.indexOf(3)*3)+(countValues.indexOf(2)*2)  
      console.log(sum)
    }
  
    else if(countValues.includes(4)){
      console.log("Fyrtal!") 
      let sum = (countValues.indexOf(4)*4)
      console.log(sum)
    } 

    else if(countValues.includes(3)){
      console.log("Triss!") 
      let sum = (countValues.indexOf(3)*3)
      console.log(sum)
    } 

    else if(countValues.includes(2)){
      console.log("Par!") 
      let sum = (countValues.indexOf(2)*2)
      console.log(sum)
      //for(let i = 1; i < countValues.length; ++i){
      //  if(countValues[i] == 2){
        //  twoPairs.push(countValues[i])
        //}
      //}
      twoPairs = countValues.filter(element => element == 2 )
      if(twoPairs.length > 1){
        console.log("två par!")
      }
    }    
  };

});



//Counter of how many throws are left for the current player
function counter(count) {
  let i = 0;
  count = 0; 
  let button = document.getElementById("throw-dice");
  let playerName = document.querySelectorAll(".playerName")

  button.addEventListener("click", function(e){   
    playerName[i].style.backgroundColor = "orange"
    count += 1;
    button.innerHTML = 3 - count + " kast kvar";
    if (count === 3) {
      button.innerHTML = "Nästa spelare: kasta tärningarna (3 kast kvar)";
      count = 0;
      i++
      playerName[i-1].style.backgroundColor = "rgb(209, 205, 205)"
      if(i>3){
        i = 0
      }
    }
  }) 
}
// A function to controll the amount of players and where in the form they're located
function amountOfPlayers() {
  let players = document.getElementsByClassName("playerName");
  let playersArray = Array.from(players);
  let playersArrayStrings = playersArray.map((element) => {
    return String(element.value);
  });
  let outputArray = [];
  for (let i = 0; i < playersArrayStrings.length; i++) {
    if (playersArrayStrings[i] != "") {
      outputArray.push(i);
    }
  }
  return outputArray;
}
// a function that creates the needed amount of player objects
function createPlayers(inputArray) {
  let amount = inputArray.length;

  switch (amount) {
    case 1:
      playerOne = new PlayerObject(inputArray[0]);
      enableCells(inputArray);
      break;
    case 2:
      playerOne = new PlayerObject(inputArray[0]);
      playerTwo = new PlayerObject(inputArray[1]);
      enableCells(inputArray);
      break;
    case 3:
      playerOne = new PlayerObject(inputArray[0]);
      playerTwo = new PlayerObject(inputArray[1]);
      playerThree = new PlayerObject(inputArray[2]);
      enableCells(inputArray);
      break;
    case 4:
      playerOne = new PlayerObject(inputArray[0]);
      playerTwo = new PlayerObject(inputArray[1]);
      playerThree = new PlayerObject(inputArray[2]);
      playerFour = new PlayerObject(inputArray[3]);
      enableCells(inputArray);
      break;
  }
}

function disableCells() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      let temp = document.getElementsByClassName(`player-${i}`);
      temp[j].disabled = true;
    }
    for (let k = 0; k < 9; k++) {
      let temp = document.getElementsByClassName(`player-${i}-post-bonus`);
      temp[k].disabled = true;
    }
  }
}

function enableCells(inputArray) {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < 6; j++) {
      let temp = document.getElementsByClassName(`player-${inputArray[i]}`);
      temp[j].disabled = false;
    }
    for (let k = 0; k < 9; k++) {
      let temp = document.getElementsByClassName(`player-${inputArray[i]}-post-bonus`);
      temp[k].disabled = false;
    }
  }
}

function outPutCalcSum(players) {
  switch (players) {
    case 1:
      playerOne.playerSumBonusAndTotal();
      break;
    case 2:
      playerOne.playerSumBonusAndTotal();
      playerTwo.playerSumBonusAndTotal();
      break;
    case 3:
      playerOne.playerSumBonusAndTotal();
      playerTwo.playerSumBonusAndTotal();
      playerThree.playerSumBonusAndTotal();
      break;
    case 4:
      playerOne.playerSumBonusAndTotal();
      playerTwo.playerSumBonusAndTotal();
      playerThree.playerSumBonusAndTotal();
      playerFour.playerSumBonusAndTotal();
      break;
    default:
      break;
  }
}


//Chatinput
document.querySelector("#chat-btn").addEventListener("click", function(e){
  let chatbox = document.querySelector(".text-mock")
  let nameInputSpan = document.createElement("span")
  let chatSpan = document.createElement("span")

  let chatInput = document.getElementById("chat_input");
  let chatInputName = document.getElementById("chat_name_input")

  nameInputSpan.innerHTML ="<br>" + chatInputName.value + ": "
  chatSpan.innerHTML = chatInput.value 
  nameInputSpan.setAttribute("class", "user")

  chatbox.appendChild(nameInputSpan)
  chatbox.appendChild(chatSpan)

})
