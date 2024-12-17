import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteNewsComponent } from './infinite-news.component';

describe('InfiniteNewsComponent', () => {
  let component: InfiniteNewsComponent;
  let fixture: ComponentFixture<InfiniteNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
