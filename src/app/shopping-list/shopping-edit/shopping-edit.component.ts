import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingService: ShoppingService) { }

  ingredientsChangeSubs!: Subscription;

  form!: FormGroup;

  @Input() selectedIngredients!: { [index: number]: Ingredient } | null;

  @Input() areThereIngredients!: boolean;

  @Output() ingredientsDeleted = new EventEmitter();

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [Validators.required])
    });

    this.form.controls['name'].setValue('jamooon');

  }
  addIngredient(): void {

    this.shoppingService.addIngredient(this.form.value);

    this.form.reset();
  }

  deleteIngredients(): void {

    if (this.selectedIngredients) {
      this.shoppingService.deleteIngredients(this.selectedIngredients);
    }

    this.ingredientsDeleted.emit();

  }

  clearIngredients(): void {

    this.shoppingService.clearIngredients();
  }

}
