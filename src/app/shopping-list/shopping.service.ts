import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

interface ExistingIngredients {
  [name: string]: number;
}

/**
 * IMPORTANT: any time that you delete an ingredient from the ingredients array,
 * you must delete that ingredient from the existingIngredients array.
 * The purpose of the existingIngreedientsArray is to know if a certain ingredient
 * already exist in the ingredients array, if this is true, when the user adds the same
 * ingredient, the property amount will be changed according with the amount provided by the user.
 * If we don't do this, we will see the same ingredient added multiple times, so with this
 * we are able to just increase the amount in the view.
 */

@Injectable()
export class ShoppingService {

  private ingredients: Ingredient[] = [];

  private existingIngredients: ExistingIngredients = {};

  ingredientsChanged = new Subject<Ingredient[]>();

  ingredientSelected = new Subject<Ingredient>();

  constructor() { }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => this.checkAndAddIngredient(ingredient) );
  }

  addIngredient(ingredient: Ingredient): void {

    this.checkAndAddIngredient(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredients(ingredients: { [index: number]: Ingredient }): void {

    const ingredientsValues = Object.values(ingredients);

    for(let ingredient of ingredientsValues) {

      const index = this.ingredients.indexOf(ingredient);

      // remove from existing ingredients
      const { [ingredient.name]: _, ...existingIngredients } = this.existingIngredients;
      this.existingIngredients = existingIngredients;

      // remove ingredient
      this.ingredients.splice(index, 1);

    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(ingredientIndex: number): void {

    this.ingredients.splice(ingredientIndex, 1);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  clearIngredients(): void {

    this.ingredients = [];

    this.existingIngredients = {};

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // checkAndAddIngredient will check if an ingredient is present in the array of ingredients,
  // if exist, the amount property of the reference of that ingredient in the array will be increased
  // and therefore none new ingredient will be added since it already exist. Otherwise, the ingredient
  // will be pushed to the array of ingredient and the name of the new ingredient will be added
  // to the existingIngredients hashmap for future checks.
  // In this way, we are able to avoid the rendering of the same ingredient, so just the amount will
  // be incremented in case that the user add more of the same ingredient.
  private checkAndAddIngredient(ing: Ingredient): void {
    // create a diferent ingredient object so it doesn't modified the original.
    let ingredient = {...ing};
    
    ingredient = this.formatIngredient(ingredient);
    // If the ingredient already exist, then find it and sum its current amount with the new amount.
    if (this.existingIngredients[ingredient.name]) {

      this.ingredients.find((current: Ingredient, idx: number) => {

        if (current.name.toLowerCase() === ingredient.name.toLowerCase()) {

          this.ingredients[idx].amount += ingredient.amount;
          return true;
        }
        return false;
      });
    } else {

      this.existingIngredients[ingredient.name] = ingredient.amount;

      this.ingredients.push(ingredient);
    }
  }

  // This method will transform the ingredient name to capitalize.
  private formatIngredient(ing: Ingredient): Ingredient {

    const ingredient = { ...ing };

    ingredient.name = ingredient.name[0].toUpperCase() + ingredient.name.slice(1);

    return ingredient;
  }

}
