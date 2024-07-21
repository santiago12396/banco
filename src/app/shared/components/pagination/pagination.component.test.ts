import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display the current page, total pages, and total products', () => {
    component.currentPage = 1;
    component.totalPages = 5;
    component.totalProducts = 100;

    const expectedResp = `${component.currentPage} / ${component.totalPages} de ${component.totalProducts} productos`;

    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.textContent).toContain(expectedResp);
  });

  test('should display the current page, total pages, and total products', () => {
    component.currentPage = 1;
    component.totalPages = 5;
    component.totalProducts = 100;

    const expectedResp = `${component.currentPage} / ${component.totalPages} de ${component.totalProducts} productos`;

    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.textContent).toContain(expectedResp);
  });

  test('should not emit if on first page when prev button clicked', () => {
    component.currentPage = 1;
    component.totalPages = 5;

    jest.spyOn(component.onPageCurrent, 'emit');

    const prevButton = fixture.debugElement.query(By.css('.pagination__prev'));
    prevButton.triggerEventHandler('click', null);

    expect(component.onPageCurrent.emit).not.toHaveBeenCalled();
  });

  test('should not emit if on last page when next button clicked', () => {
    component.currentPage = 5;
    component.totalPages = 5;

    jest.spyOn(component.onPageCurrent, 'emit');

    const prevButton = fixture.debugElement.query(By.css('.pagination__next'));
    prevButton.triggerEventHandler('click', null);

    expect(component.onPageCurrent.emit).not.toHaveBeenCalled();
  });


  test('should emit onPageCurrent (currentPage + 1) when next button clicked', () => {
    component.currentPage = 1;
    component.totalPages = 5;

    jest.spyOn(component.onPageCurrent, 'emit');

    const nextButton = fixture.debugElement.query(By.css('.pagination__next'));
    nextButton.triggerEventHandler('click', null);

    expect(component.onPageCurrent.emit).toHaveBeenCalledWith(2);
  });


  test('should emit onPageCurrent (currentPage - 1) when prev button clicked', () => {
    component.currentPage = 2;
    component.totalPages = 5;

    jest.spyOn(component.onPageCurrent, 'emit');

    const nextButton = fixture.debugElement.query(By.css('.pagination__prev'));
    nextButton.triggerEventHandler('click', null);

    expect(component.onPageCurrent.emit).toHaveBeenCalledWith(1);
  });

});
