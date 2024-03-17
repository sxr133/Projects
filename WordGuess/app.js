// Variables
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const capitals = ['Berlin', 'London', 'Paris', 'Rome', 'Ottawa'];
const teams = ['Montreal Canadiens', 'Toronto BlueJays', 'Boston Red-Sox', 'Los Angeles Dodgers', 'New York Yankees'];
const movies = ['Titanic', 'Avatar', 'Rocky', 'Shreik', 'Mission Impossible'];

const options = ['Select Category', 'Sports Team', 'World Capitals', 'Movies'];
const letters_container = document.querySelector('.letters-container');
const category_section = document.getElementById('categories');
const spinner_section = document.getElementById('spinner');
const word_guessed = document.querySelector('.word-container')
const drop_down_label = document.createElement('label')
const select = document.createElement('select')
const spin_button = document.getElementById('spin_button')

var values = ['100', '200', '300', '400', '500', '1000', '2500', '5000', 'Lose Your Turn', 'Bankrupt', '5000'];

let lives = 5;
let width = 26;
let letter_button_id;
let word;

// Top Section
// Function to create the category drop-down box
function create_Category_Display() {
  // Label
  drop_down_label.setAttribute('for', 'categories')
  drop_down_label.innerHTML = "Categories:"
  category_section.appendChild(drop_down_label)
  
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
  lives -= 1
  spin_button.removeAttribute('disabled')
  console.log(letters_container)
  for (let i = 0; i < alpha.length ; i++){
    let btn = document.getElementById('btn' + i);
    btn.removeAttribute('disabled');
  }
  getWord(selectBox)
}

// Function to create the container that holds the amount values
function spinWheel() {
  var textbox = document.getElementById('textbox');
  var startTime = Date.now();
  var interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime; 
    if (elapsedTime >= 500) {
      clearInterval(interval);
    } else {
      var randomIndex = Math.floor(Math.random() * values.length);
      textbox.textContent = values[randomIndex];
    }
  }, 10); // Update every 100 milliseconds
}

// Function to create the guessed word into an array or into a word
function word_split(word) {
  // Find the index of the last space character
  var lastSpaceIndex = word.lastIndexOf(' ');

  if (lastSpaceIndex > 0){
    // Split the string into two parts based on the last space character
    var firstPart = word.substring(0, lastSpaceIndex);
    var secondPart = word.substring(lastSpaceIndex + 1);

    // Create an array with the two parts
    var newArray = [firstPart, secondPart];
    console.log('newArray is ' + newArray); // Output: ["new york", "yankees"
  }else{
    newArray = word
    console.log('word is: ' + word)
  }
  return newArray
}

// Function to retrieve a random word from the specifics array from selected choice
function getWord(selectBox) {
  switch(selectBox) {
    case 'Sports Team':
      word = teams[Math.floor(Math.random() * 5)]

      newArray = word_split(word)
      
      word_Display(newArray);
      break
    case 'World Capitals':
      word = capitals[Math.floor(Math.random() * 5)]
      newArray = word_split(word)

      word_Display(newArray);
      break
    case 'Movies':
      word =  movies[Math.floor(Math.random() * 5)]
      newArray = word_split(word)

      word_Display(newArray);
      break
  }
  var boxSelected = document.getElementById("category")
  boxSelected.setAttribute('disabled', true)
}

// Middle Section
// Function to create the container that holds the letters of the alphabet
// Buttons are being used for display
function create_Letter_Display() {
  for (let i = 0; i < alpha.length ; i++){
    const letter_button = document.createElement('button')
    letter_button.setAttribute('disabled', true)
    letter_button.setAttribute('id', 'btn' + i)
    letter_button.textContent = alpha[i]
    letters_container.appendChild(letter_button)
  }
}

// Bottom Section
function create_Word_Display() {

  for (let i = 0; i < 45; i++){
    const letter_box = document.createElement('div')
    letter_box.setAttribute('id', 'div' + i)
    word_guessed.appendChild(letter_box)
  }
}

// Function to distribute each letter of the word into a textbox
function word_Display(word) {
  
  if (Array.isArray(word)) {
    if(word[0].length > 0){
      for (var i = 0; i < word[0].length; i++) {
        var char = word[0].charAt(i);
        var divId = "div" + i; // Generating the id like "div1", "div2", ...
        var divElement = document.getElementById(divId);
        if (divElement) {
            divElement.textContent = char; // Assigning the character to the div
            divElement.style.backgroundColor = 'white'
        }
      }
    }
    if (word[1].length > 0) { 
      for (var i = 0; i < word[1].length; i++) {
        var char = word[1].charAt(i);
        var divId = "div" + (i + 15); // Generating the id like "div1", "div2", ...
        var divElement = document.getElementById(divId);
        if (divElement) {
            divElement.textContent = char; // Assigning the character to the div
            divElement.style.backgroundColor = 'white'
        }
      }
    }
  }else{
    for (var i = 0; i < word.length; i++) {
      var char = word.charAt(i);
      var divId = "div" + i; // Generating the id like "div1", "div2", ...
      var divElement = document.getElementById(divId);
      if (divElement) {
          divElement.textContent = char; // Assigning the character to the div
          divElement.style.backgroundColor = 'white'
      }
    }
  }
}

/*
function clearcontent(word) { 
  for (var i = 0; i < word.length; i++) {
    var divId = "div" + (i + 1); // Generating the id like "div1", "div2", ...
    document.getElementById(divId).innerHTML = " "; // Assigning the character to the div
  } 
}*/

create_Category_Display();  
create_Letter_Display();
create_Word_Display();


