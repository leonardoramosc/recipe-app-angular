import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingService {
  private ingredients: Ingredient[] = [
    {
      name: 'tomatoes',
      amount: 10
    },
    {
      name: 'cheese',
      amount: 0.2
    }
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}
