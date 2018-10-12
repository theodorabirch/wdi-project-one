const squares = document.querySelectorAll('div');
let div;
function flipSquare(event){
  console.log('I was clicked');
  const backImage = event.target;
  const faceImage = backImage.parentElement.children[0];
  setTimeout(() => {
    backImage.style.zIndex = -1;
    faceImage.style.zIndex = 1;
  }, 600);
  //console.log(this); the element that fired the event.
  this.classList.toggle('flip');

}

squares.forEach(square => square.addEventListener('click', flipSquare));
