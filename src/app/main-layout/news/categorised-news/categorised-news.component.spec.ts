import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorisedNewsComponent } from './categorised-news.component';

describe('CategorisedNewsComponent', () => {
  let component: CategorisedNewsComponent;
  let fixture: ComponentFixture<CategorisedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorisedNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorisedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
