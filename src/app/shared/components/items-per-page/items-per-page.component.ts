import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-per-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './items-per-page.component.html',
  styleUrl: './items-per-page.component.scss'
})
export class ItemsPerPageComponent {

  @Output() onItemsPerPage = new EventEmitter<number>();

  options = signal(['5', '10', '20']);

  itemsPerPage = signal(5);

  handleChangeItemsPerPage(event: string) {
    const value = Number(event);
    this.itemsPerPage.set(value);
    this.onItemsPerPage.emit(value);
  }

}
