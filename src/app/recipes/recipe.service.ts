import { Injectable } from '@angular/core';

import { ShoppingService } from '../shopping-list/shopping.service';

import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 0,
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
      id: 1,
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

  constructor() {}

  getRecipe(id: number): Recipe | undefined {
    const recipe = this.recipes.find((r: Recipe) => {
      return r.id === id;
    });
    return recipe;
  }

  getRecipes(): Recipe[] {
    // Use slice method to return a new array and not the reference to the original
    // to prevent modification from outside
    return this.recipes.slice();
  }

}
