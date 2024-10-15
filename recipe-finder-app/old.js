const apiKey = "a188af6fbaf2494ea9df796f288cafdf";
const searchBtn = document.getElementById("search-btn");
// const hide = (searchBtn.onclick = searchRecipes);
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");

async function searchRecipes() {
  const searchInput = document.getEllcementById("search-input").value;

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

    data.results.forEach((recipe) => {
      const div = document.createElement("div");
      // const recipeImgDiv = document.createElement("div");
      const img = document.createElement("img");
      // const recipeNameDiv = document.createElement("div");
      const h3 = document.createElement("h3");
      const a = document.createElement("a");

      div.classList.add("recipe-card");
      div.classList.add("recipe-img");
      div.classList.add("recipe-name");
      a.classList.add("view-recipe-btn");

      const recipeCard = document.getElementsByClassName("recipe-card");
      const recipeImgDiv = document.getElementsByClassName("recipe-img");
      const recipeNameDiv = document.getElementsByClassName("recipe-name");
      const viewBtn = document.getElementsByClassName("view-recipe-btn");

      resultsDiv.appendChild(recipeCard);
      recipeCard.appendChild(recipeImgDiv);
      recipeImgDiv.appendChild((img.src = recipe.image));
      recipeCard.appendChild(recipeNameDiv);
      recipeNameDiv.appendChild((h3.textContent = recipe.title));
      recipeCard.appendChild((a.textContent = "View Recipe"));

      // resultsDiv.innerHTML = `
      // <div class="recipe-card">
      // <div class="recipe-img">
      //   <img src"${recipe.image} alt="${recipe.title}">
      //   </div>
      // <div class="recipe-name">
      //   <h3>${recipe.title}</h3>
      //   </div>
      //   <a href="#" class="view-recipe-btn">View Recipe</a>
      //   </div>
      //   `;
      // recipeCard.classList.add("recipe-card");
      // resultsSection.appendChild(recipeCard);
    });
  } catch (error) {
    console.error(`Error:`, error);
    resultsDiv.innerHTML = "An error occured while searching.";
  }
}

searchBtn.onclick = searchRecipes;

//   try {
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchInput.value}`
//     );
//     // .then((response) => response.json())
//     // .then((data) => console.log(data))
//     // .catch((error) => console.error(`Error:`, error));

//     const data = await response.json();

//     if (data.results.length === 0) {
//       resultsDiv.innerHTML = "No recipes found. Try another search.";
//       return;
//     }

//     // let recipeCard = document.createElement("div");
//     let resultsHtml = "";
//     data.results.forEach((recipe) => {
//       recipeHtml += `
//       <div class="recipe-card">
//       <div class="recipe-img">
//         <img src"${recipe.image} alt="${recipe.title}">
//         </div>
//       <div class="recipe-name">
//         <h3>${recipe.title}</h3>
//         </div>
//         <a href="#" class="view-recipe-btn">View Recipe</a>
//         </div>
//         `;
//       // recipeCard.classList.add("recipe-card");
//       // resultsSection.appendChild(recipeCard);
//     });
//     resultsDiv.innerHTML = resultsHtml;
//   } catch (err) {
//     console.error("Error", err);
//     resultsDiv.innerHTML =
//       "An error occurred while searching for recipes. Please try again.";
//   }
// }

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
