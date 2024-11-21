const apiKey = "4bc090652f7144a9a81bfee644b0c2ba";
const searchBtn = document.getElementById("search-btn");
const viewFavouritesBtn = document.getElementById("view-favourites-btn");
const divider = document.getElementById("divider");
const dividerWrapper = document.getElementById("divider-wrapper");
const dividerSearchBtn = document.getElementById("divider-search-btn");
const dividerSearchInput = document.getElementById("divider-search-input");
const resultsSection = document.getElementById("results-section");
const resultsHeading = document.getElementById("results-heading");
const resultsDiv = document.getElementById("results");
const popupDiv = document.getElementById("popup");
const favouritesSection = document.getElementById("favourites-section");
const favouritesHeading = document.getElementById("favourites-heading");
// const unfavouriteBtn = document.getElementById("unfavourite-btn");
// check search input nothing
// firstscroll into view
//remove from favourites function

searchBtn.onclick = searchRecipes;
dividerSearchBtn.onclick = dividerSearchRecipes;
// unfavouriteBtn.onclick = removeFromFavourites;

searchBtn.addEventListener("click", function (e) {
  e.preventDefault;
  document.getElementById("divider").scrollIntoView({ behavior: "smooth" });
});

viewFavouritesBtn.addEventListener("click", function (e) {
  e.preventDefault;
  document.getElementById("divider").scrollIntoView({ behavior: "smooth" });
});

async function searchRecipes() {
  const searchInput = document.getElementById("search-input");
  resultsDiv.style.display = "grid";
  resultsHeading.style.display = "flex";

  divider.classList.remove("hidden");
  dividerWrapper.classList.remove("hidden");
  favouritesSection.classList.add("hidden");
  favouritesHeading.classList.add("hidden");

  if (searchInput.length === 0 || dividerSearchInput.length === 0) {
    alert("Please enter a search term");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}&number=12`
    );
    const data = await response.json();

    console.log(data);
    resultsDiv.innerHTML = "";

    if (data.results.length === 0) {
      alert("No recipes found. Please try again.");
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
    resultsDiv.innerHTML = "An error has occured.";
  }
}

async function dividerSearchRecipes() {
  const searchInput = document.getElementById("search-input");
  resultsDiv.style.display = "grid";
  resultsHeading.style.display = "flex";

  divider.classList.remove("hidden");
  dividerWrapper.classList.remove("hidden");
  favouritesSection.classList.add("hidden");
  favouritesHeading.classList.add("hidden");

  if (searchInput.length === 0 || dividerSearchInput.length === 0) {
    alert("Please enter a search term");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${dividerSearchInput.value}&number=12`
    );
    const data = await response.json();

    console.log(data);
    resultsDiv.innerHTML = "";

    if (data.results.length === 0) {
      alert("No recipes found. Please try again.");
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
    resultsDiv.innerHTML = "An error has occured.";
  }
}

async function getRecipe(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    const recipe = await response.json();

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
    popupDiv.innerHTML = "An error has occured.";
  }
}

function saveToLocalStorage(recipeId) {
  // const favourites = document.getElementById("favourites");

  let favouritesKey = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favouritesKey.includes(recipeId)) {
    alert("Already added to favourites.");
  } else {
    favouritesKey.push(recipeId);
    localStorage.setItem("favourites", JSON.stringify(favouritesKey));
  }
}

function closeRecipe() {
  popupDiv.innerHTML = "";
}

function loadFavourites() {
  const favourites = document.getElementById("favourites");
  // const heading = document.getElementById("results-heading");
  let favouritesKey = JSON.parse(localStorage.getItem("favourites")) || [];

  // heading.textContent = "Favourites:";

  // resultsSection.classList.add("hidden");
  // favouritesSection.classList.remove("hidden");

  // if (favouritesKey.length === 0) {
  //   favourites.innerHTML = "<p>No recipes added to favourites.</p>";
  //   return;
  // }
  favouritesKey.forEach((recipeId) => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((recipe) => {
        // let favouritesHtml = "";
        favourites.innerHTML += `
      <div class="recipe-card">
      <div class="recipe-img">
        <img src="${recipe.image}" alt="${recipe.title}">
        </div>
      <div class="recipe-name">
        <h3>${recipe.title}</h3>
        </div>
        <div class"card-btn-container">
        <button class="view-recipe-btn" id="view-recipe-btn" onclick="getRecipe(${recipe.id})">View Recipe</button>
        <button class="unfavourite-btn" onclick="removeFromFavourites(${recipe.id})"><i class="fa fa-trash"></i></button>
        </div>
        </div>
        `;
        // favourites.innerHTML = favouritesHtml;
      })
      .catch((error) => console.error("An error has occured.", error));
  });
}

function displayFavourites() {
  // const favourites = document.getElementById("favourites");
  let favouritesKey = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favouritesKey.length === 0) {
    alert("No recipes added to favourites.");
    return;
  }

  divider.classList.remove("hidden");
  dividerWrapper.classList.remove("hidden");
  resultsHeading.style.display = "none";
  resultsDiv.style.display = "none";
  favouritesSection.classList.remove("hidden");
  favouritesHeading.classList.remove("hidden");
}

function removeFromFavourites(recipeId) {
  let favouritesKey = JSON.parse(localStorage.getItem("favourites")) || [];

  favouritesKey = favouritesKey.filter((fav) => fav.id !== recipeId);
  localStorage.setItem("favourites", JSON.stringify(favouritesKey));
  alert("Recipe removed from favourites!");
  displayFavourites();
  // displayFavourites();
}

function goToHome() {
  window.scrollTo(0, 0);
  divider.classList.add("hidden");
  dividerWrapper.classList.add("hidden");
  favouritesSection.classList.add("hidden");
  favouritesHeading.classList.add("hidden");
}

loadFavourites();
// viewFavouritesBtn.onclick = displayFavourites();
