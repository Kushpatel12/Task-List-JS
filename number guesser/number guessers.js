/* 
GAME FUNCTION:
  - Player mus guess a number between a min and max
  - Player gets a certain amounnt of guesses 
  - Notify player of guesses remaining
  - Notify the player of the correct answer if loose 
  - Let player choose to play again
*/


// Gmae values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-mum'),
      maxNum = document.querySelector('.max-mum'),
      guessBtn = document.querySelector('#guess-submit'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      messageTwo = document.querySelector('.message-two');
      messagethree = document.querySelector('.message-three');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again eventlistesner
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
    console.log(1);
  }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);


  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');

    // Display none
     setMessg().style.display = none;

   
  }


    // Check if Won
    if (guess === winningNum) {

      // Game over - won
      
      gameOver(true, `${winningNum} is correct, YOU WIN! - Won't to Play Again`, 'green');
      setMessg().style.display = none;
      // setMessage().style.display = none;

      guessInput.style.border = '3px solid lightgreen';

      //  // Disable input 
      //  guessInput.disabled = true;
      //  // Border color green
      //  guessInput.style.border = '3px solid lightgreen';
      //  // Set message
      //  setMessages(`${winningNum} is correct, YOU WIN!`, 'green');

        
        

    
    }else {
       // Wrong Number
       guessesLeft -= 1;

      if (guessesLeft === 0) {

         // Game over - Lost

         gameOver(false, `Game Over, You Lost, Winning Number is ${winningNum}`, 'red');
         // setMessage().style.display = none;
         setMessg().style.display = none;
          
        //  // Disable input 
        //  guessInput.disabled = true;
        //  // Border color green
        //  guessInput.style.border = '3px solid red';
        //  // Set message
        //  setMessages(`Game Over, You Lost`, 'red');

        
         
      
         

      }else {
         // Game continue - answer wrong

         // Change the border color
         guessInput.style.border = '3px solid red';

         // Clear Input
         guessInput.value = '';

         // Tell user its wrong
         setMessg(`${guess} is not correct, ${guessesLeft} guesses Left`, 'red');

         // Display none
         setMessage().style.display = none;
       }

      }
    

})


// Game Over
function gameOver(won, msgs) {
  let colors;

  won === true ? colors = 'green' : colors = 'red';

     // Disable input 
     guessInput.disabled = true;
     // Set text color
     messageTwo.style.color = colors;
     // Set message
     setMessages(msgs);


     // PLAY AGAIN
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



// Set message 
function setMessage(msg,color) {
  message.textContent = msg;
  message.style.color = color;
}


function setMessages(msgs,colors) {
  messageTwo.textContent = msgs;
  messageTwo.style.color = colors;
}

function setMessg(msgss,col) {
  messagethree.textContent = msgss;
  messagethree.style.color = col;
}