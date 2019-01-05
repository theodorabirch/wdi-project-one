// the first step is to display the cards each with a different value
//- therefore going to use an array of objects and store this in the cardsArray variable.

const cardsArray = [{
  'name': 'seahorse',
  'img': 'images/seahorse.svg'
},
{
  'name': 'octopus',
  'img': 'images/kraken.svg'
},
{
  'name': 'lobster',
  'img': 'images/lobster.svg'
},
{
  'name': 'jellyfish',
  'img': 'images/jellyfish.svg'
},
{
  'name': 'whale',
  'img': 'images/whale.svg'
},
{
  'name': 'dolphin',
  'img': 'images/dolphin.svg'
},
{
  'name': 'shark',
  'img': 'images/shark.svg'
},
{
  'name': 'crab',
  'img': 'images/crab.svg'
},
{
  'name': 'shell',
  'img': 'images/shell.svg'
},
{
  'name': 'starfish',
  'img': 'images/starfish.svg'
},
{
  'name': 'prawn',
  'img': 'images/prawn.svg'
},
{
  'name': 'seaUrchin',
  'img': 'images/sea-urchin.svg'
}
];


//Shuffle of the board

// need to duplicate the array so I can create a match for each card
const gameGrid = cardsArray.concat(cardsArray);
//need to randomise the array
const shuffledArray = gameGrid.sort(() => 0.5 - Math.random());

const playerOne = { id: 1, name: 'Player 1', score: 0, scoreDisplay: document.getElementById('score1') };
const playerTwo = { id: 2, name: 'Player 2', score: 0, scoreDisplay: document.getElementById('score2') };

// define the global variables that are used.
let firstChoice = '';
let secondChoice = '';
let cardsChosenCount = 0;
let previousChoice = null;
// const delay = 1200;
let currentPlayer = playerOne;


// Create the grid
const game = document.getElementById('game');
// will create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// now need to append the grid section to the game div
game.appendChild(grid);

const audioButton = document.querySelector('.music');
const audio = document.querySelector('audio');

audioButton.addEventListener('click', () => {
  audio.play();
});


// Now I need to get the images to display on the front of the cards. I will loop through each item and create a new card div for each object

shuffledArray.forEach(item => {
// create a div
  const card = document.createElement('div');
  // apply a card class to that div
  card.classList.add('card');
  // set the data-name attribute of the div to the cardsArray getElementsByClassName
  card.dataset.name = item.name;
  // create the front and the back image for the cards
  const front = document.createElement('div');
  front.classList.add('front');
  card.style.frontImage = document.getElementById('front-image');
  // create a variable for the back
  const back = document.createElement('div');
  back.classList.add('back');
  // apply the background image of the div to the cardsArray image
  front.style.backgroundImage = `url(${item.img})`;
  // append the div to the grid section
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});
// this adds the class of selected and match to the cards.
const addMatchClassToSelected = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};
// this section resets the guess between the two players.
const resetGuesses = () => {
  firstChoice = '';
  secondChoice = '';
  cardsChosenCount = 0;
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};
// add an eventlistener to the entire grid
const domCard = document.querySelectorAll('.back');

// here I add an event listener to the whole board and this on a click invokes the function for a match
domCard.forEach(card => card.addEventListener('click', lookForAMatch));
let firstDomElement;

