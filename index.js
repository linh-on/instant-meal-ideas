import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let recipes = [];

const THE_MEAL_DB_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

//home page
app.get("/", (req, res) => {
  res.render("index.ejs", { recipes: recipes });
});

app.post("/recipe", async (req, res) => {
  try {
    const ingredient = req.body.ingredients;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const result = response.data;
    const meals = response.data.meals;
    console.log(result);
    res.render("recipe.ejs", { meals: meals, ingredient: ingredient });
  } catch (error) {
    console.error(error);
    res.render("recipe.ejs", { meals: null, ingredient: ingredient });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`); //callback
});
