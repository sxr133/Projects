const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const options = ['Sports Team', 'World Capitals', 'Famous Sayings'];
const letters_container = document.querySelector('.letters-container');
const category_section = document.getElementById('categories');
const spinner_section = document.getElementById('spinner');

let width = 26;
let letter_button_id

function create_Category_Section() {
  const drop_down_label = document.createElement('label')
  drop_down_label.setAttribute('for', 'categories')
  drop_down_label.innerHTML = "Categories:"
  category_section.appendChild(drop_down_label)

  const select = document.createElement('select')
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = "value" + i; // Set value attribute if needed
    select.appendChild(option); // Append option to select element
  }
  select.name = "categories"
  select.id = "category"

  category_section.appendChild(select)
}

function spinWheel() {
  var values = ['100', '200', '300', '400', '500', '1000', 'Lose Your Turn', 'Bankrupt', '5000'];
  var textbox = document.getElementById('textbox');
  var startTime = Date.now();
  var interval = setInterval(function() {
      var elapsedTime = Date.now() - startTime;
      if (elapsedTime >= 5000) {
          clearInterval(interval);
      } else {
          var randomIndex = Math.floor(Math.random() * values.length);
          textbox.textContent = values[randomIndex];
      }
  }, 10); // Update every 100 milliseconds
}

function create_Letter_Display() {
  for (let i = 0; i < alpha.length ; i++){
    const letter_button = document.createElement('button')
    letter_button.setAttribute('button-id', i)
    letter_button.innerHTML = alpha[i]
    letters_container.appendChild(letter_button)
  }
}

create_Category_Section()
create_Letter_Display();
