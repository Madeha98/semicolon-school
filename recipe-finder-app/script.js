const apiKey = "a188af6fbaf2494ea9df796f288cafdf";
const searchBtn = document.getElementById("search-btn");
// const hide = (searchBtn.onclick = searchRecipes);
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");
const popupDiv = document.getElementById("popup");

// resultsDiv.addEventListener("click", getRecipe);

async function searchRecipes() {
  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    alert("Please enter a search term");
    return;
  }

  // resultsDiv.innerHTML = "Searching...";

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}`
    );
    // .then((response) => response.json())
    const data = await response.json();

    console.log(data);
    resultsDiv.innerHTML = "";

    if (data.results.length === 0) {
      resultsDiv.innerHTML = "No recipes found. Try another search.";
      return;
    }

    let resultsHtml = "";
    // popupDiv.innerHTML = "";
    // let popupHtml = "";

    data.results.forEach((recipe) => {
      resultsHtml += `
      <div class="recipe-card">
      <div class="recipe-img">
        <img src="${recipe.image}" alt="${recipe.title}">
        </div>
      <div class="recipe-name">
        <h3>${recipe.title}</h3>
        </div>
        <button class="view-recipe-btn" id="view-recipe-btn" onclick="getRecipe(${recipe.id})">View Recipe</button>
        </div>
        `;
      resultsDiv.innerHTML = resultsHtml;
      // let viewRecipeBtn = document.getElementById("view-recipe-btn");

      // viewRecipeBtn.addEventListener("click", viewRecipe(recipe.id));
      // let x = viewRecipeBtn.target.parentElement.parentElement;
      // console.log(viewRecipeBtn.target);
      // let popupHtml = "";
      // function viewRecipe() {}

      // const recipeCard = document.getElementById("recipe-card");
      // recipeCard.addEventListener("click", getRecipe);

      // var viewRecipeBtn = document.getElementById("view-recipe-btn");
      // viewRecipeBtn.onclick = console.log("view button clicked");
      // viewRecipeBtn.onclick = popupDiv.classList.remove("hidden");

      // popupHtml += `
      // <div class="popup-img-container">
      //           <img src="${recipe.image}" alt="${recipe.title}" class="popup-img" />
      //           <div class="popup-img-overlay"></div>
      //           <p class="popup-title">${recipe.title}</p>
      //         </div>
      //           <div class="popup-card">
      //           <div class="ingredients">
      //           <h1>Ingredients:</h1>
      //           <p></p>
      //         </div>
      //           <div class="method">
      //           <h1>Method:</h1>
      //           <p></p></div>
      //         </div>
      //       `;

      //       function viewRecipe() {
      //         popupDiv.innerHTML = popupHtml;
      //       }

      // viewRecipeBtn.onclick = function (e) {
      //   popupDiv.innerHTML = popupHtml;
      // };

      // function viewRecipe() {
      //   popupDiv.innerHTML = popupHtml;
      // }

      // viewRecipeBtn.onclick = viewRecipe;
    });
  } catch (error) {
    console.error(`Error:`, error);
    resultsDiv.innerHTML = "An error occured while searching.";
  }
}

async function getRecipe(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    const recipe = await response.json();
    // resultsSection.classList.add("hidden");
    let popupHtml = `
    <div class="popup-img-container">
              <img src="${recipe.image}" alt="${
      recipe.title
    }" class="popup-img" />
              <div class="popup-img-overlay"></div>
              <p class="popup-title">${recipe.title}</p>
            </div>
              <div class="popup-card">
              <div class="ingredients">
              <h1>Ingredients:</h1>
              <ul>${recipe.extendedIngredients
                .map((ingredient) => `<li>${ingredient.original}</li>`)
                .join("")}
                </ul>
            </div>
              <div class="method">
              <h1>Method:</h1>
              <ol>${recipe.analyzedInstructions[0].steps
                .map((step) => `<li>${step.step}</li>`)
                .join("")}</ol>
              </div>
            </div>
            <div class="recipe-btn-container">
            <button class="favourites-add-btn" id="favourites-add-btn" onclick="saveToLocalStorage(${recipeId})">Add to Favourites</button>
            <button class="close-recipe-btn" id="close-recipe-btn" onclick="closeRecipe()">Close</button>
          </div>
            `;

    popupDiv.innerHTML = popupHtml;
  } catch (error) {
    console.error("Error:", error);
    popupDiv.innerHTML = "An error occured while getting recipe";
  }
}

function saveToLocalStorage(recipeId) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipeId);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function closeRecipe() {
  popupDiv.innerHTML = "";
}

// function getRecipe(e) {
//   e.preventDefault();
//   if (e.target.classList.contains("view-recipe-btn")) {
//     let recipeItem = e.target.parentElement.parentElement;
//     fetch(
//       `https://api.spoonacular.com/recipes/${recipeItem.dataset.id}/information?apiKey=${apiKey}`
//     )
//       .then((response) => response.json())
//       .then((data) => viewRecipe(data.recipeItem));
//   }
// }

// function viewRecipe(recipe) {
//   console.log(recipe);
//   recipe = recipe[0];
//   let popupHtml = `
// <div class="popup-img-container">
//           <img src="${recipe.image}" alt="${recipe.title}" class="popup-img" />
//           <div class="popup-img-overlay"></div>
//           <p class="popup-title">${recipe.title}</p>
//         </div>
//           <div class="popup-card">
//           <div class="ingredients">
//           <h1>Ingredients:</h1>
//           <p></p>
//         </div>
//           <div class="method">
//           <h1>Method:</h1>
//           <p></p></div>
//         </div>
//       `;
//   popupDiv.innerHTML = popupHtml;
// }

searchBtn.onclick = searchRecipes;

// Function to display section
// function displaySection(section) {
//   if (section === "results") {
//     document
//       .getElementsByClassName("results-section")
//       .classList.remove("hidden");
//   }
// }

// Display search results
// function displayResults(results) {
//   displaySection("results");

//   results.forEach(recipe) => {
//     const recipeCard = document.createElement("div");
//     recipeCard.classList.add("recipe-card");
//     recipeCard.innerHTML = `
//     <div class="recipe-img">
//     <img src"${recipe.image}" />
//     </div>
//     <div class="recipe-name">
//     <h3>${recipe.title}</h3>
//     </div>
//     <a href="#" class="view-recipe-btn">View Recipe</a>`;
//     resultsSection.appendChild(recipeCard);
