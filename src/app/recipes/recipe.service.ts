import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Test Recipe',
      description: 'This is a test',
      image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',
      ingredients: [
        {name: 'bread', amount: 4},
        {name: 'salchicha', amount: 4},
        {name: 'cebolla', amount: 1}
      ]
    },
    {
      name: 'Pizza',
      description: 'Delicious pizza',
      image: 'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-5.jpg',
      ingredients: [
        {name: 'flour', amount: 1},
        {name: 'cheese', amount: 1},
        {name: 'ham', amount: 0.5},
        {name: 'tomatoes', amount: 3}
      ]
    }
  ];

  // selectRecipe event for cross component communication
  selectRecipe = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    // Use slice method to return a new array and not the reference to the original
    // to prevent modification from outside
    return this.recipes.slice();
  }

}
