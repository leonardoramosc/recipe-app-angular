import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentLayout: 'recipes' | 'shopping-list' = 'recipes';

  constructor() {}

  ngOnInit(): void {
  }

  onSelectedItem(item: 'recipes' | 'shopping-list'): void {
    this.currentLayout = item;
  }
}
