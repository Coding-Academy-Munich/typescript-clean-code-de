export interface Recipe {
    name: string;
    ingredients: string[];
    instructions: string;
    rating?: number;
  }

export class RecipeBook {
    constructor(private recipes: Recipe[] = []) {}

    addRecipe(recipe: Recipe): void {
      this.recipes.push(recipe);
    }

    getRecipeByName(name: string): Recipe {
      const recipe = this.recipes.find((r) => r.name === name);
      if (!recipe) {
        throw new Error(`Recipe ${name} not found!`);
      }
      return recipe;
    }

    getRecipesWithIngredient(ingredient: string): Recipe[] {
      return this.recipes.filter((recipe) =>
        recipe.ingredients.includes(ingredient)
      );
    }

    getRecipesByRating(rating: number): Recipe[] {
      return this.recipes.filter((recipe) => recipe.rating === rating);
    }

    getRecipesWithRatingAtLeast(minRating: number): Recipe[] {
      return this.recipes.filter(
        (recipe) => recipe.rating === undefined || recipe.rating >= minRating
      );
    }
  }