// this function Looks for a match.
function lookForAMatch(event) {
  console.log('Looking for a match');
  const clicked = event.target;
  clicked.style.zIndex = -1;
  if (clicked.nodeName === 'section' || clicked === previousChoice || clicked.parentNode.classList.contains('selected')) {
    console.log('Clicked somewhere invalid!');
    return;
  }
  if (cardsChosenCount <= 2) {
    cardsChosenCount++;
    if (cardsChosenCount === 1) {
      firstDomElement = event.target;
      firstChoice = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
      console.log('first card selected', firstChoice);
    } else {
      secondChoice = clicked.parentNode.dataset.name;
      console.log('second choice is working' , secondChoice);
      clicked.parentNode.classList.add('selected');
    }

    if (firstChoice !== '' && secondChoice !== '') {
      if(firstChoice === secondChoice) {
        currentPlayer.score++;
        console.log(currentPlayer);

        firstDomElement.removeEventListener('click', lookForAMatch);
        console.log('MATCH!', currentPlayer);
        currentPlayer.scoreDisplay.innerHTML = currentPlayer.score;
        setTimeout(addMatchClassToSelected, 2000);
        resetGuesses();
        winningLogic();


      } else {

        console.log('No match!');
        flipChoicesBackOver(firstDomElement, clicked);
        resetGuesses();
        if (currentPlayer.id === 1) {
          currentPlayer = playerTwo;
          console.log('this current player is ->', currentPlayer);

        } else {

          currentPlayer = playerOne;

        }
      }
    }
    previousChoice = clicked;

  }
}


// this means that when there is not a match the cards flip back over.
function flipChoicesBackOver(firstChoiceDiv, secondChoiceDiv) {
  setTimeout(() => {
    firstChoiceDiv.style.zIndex = 0;
    secondChoiceDiv.style.zIndex = 0;
  }, 1000);
}
// the winning logic 
function winningLogic() {
  if (currentPlayer.score >= 7){
    return window.alert(`${currentPlayer.name} you da boss, you won!`);
  } else if (playerOne.score === 6 && playerTwo.score === 6) {
    return window.alert('It is a draw');
  }
}


















