import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemsPerPageComponent } from './items-per-page.component';
import { FormsModule } from '@angular/forms';


describe('ItemsPerPageComponent', () => {
  let component: ItemsPerPageComponent;
  let fixture: ComponentFixture<ItemsPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ItemsPerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display initial number of items per page', () => {
    const spanElement = fixture.debugElement.query(By.css('.items-per-page span')).nativeElement;
    expect(spanElement.textContent).toContain('5 resultados');
  });

  test('should display the correct options in the select', () => {
    const options = fixture.debugElement.queryAll(By.css('select option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.value).toBe('5');
    expect(options[1].nativeElement.value).toBe('10');
    expect(options[2].nativeElement.value).toBe('20');
  });

  test('should emit (10) when select changes', () => {
    jest.spyOn(component.onItemsPerPage, 'emit');

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.onItemsPerPage.emit).toHaveBeenCalledWith(10);
    expect(component.itemsPerPage()).toBe(10);
  });

  test('should update itemsPerPage when handleChangeItemsPerPage called', () => {
    component.handleChangeItemsPerPage('20');
    fixture.detectChanges();
    expect(component.itemsPerPage()).toBe(20);
  });
});
