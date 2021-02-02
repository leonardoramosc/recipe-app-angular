import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

interface ExistingIngredients {
  [name: string]: number;
}

@Injectable()
export class ShoppingService {
  private ingredients: Ingredient[] = [];
  private existingIngredients: ExistingIngredients = {};

  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => this.checkAndAddIngredient(ingredient) );
  }

  addIngredient(ingredient: Ingredient): void {

    this.checkAndAddIngredient(ingredient);
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
    const ingredient = {...ing};
    // If the ingredient already exist, then find it and sum its current amount with the new amount.
    if (this.existingIngredients[ingredient.name]) {

      this.ingredients.find((current: Ingredient, idx: number) => {

        if (current.name === ingredient.name) {

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

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}
