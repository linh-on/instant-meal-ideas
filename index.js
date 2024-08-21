import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let recipes = [];

const THE_MEAL_DB_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

app.get("/", (req, res) => {
  res.render("index.ejs", { recipes: recipes });
});

app.get("/search-by-area", (req, res) => {
  res.render("search-by-area.ejs");
});

app.get("/search-by-category", (req, res) => {
  res.render("search-by-category.ejs");
});

app.post("/recipe", async (req, res) => {
  try {
    const searchInput = req.body.ingredients;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
    );
    const result = response.data;
    const meals = response.data.meals;
    res.render("recipe.ejs", { meals: meals, searchInput: searchInput });
  } catch (error) {
    console.error(error);
    res.render("recipe.ejs", { meals: null, searchInput: searchInput });
  }
});

app.post("/search-category", async (req, res) => {
  try {
    const searchInput = req.body.category;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`
    );
    const result = response.data;
    const meals = response.data.meals;
    res.render("recipe.ejs", { meals: meals, searchInput: searchInput });
  } catch (error) {
    console.error(error);
    res.render("recipe.ejs", { meals: null, searchInput: searchInput });
  }
});

app.post("/search-area", async (req, res) => {
  try {
    const searchInput = req.body.area;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`
    );
    const areaList = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );

    const meals = response.data.meals;
    const options = areaList.data.meals;
    res.render("recipe.ejs", { meals: meals, searchInput: searchInput });
  } catch (error) {
    console.error(error);
    res.render("recipe.ejs", { meals: null, searchInput: searchInput, options: options });
  }
});

app.post("");
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
