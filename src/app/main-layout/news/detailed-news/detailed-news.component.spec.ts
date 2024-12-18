import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedNewsComponent } from './detailed-news.component';

describe('DetailedNewsComponent', () => {
  let component: DetailedNewsComponent;
  let fixture: ComponentFixture<DetailedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
