import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Check if the user want to edit a recipe
    this.route.params.subscribe((params: Params) => {
      // if there is not any id param, it means that the user wants to add a new, otherwise wants to edit one.
      this.editMode = params.id !== undefined;
    });
  }

}
