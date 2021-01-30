import { Component, Input, OnInit } from '@angular/core';

import { ShoppingService } from '../../shopping-list/shopping.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addToShoppingList(): void {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

}
