const appid = "00a8c328";
const appkey = "bed302c3235acf35eb3c64378658b02c";
const baseurl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appid}&app_key=${appkey}`;
const recipeContainer = document.querySelector(".recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");



btnFind.addEventListener("click", () => loadRecipies(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
  const inputVal = txtSearch.value;

  loadRecipies(inputVal);
  

});
function loadRecipies(type = "pasta") {
  const url = baseurl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipies(data.hits))
    .catch((error) => console.log(error));

}
loadRecipies();
const getRecipe = (ingredientLines = []) => {
  let str = "";
  for (var step of ingredientLines) {
    str = str + `<li>${step}</li>`;
  }
  return str;
}

const renderRecipies = (recipeList = []) => {
  recipeContainer.innerHTML = '';
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
    } = recipeObj.recipe;
    const recipeStep = getRecipe(ingredientLines);
    const htmlstr = `<div class="recipe">
    <div class="recipe-inner">
    <div class="recipe-front">
    <div class="recipe-title">${recipeTitle}</div>
    <div class="recipe-image"><img src="${recipeImage}" /></div>
     </div>
    <div class="recipe-back">
     <div class="text-recipe">
     <div class="recipe-title">${recipeTitle}</div>
       <ul>
       ${recipeStep}

       </ul>
    </div>
    </div>
    </div>`;
    recipeContainer.insertAdjacentHTML('beforeend', htmlstr);

  });
};