//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // the first step is to display the cards each with a different value - therefore going to use an array of objects and store this in the cardsArray variable.
//
// const cardsArray = [{
//   'name': 'seahorse',
//   'img': 'images/seahorse.svg'
// },
// {
//   'name': 'octopus',
//   'img': 'images/kraken.svg'
// },
// {
//   'name': 'lobster',
//   'img': 'images/lobster.svg'
// },
// {
//   'name': 'jellyfish',
//   'img': 'images/jellyfish.svg'
// },
// {
//   'name': 'whale',
//   'img': 'images/whale.svg'
// },
// {
//   'name': 'dolphin',
//   'img': 'images/dolphin.svg'
// },
// {
//   'name': 'shark',
//   'img': 'images/shark.svg'
// },
// {
//   'name': 'crab',
//   'img': 'images/crab.svg'
// },
// {
//   'name': 'shell',
//   'img': 'images/shell.svg'
// },
// {
//   'name': 'starfish',
//   'img': 'images/starfish.svg'
// },
// {
//   'name': 'prawn',
//   'img': 'images/prawn.svg'
// },
// {
//   'name': 'seaUrchin',
//   'img': 'images/sea-urchin.svg'
// }
// ];
//
//
// //Shuffle of the board
//
// // need to duplicate the array so I can create a match for each card
// const gameGrid = cardsArray.concat(cardsArray);
// //need to randomise the array
// const shuffledArray = gameGrid; //.sort(() => 0.5 - Math.random());
//
// const playerOne = { id: 1, name: 'Player 1', score: 0, scoreDisplay: document.getElementById('score1') };
// const playerTwo = { id: 2, name: 'Player 2', score: 0, scoreDisplay: document.getElementById('score2') };
//
// // define the global variables that are used.
// let firstChoice = '';
// let secondChoice = '';
// let cardsChosenCount = 0;
// let previousChoice = null;
// // const delay = 1200;
// let currentPlayer = playerOne;
// const welcomePageButton = document.querySelector('.welcome-button');
// const welcomePage = document.querySelector('.welcome-page');
// const octopus = document.querySelector('octopus-container')
//
// // Now I need to grab the id of the div in html
//
// // Create the grid
// const game = document.getElementById('game');
// // will create a section with a class of grid
// const grid = document.createElement('section');
// grid.setAttribute('class', 'grid');
// // now need to append the grid section to the game div
// game.appendChild(grid);
// //
// // event listener for the button on welcome page
// function proceedToGame () {
//   const mainPage = document.querySelector('.main-page');
//   mainPage.style.zIndex = 2;
//   welcomePage.style.zIndex = -1;
// }
//
// welcomePageButton.addEventListener('click', proceedToGame);
// // Now I need to get the images to display on the front of the cards. I will loop through each item and create a new card div for each object
//
// shuffledArray.forEach(item => {
// // create a div
//   const card = document.createElement('div');
//   // apply a card class to that div
//   card.classList.add('card');
//   // set the data-name attribute of the div to the cardsArray getElementsByClassName
//   card.dataset.name = item.name;
//   // create the front and the back image for the cards
//   const front = document.createElement('div');
//   front.classList.add('front');
//   card.style.frontImage = document.getElementById('front-image');
//   // create a variable for the back
//   const back = document.createElement('div');
//   back.classList.add('back');
//   // apply the background image of the div to the cardsArray image
//   front.style.backgroundImage = `url(${item.img})`;
//   // append the div to the grid section
//   grid.appendChild(card);
//   card.appendChild(front);
//   card.appendChild(back);
// });
//
// const addMatchClassToSelected = () => {
//   const selected = document.querySelectorAll('.selected');
//   selected.forEach(card => {
//     card.classList.add('match');
//   });
// };
//
// const resetGuesses = () => {
//   firstChoice = '';
//   secondChoice = '';
//   cardsChosenCount = 0;
//   const selected = document.querySelectorAll('.selected');
//   selected.forEach(card => {
//     card.classList.remove('selected');
//   });
// };
// // add an eventlistener to the entire grid
// const domCard = document.querySelectorAll('.back');
//
//
// domCard.forEach(card => card.addEventListener('click', lookForAMatch));
// let firstDomElement;
//
// function lookForAMatch(event) {
//   console.log('Looking for a match');
//   const clicked = event.target;
//   clicked.style.zIndex = -1;
//   if (clicked.nodeName === 'section' || clicked === previousChoice || clicked.parentNode.classList.contains('selected')) {
//     console.log('Clicked somewhere invalid!');
//     return;
//   }
//   if (cardsChosenCount <= 2) {
//     cardsChosenCount++;
//     if (cardsChosenCount === 1) {
//       firstDomElement = event.target;
//       firstChoice = clicked.parentNode.dataset.name;
//       clicked.parentNode.classList.add('selected');
//       console.log('first card selected', firstChoice);
//     } else {
//       secondChoice = clicked.parentNode.dataset.name;
//       console.log('second choice is working' , secondChoice);
//       clicked.parentNode.classList.add('selected');
//     }
//
//     if (firstChoice !== '' && secondChoice !== '') {
//       if(firstChoice === secondChoice) {
//         currentPlayer.score++;
//         console.log(currentPlayer);
//
//         firstDomElement.removeEventListener('click', lookForAMatch);
//         console.log('MATCH!', currentPlayer);
//         currentPlayer.scoreDisplay.innerHTML = currentPlayer.score;
//         setTimeout(addMatchClassToSelected, 2000);
//         resetGuesses();
//         winningLogic();
//
//
//       } else {
//
//         console.log('No match!');
//         flipChoicesBackOver(firstDomElement, clicked);
//         resetGuesses();
//         if (currentPlayer.id === 1) {
//           currentPlayer = playerTwo;
//           console.log('this current player is ->', currentPlayer);
//
//         } else {
//
//           currentPlayer = playerOne;
//
//         }
//       }
//     }
//     previousChoice = clicked;
//
//   }
// }
//
//
//
// function flipChoicesBackOver(firstChoiceDiv, secondChoiceDiv) {
//   setTimeout(() => {
//     firstChoiceDiv.style.zIndex = 0;
//     secondChoiceDiv.style.zIndex = 0;
//   }, 1000);
// }
//
// function winningLogic() {
//   if (currentPlayer.score >= 7){
//     return window.alert(`${currentPlayer.name} you da boss, you won!`);
//   } else if (playerOne.score === 6 && playerTwo.score === 6) {
//     return window.alert('It is a draw');
//   }
// }
//
//
//
//
