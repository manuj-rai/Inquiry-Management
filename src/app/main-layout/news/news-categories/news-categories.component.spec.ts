import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoriesComponent } from './news-categories.component';

describe('NewsCategoriesComponent', () => {
  let component: NewsCategoriesComponent;
  let fixture: ComponentFixture<NewsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
