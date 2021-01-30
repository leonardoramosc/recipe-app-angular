import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentLayout: 'recipes' | 'shopping-list' = 'recipes';

  selectCurrentLayout(layout: 'recipes' | 'shopping-list'): void {
    this.currentLayout = layout;
  }
}
