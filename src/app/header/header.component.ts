import { Component, EventEmitter, OnInit, Output } from '@angular/core';

type Items = 'recipes' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Output() selectedItem = new EventEmitter<Items>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectItem(item: Items): void {
    this.selectedItem.emit(item);
  }

}
