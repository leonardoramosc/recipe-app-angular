import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientsChangeSubscription!: Subscription;

  ingredients: Ingredient[] = [];

  // This property is allowed to be setted to null in order to be able to disable the
  // delete button in the shopping-edit component, because if this property
  // is null (mean that there are not any item selected) then delete button
  // will know that and will be disabled. I did this in this way because
  // when using the [disabled] directive in the button i was unable to know
  // if there were not any selectedIngredients. Remember that selectedIngredients
  // is an object so the only way to check if an object is empty is checking it
  // with the Object.keys method, and this method cannot be used inside the condition
  // in the [disabled] directive.
  selectedIngredients: { [index: number]: Ingredient } | null = null;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {

    this.ingredients = this.shoppingService.getIngredients();

    this.ingredientsChangeSubscription = this.shoppingService
      .ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientsChangeSubscription.unsubscribe();
  }

  toggleIngredientSelection(ingredientIndex: number, ingredient: Ingredient): void {

    // If the item is the array of selected, then create a new one without the selected.
    // This means that we remove it from the selected array, this allow the toggle.
    if (this.selectedIngredients && this.selectedIngredients[ingredientIndex]) {

      const { [ingredientIndex]: _, ...newSelectedIngredients } = this.selectedIngredients;

      if (Object.keys(newSelectedIngredients).length === 0) {

        this.selectedIngredients = null;

      } else {

        this.selectedIngredients = newSelectedIngredients;
      }

    } else if (this.selectedIngredients && Object.keys(this.selectedIngredients).length === 0) {
      // if there is not any ingredients then set it to null, this is because if there is not any
      // ingredient, the selectedIngredients will be equal to an empty object and an empty object
      // is not a nulish value, so remember that we need to be able to set the selectedIngredients
      // to a nulish value in order to be able to disable the delete button in the shopping edit
      // if there is not any selected ingredient. This functionality is required so in this way,
      // that delete button only can be used if there is an ingredient selected.

      this.selectedIngredients = null;

    } else if (this.selectedIngredients && this.selectedIngredients[ingredientIndex] === undefined) {

      // Append the new ingredient to the list if the selectedIngredients is different to null,
      // meaning that the selectedIngredients already have others ingredients.

      this.selectedIngredients = {
        [ingredientIndex]: ingredient,
        ...this.selectedIngredients
      };

    } else if (!this.selectedIngredients) {

      // If selectedIngredients is null, then create the object with the new ingredient.
      this.selectedIngredients = {
        [ingredientIndex]: ingredient
      };
    }
  }

  onIngredientsDeleted(): void {

    this.selectedIngredients = null;
  }
}
