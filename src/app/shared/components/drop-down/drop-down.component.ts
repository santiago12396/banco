import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  editProduct() {
    this.onEdit.emit();
    this.isOpen = false;
  }

  deleteProduct() {
    this.onDelete.emit();
    this.isOpen = false;
  }
}
