import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchInputComponent } from './search-input.component';
import { By } from '@angular/platform-browser';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit the search term on input change', () => {
    const searchTerm = 'product 1';
    jest.spyOn(component.onSearchTerm, 'emit');

    const inputSearch = fixture.debugElement.query(By.css('input[type="search"]')).nativeElement;
    inputSearch.value = searchTerm;
    inputSearch.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.onSearchTerm.emit).toHaveBeenCalledWith(searchTerm);
  });

});
