import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownComponent } from './drop-down.component';
import { By } from '@angular/platform-browser';

describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should toggle the dropdown menu', () => {
    const icon = fixture.debugElement.query(By.css('.dropdown__icon'));
    icon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isOpen).toBeTruthy();
    let menu = fixture.debugElement.query(By.css('.dropdown__menu'));
    expect(menu).toBeTruthy();

    icon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isOpen).toBeFalsy();
    menu = fixture.debugElement.query(By.css('.dropdown__menu'));
    expect(menu).toBeNull();
  });

  test('should emit onEdit event and close the dropdown', () => {
    jest.spyOn(component.onEdit, 'emit');

    component.isOpen = true;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.dropdown__edit'));
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onEdit.emit).toHaveBeenCalled();
    expect(component.isOpen).toBeFalsy();
  });

  test('should emit onDelete event and close the dropdown', () => {
    jest.spyOn(component.onDelete, 'emit');

    component.isOpen = true;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.dropdown__delete'));
    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onDelete.emit).toHaveBeenCalled();
    expect(component.isOpen).toBeFalsy();
  });

});
