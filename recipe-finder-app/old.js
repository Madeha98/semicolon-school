const apiKey = "a188af6fbaf2494ea9df796f288cafdf";
const searchBtn = document.getElementById("search-btn");
// const hide = (searchBtn.onclick = searchRecipes);
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");
const popupDiv = document.querySelector(".popup");

searchBtn.addEventListener("click", searchRecipes);
resultsDiv.addEventListener("click", getRecipe);

function searchRecipes() {
  let searchInput = document.getElementById("search-input");
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      let resultsHtml = "";
      if (data.results) {
        data.results.forEach((recipe) => {
          resultsHtml += `
      <div class="recipe-card">
      <div class="recipe-img">
        <img src="${recipe.image}" alt="${recipe.title}">
        </div>
      <div class="recipe-name">
        <h3>${recipe.title}</h3>
        </div>
        <button class="view-recipe-btn" id="view-recipe-btn">View Recipe</button>
        </div>
        `;
        });
        // resultsDiv.classList;
      } else {
        resultsHtml = "Sorry no recipes found";
      }
      resultsDiv.innerHTML = resultsHtml;
    });
}

function getRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("view-recipe-btn")) {
    let recipeItem = e.target.parentElement.parentElement;
    fetch(
      `https://api.spoonacular.com/recipes/${recipeItem.dataset.id}/information?apiKey=${apiKey}&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => viewRecipe(data.results));
  }
}

function viewRecipe(recipe) {
  console.log(recipe);
  recipe = recipe[0];
  let popupHtml = `
      <div class="popup-img-container">
                <img src="${recipe.image}" alt="${recipe.title}" class="popup-img" />
                <div class="popup-img-overlay"></div>
                <p class="popup-title">${recipe.title}</p>
              </div>
                <div class="popup-card">
                <div class="ingredients">
                <h1>Ingredients:</h1>
                <p></p>
              </div>
                <div class="method">
                <h1>Method:</h1>
                <p></p></div>
              </div>
            `;
  popupDiv.innerHTML = popupHtml;
}
