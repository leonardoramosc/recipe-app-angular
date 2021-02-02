import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ShoppingService } from '../../shopping-list/shopping.service';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = Number(params.id);

      const recipe = this.recipeService.getRecipe(id);

      if (recipe) {
        this.recipe = recipe;
      }
    });
  }

  addToShoppingList(): void {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

}
