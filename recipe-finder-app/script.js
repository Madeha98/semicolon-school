const apiKey = "a188af6fbaf2494ea9df796f288cafdf";
const searchBtn = document.getElementById("search-btn");
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");
const popupDiv = document.getElementById("popup");

async function searchRecipes() {
  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    alert("Please enter a search term");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}`
    );
    const data = await response.json();

    console.log(data);
    resultsDiv.innerHTML = "";

    if (data.results.length === 0) {
      resultsDiv.innerHTML = "No recipes found. Try another search.";
      return;
    }

    let resultsHtml = "";

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

searchBtn.onclick = searchRecipes;
