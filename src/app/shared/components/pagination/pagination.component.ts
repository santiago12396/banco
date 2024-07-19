import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalProducts!: number;

  @Output() onPageCurrent = new EventEmitter<number>();

  handlePreviousPage() {
    if (this.currentPage > 1) {
      console.log('PREV');
      this.currentPage = this.currentPage - 1;
      this.onPageCurrent.emit(this.currentPage);
    }
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      console.log('NEXT');
      this.currentPage = this.currentPage + 1;
      this.onPageCurrent.emit(this.currentPage);
    }
  }
}
