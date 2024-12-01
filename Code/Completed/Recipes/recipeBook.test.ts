import { Recipe, RecipeBook } from "./recipeBook.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert";

const recipe1: Recipe = {
  name: "My Recipe",
  ingredients: ["ingredient 1", "my ingredient 2"],
  instructions: "Instructions\n...",
  rating: 4,
};

const recipe2: Recipe = {
  name: "Your Recipe",
  ingredients: ["ingredient 1", "your ingredient 2"],
  instructions: "Instructions\n...",
  rating: 5,
};

Deno.test("RecipeBook.addRecipe should add a recipe", () => {
  const recipeBook = new RecipeBook();
  recipeBook.addRecipe(recipe1);
  assertEquals(recipeBook.getRecipeByName("My Recipe"), recipe1);
});

Deno.test("RecipeBook.getRecipeByName should return the correct recipe", () => {
  const recipeBook = new RecipeBook([recipe1, recipe2]);

  assertEquals(recipeBook.getRecipeByName("My Recipe"), recipe1);
  assertEquals(recipeBook.getRecipeByName("Your Recipe"), recipe2);

  assertThrows(
    () => {
      recipeBook.getRecipeByName("nonexistent");
    },
    Error,
    "Recipe nonexistent not found!"
  );
});

Deno.test("RecipeBook.getRecipesWithIngredient should return recipes containing the ingredient", () => {
  const recipeBook = new RecipeBook([recipe1, recipe2]);

  assertEquals(recipeBook.getRecipesWithIngredient("ingredient 1"), [
    recipe1,
    recipe2,
  ]);
  assertEquals(recipeBook.getRecipesWithIngredient("my ingredient 2"), [recipe1]);
  assertEquals(recipeBook.getRecipesWithIngredient("nonexistent"), []);
});

Deno.test("RecipeBook.getRecipesByRating should return recipes with exact rating", () => {
  const recipeBook = new RecipeBook([recipe1, recipe2]);

  assertEquals(recipeBook.getRecipesByRating(4), [recipe1]);
  assertEquals(recipeBook.getRecipesByRating(5), [recipe2]);
  assertEquals(recipeBook.getRecipesByRating(3), []);
});

Deno.test("RecipeBook.getRecipesWithRatingAtLeast should return recipes above or equal to the minimum rating", () => {
  const recipeBook = new RecipeBook([recipe1, recipe2]);

  assertEquals(recipeBook.getRecipesWithRatingAtLeast(3), [recipe1, recipe2]);
  assertEquals(recipeBook.getRecipesWithRatingAtLeast(4), [recipe1, recipe2]);
  assertEquals(recipeBook.getRecipesWithRatingAtLeast(5), [recipe2]);
  assertEquals(recipeBook.getRecipesWithRatingAtLeast(6), []);
});
