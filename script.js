const ratingForm = document.getElementById("rating-form");
// const dogImage = document.getElementById("dog-image");
const msg = document.getElementById("msg")
const ratingList = document.getElementById("rating-list");
const existingDogImage = document.getElementById("existing-dog-image");
const ratingTable = document.getElementById("rating-table").querySelector("tbody");
var greetings = ["Hello, ","Bonjour, ","Hola, ","Guten tag, ","Hej, ","Salve, ","Nǐ Hǎo, ","Xin chào, ","Hei, ","Ahoj, "];
var second_greetings = ["you wouldn't give me a 1.. would you?","RUFF RUFF!!!" , "<3 <3 <3", "have we met before?", "stop looking at me please, its weird.", "what's 3 + 2? You said it not me." ,"how was your day?", "i love Jas, hes the best web programmer! ", " what time is it?", "stop!"]
// let inputGet = document.querySelector('#input-get');
let inputGet = "";
let url ="";
        

if(inputGet === ""){
  url = "https://dog.ceo/api/breeds/image/random"
  }
  else{
    url = `https://dog.ceo/api/breed/${inputGet}images/random`
  }
        
  console.log(url);

  let dogs = [];
  let ratings = [];

        fetch(url)
          .then(response => response.json())
          .then(data => {
            const img = document.createElement('img');
            img.src = data.message;

            dogs.push(data.message);
          
            msg.innerHTML = "RAWRRRR";
            existingDogImage.src = data.message;
            existingDogImage.alt = "Random Dog Image";


          })
          .catch(error => console.log(error));

          
        if(ratingForm) {
        ratingForm.addEventListener("submit", function(e) {
        e.preventDefault(); // prevent the form from submitting
        
      
        
      const rating = document.querySelector('input[name="rating"]:checked');
      if(rating) {
        console.log(`Rating submitted: ${rating.value}`);

        fetch(url)
          .then(response => response.json())
          .then(data => {
            const img = document.createElement('img');
            img.src = data.message;
            dogs.push(data.message);

            existingDogImage.src = data.message;
            existingDogImage.alt = "Random Dog Image";

            var greeting_id = Math.floor(Math.random() * greetings.length);
            var greeting_id_v2 = Math.floor(Math.random() * greetings.length);
            msg.innerHTML = greetings[greeting_id] + second_greetings[greeting_id_v2];

          })
          .catch(error => console.log(error));

          ratings.push(rating.value);

          
        updateRatingList()
        updateRatingTable();

        ratingForm.reset();
        Array.from(document.querySelectorAll('.star-rating label')).forEach(label => label.style.color = "#bbb");
            // Re-apply the event listeners to the star labels
            Array.from(document.querySelectorAll('.star-rating input')).forEach(input => { input.addEventListener("change", function() {
                Array.from(document.querySelectorAll('.star-rating label')).forEach(label => label.style.color = "#bbb");
                Array.from(input.labels).forEach(label => label.style.color = "#ffb400");
              });
            });
        
      }
    });

  }


function getText() {
        var textBox = document.getElementById("input-get");
        var text = textBox.value;
        inputGet = text +"/";

        if(text === ""){
          inputGet = "";
          
          url = "https://dog.ceo/api/breeds/image/random";
        }else{
          inputGet = inputGet.toLowerCase();
          url = `https://dog.ceo/api/breed/${inputGet}images/random`;

        }
        console.log(text);
        
}

function updateRatingList() {
      let ratingElements = '';
      for(let i = 0; i < ratings.length; i++) {
        ratingElements += `<li>${ratings[i]}</li>`;
      }
      ratingList.innerHTML = ratingElements;
}

function desendingSort(){
      bubbleSort();
      dogs.reverse();
      ratings.reverse();

      updateRatingList();
      updateRatingTable();
}

function bubbleSort(){
      
        
        for(var i = 0; i <= ratings.length-1; i++){
            // Last i elements are already in place
            for(var j = 0; j < ( ratings.length - i -1); j++){

                // Comparing two adjacent numbers 
                // and see if first is greater than second
                if(ratings[j] > ratings[j+1]){

                // Swap them if the condition is true 
                var temp = ratings[j]
                var temp1 = dogs[j]
                ratings[j] = ratings[j + 1]
                dogs[j] = dogs[j +1]
                ratings[j+1] = temp
                dogs[j+1] = temp1

                }
            }
        }
        updateRatingList();
        updateRatingTable();

}

function updateRatingTable() {
      let ratingRows = '';
      for(let i = 0; i < ratings.length; i++) {
        ratingRows += `
          <tr>
            <td>${ratings[i]}</td>
            <td><img src="${dogs[i]}" alt="Dog Image"></td>
          </tr>
        `;
      }
      ratingTable.innerHTML = ratingRows;
}
  
