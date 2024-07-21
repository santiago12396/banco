import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display the title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.dialog__body p')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  test('should emit onClosed event when backdrop is clicked', () => {
    jest.spyOn(component.onClosed, 'emit');

    const backdrop = fixture.debugElement.query(By.css('.dialog__backdrop'));
    backdrop.triggerEventHandler('click', null);

    expect(component.onClosed.emit).toHaveBeenCalled();
  });

  test('should emit onClosed event when cancel button is clicked', () => {
    jest.spyOn(component.onClosed, 'emit');

    const cancelButton = fixture.debugElement.query(By.css('.dialog__btn-cancel'));
    cancelButton.triggerEventHandler('click', null);

    expect(component.onClosed.emit).toHaveBeenCalled();
  });

  test('should emit onConfirmed event when confirm button is clicked', () => {
    jest.spyOn(component.onConfirmed, 'emit');

    const confirmButton = fixture.debugElement.query(By.css('.dialog__btn-confirm'));
    confirmButton.triggerEventHandler('click', null);

    expect(component.onConfirmed.emit).toHaveBeenCalled();
  });
});
