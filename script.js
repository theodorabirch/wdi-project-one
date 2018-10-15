// the first step is to display the cards each with a different value - therefore going to use an array of objects and store this in the cardsArray variable.

const cardsArray = [{
  'name': 'crab',
  'img': 'images/crab.png'
},
{
  'name': 'seahorse',
  'img': 'images/seahorse.png'
},
{
  'name': 'fish',
  'img': 'images/fish.png'
},
{
  'name': 'lobster',
  'img': 'images/lobster.png'
},
{
  'name': 'crayfish',
  'img': 'images/crayfish.png'
},
{
  'name': 'whale',
  'img': 'images/whale.png'
},
{
  'name': 'dolphin',
  'img': 'images/dolphin.png'
},
{
  'name': 'shark',
  'img': 'images/shark.png'
},
{
  'name': 'cod',
  'img': 'images/cod.png'
},
{
  'name': 'shell',
  'img': 'images/shell.png'
},
{
  'name': 'black and white fish',
  'img': 'images/Black and white fish.png'
},
{
  'name': 'prawn',
  'img': 'images/prawn.png'
}
];


//Shuffle of the board

// need to duplicate the array so I can create a match for each card
const gameGrid = cardsArray.concat(cardsArray);
//need to randomise the array
const shuffledArray = gameGrid; //.sort(() => 0.5 - Math.random());

const playerOne = { id: 1, name: 'Player 1', score: 0 };
const playerTwo = { id: 2, name: 'Player 2', score: 0 };

// define the global variables that are used.
let firstChoice = '';
let secondChoice = '';
let count = 0;
let previousChoice = null;
const delay = 1200;
let currentPlayer = playerOne;

// Now I need to grab the id of the div in html

// Create the grid
const game = document.getElementById('game');
// will create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// now need to append the grid section to the game div
game.appendChild(grid);
// console.log(game);

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
  // console.log('this is the image', item.img);
  // card.style.backgroundImage = `url`
  // append the div to the grid section
  // console.log(back);
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    // console.log('Adding match to', card);
    card.classList.add('match');
    // event.target.removeEventListener('click', lookForAMatch);
  });
};

const resetGuesses = () => {
  firstChoice = '';
  secondChoice = '';
  count = 0;

  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};
// add an eventlistener to the entire grid
const domCard = document.querySelectorAll('.back');

// grid.addEventListener('click', lookForAMatch);

domCard.forEach(card => card.addEventListener('click', lookForAMatch));
let firstDomElement;

function lookForAMatch(event) {
  const clicked = event.target;
  clicked.style.zIndex = -1;
  // console.log('is this working', clicked); // this is working.
  if (clicked.nodeName === 'section' || clicked === previousChoice || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstDomElement = event.target;
      firstChoice = clicked.parentNode.dataset.name;
      // console.log('is first choice working', firstChoice);
      clicked.parentNode.classList.add('selected');
    } else {
      secondChoice = clicked.parentNode.dataset.name;
      // console.log('second choice is working' , secondChoice);
      clicked.parentNode.classList.add('selected');
    }
    if (firstChoice !== '' && secondChoice !== '') {
      if(firstChoice === secondChoice) {
        currentPlayer.score++;
        // console.log('===>', event.target);
        firstDomElement.removeEventListener('click', lookForAMatch);
        // console.log('--->', firstDomElement);
        // console.log('MATCH!');
        setTimeout(match, delay);
        // setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
        if (currentPlayer.id === 1) {
          currentPlayer = playerTwo;
          // console.log(currentPlayer);
        }
      }
    }
    previousChoice = clicked;

  }
}
