let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.getElementsByClassName('square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

const setUpModeButtons = () => {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            //removes classes from easy/hard buttons
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;
            reset();
            //figure out how many squares to show
            //pick new colors
            //pick a new picked color
            //update page to reflect changes
        });
    }
}


const setUpSquares = () => {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            //grab color of clicked square
            var clickedColor = this.dataset.color;
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct!'
                resetButton.textContent = 'Play again?'
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                //Wrong answer changes background
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try again.'
            }
        });
    }
}

const reset = () => {
    //clicking reset gives new colors each time with different results
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change title display to match new picked color
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = '';
    resetButton.textContent = 'New Colors';
    //change colors of squares on the page
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
            squares[i].dataset.color = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = '#584FBD';

}

resetButton.addEventListener('click', function () {
    reset();
});

const changeColors = (color) => {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each square color to match given color
        squares[i].style.backgroundColor = color;
        squares[i].dataset.color = color;
    }
}

const pickColor = () => {
    //picks a random number
    var randomNum = Math.floor(Math.random() * colors.length)
    return colors[randomNum];
}

const generateRandomColors = (num) => {
    //make an array
    var arr = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

const randomColor = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return "hsl(" + h + ', ' + s + '%' + ', ' + l + '%' + ")";
}

const init = () => {
    //mode buttons event listeners
    // loops through all buttons incase we want to add more in the future
    setUpModeButtons();
    setUpSquares();
    reset();
}
init();