// Variables
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const capitals = ['Berlin', 'London', 'Paris', 'Rome', 'Ottawa'];
const teams = ['Montreal Canadiens', 'Toronto BlueJays', 'Boston Red-Sox', 'Los Angeles Dodgers', 'New York Yankees'];
const movies = ['Titanic', 'Avatar', 'Rocky', 'Shreik', 'Mission Impossible'];
const options = ['Select Category', 'Sports Team', 'World Capitals', 'Movies'];

const letters_container = document.querySelector('.letters-container');
const category_section = document.getElementById('categories');
const game_status = document.querySelector('.game-status-container')
const word_guessed = document.querySelector('.word-container')
const select = document.createElement('select')
const spin_button = document.getElementById('spin_button')
const livesDisplay = document.querySelector('#current-lives')
const scoreDisplay = document.querySelector('#current-score')
const textbox = document.getElementById('textbox');
const replay_button = document.querySelector('#replay_button')

let word;
let lives = 5;
let score = 0;
let letters_found = 0;

var values = ['100', '200', '300', '400', '500', ' 1000', 'Lose your turn', 'Bankrupt'];
var updatedText = "";

// Top Section
// Function to create the category drop-down box
function create_Category_Display() {
  // Select
  select.setAttribute('onchange', 'changeFunc()')
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = options[i]; // Set value attribute if needed
    select.appendChild(option); // Append option to select element
  }

  select.name = "categories"
  select.id = "category"

  category_section.appendChild(select)
}

// Function to get the selection chosen by the user
function changeFunc() {
  var selectBox = document.getElementById("category").value;
  enableSpinButton()
  getWord(selectBox)
}

// Function to retrieve a random word from the specifics array from selected choice
function getWord(selectBox) {
  switch(selectBox) {
    case 'Sports Team':
      word = teams[Math.floor(Math.random() * 5)]
      word_Display(word);
      break
    case 'World Capitals':
      word = capitals[Math.floor(Math.random() * 5)]
      word_Display(word);
      break
    case 'Movies':
      word =  movies[Math.floor(Math.random() * 5)]
      word_Display(word);
      break
  }
  var boxSelected = document.getElementById("category")
  boxSelected.setAttribute('disabled', true)
}

// Function to create the container that holds the amount values
function spinWheel(callback) {
  var spinnerText = '';
  var startTime = Date.now();
  var interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime; 
    
    if (elapsedTime >= 500) {
      clearInterval(interval);
      callback(spinnerText);
    } else {
      var randomIndex = Math.floor(Math.random() * values.length);
      updatedText = values[randomIndex];
      spinnerText = values[randomIndex];
      textbox.textContent = updatedText;
    }
  }, 10); // Update every 100 milliseconds
}

function handleSpin() {
  spinWheel(function(updatedText) {
    // This function will be called with the updated text once the interval is finished
    // Update UI with the updated text
    textbox.textContent = updatedText;
    // Handle additional logic based on the updated text if needed
    if (updatedText === 'Lose your turn' || updatedText === 'Bankrupt') {
      if(updatedText === 'Bankrupt'){
        textbox.textContent = 0
      }
      deductLives();
      enableSpinButton();
      disableAlphaButton();
    } else {
      disableSpinButton();
      enableAlphaButton();
    }
  });
}

// Middle Section
// Function to create the container that holds the letters of the alphabet
// Buttons are being used for display
function create_Letter_Display() {
  for (let i = 0; i < alpha.length ; i++){
    const letter_button = document.createElement('button')
    letter_button.setAttribute('disabled', true)
    letter_button.setAttribute('id', 'btn' + i)
    letter_button.setAttribute('onclick', 'check(this.id)' )
    letter_button.textContent = alpha[i]
    letters_container.appendChild(letter_button)
  }
}

function check(button_pressed) {
  letter_selected = document.getElementById(button_pressed).innerHTML
  let word_Lower = word.toLowerCase()

  if(word_Lower.includes(letter_selected.toLowerCase())){
    for (let i = 0; i < word.length; i++){
      if(word_Lower.charAt(i) === letter_selected.toLowerCase()){
        let letter_selected_container = document.getElementById('div' + i);
        letter_selected_container.style.backgroundColor = 'black';
        score += parseInt(textbox.textContent)
        letters_found += 1
      }
    }
    document.getElementById(button_pressed).style.backgroundColor = 'white'
    scoreDisplay.textContent = score
    disableAlphaButton()
    enableSpinButton()
  }else{
    document.getElementById(button_pressed).style.backgroundColor = 'white'
    deductLives()
  }
  console.log('lf is: ' +letters_found)
  console.log('wl is: ' + word.length)
  if (letters_found === word.length){
    game_status.innerHTML = 'Congratulations on finding the word. You won a total of $' + score
    spin_button.setAttribute('disabled', true)
    disableAlphaButton()
    replay_button.style.display = "block"
  }
}

// Bottom Section
function create_Word_Display() {

  for (let i = 0; i < 36; i++){
    const letter_box = document.createElement('div')
    letter_box.setAttribute('id', 'div' + i)
    word_guessed.appendChild(letter_box)
  }
}

// Function to distribute each letter of the word into a textbox
function word_Display(word) {
  console.log('the word is: ' + word)
  for (var i = 0; i < word.length; i++) {
    var char = word.charAt(i);
    var divId = "div" + i; // Generating the id like "div1", "div2", ...
    var divElement = document.getElementById(divId);
    if (divElement) {
      if (char.match(/[a-zA-Z]/)) {
        divElement.textContent = char; // Assigning the character to the div
        divElement.style.backgroundColor = 'white'
      }else{
        letters_found += 1
        divElement.textContent = char; // Assigning the character to the div
        // divElement.style.backgroundColor = 'black'
      }
    }
  }
}

function enableSpinButton() {
  spin_button.removeAttribute('disabled')
}

function disableSpinButton() {
  spin_button.setAttribute('disabled', true);
}

function enableAlphaButton() {
  for (let i = 0; i < alpha.length ; i++){
    let btn = document.getElementById('btn' + i);
    btn.removeAttribute('disabled');
  }
}

function disableAlphaButton() {
  for (let i = 0; i < alpha.length ; i++){
    let btn = document.getElementById('btn' + i);
    btn.setAttribute('disabled',true);
  }
}

function deductLives() {
  lives--
  livesDisplay.innerHTML = lives

  if (lives === 0){
    game_status.innerHTML = 'You did not guess the word! Thanx for playing.'
    disableSpinButton()
    disableAlphaButton()
    replay_button.style.display = "block"
  }else{
    console.log('the letter should be white out')
    disableAlphaButton()
    enableSpinButton()
  }
}

function replayGame() {
  var boxSelected = document.getElementById("category")
  boxSelected.removeAttribute('disabled')
  for (let i = 0; i < 36; i++){
    var lbId = "div" + i
    var letter_box_element = document.getElementById(lbId)
    letter_box_element.textContent = " "
    letter_box_element.style.backgroundColor="black"
  }
  for (let i = 0; i < alpha.length ; i++){
    var btnId = "btn" + i
    const letter_button = document.getElementById(btnId)
    letter_button.style.backgroundColor='black'
  }
  replay_button.style.display = "none"
  scoreDisplay.textContent = 0
  score = 0
  livesDisplay.textContent = 5
  lives = 5
  document.getElementById("category").value="Select Category"
  game_status.innerHTML = ''
  textbox.textContent = ''
  letters_found = 0
}

create_Category_Display();  
create_Letter_Display();
create_Word_Display();


