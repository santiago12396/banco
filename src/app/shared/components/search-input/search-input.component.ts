import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  searchTerm = signal('');

  @Output() onSearchTerm = new EventEmitter<string>();

  handleChangeSearchTerm(event: string) {
    this.onSearchTerm.emit(event);
  }
}
