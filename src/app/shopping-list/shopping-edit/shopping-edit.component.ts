import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Renderer2 } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('nameInput', { static: true }) nameInputRef!: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef!: ElementRef;

  ngOnInit(): void {
  }

  addIngredient(e: Event): void {
    e.preventDefault();
    const nameInput = this.nameInputRef.nativeElement as HTMLInputElement;
    const amountInput = this.amountInputRef.nativeElement as HTMLInputElement;

    this.ingredientAdded.emit({
      name: nameInput.value,
      amount: parseFloat(amountInput.value)
    });

    // Clear the inputs
    this.renderer.setProperty(nameInput, 'value', '');
    this.renderer.setProperty(amountInput, 'value', '');
  }

}
