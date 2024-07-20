import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title = '';
  @Output() onClosed = new EventEmitter<void>();
  @Output() onConfirmed = new EventEmitter<void>();

  handleClose() {
    this.onClosed.emit();
  }

  handleConfirm() {
    this.onConfirmed.emit();
  }
}
