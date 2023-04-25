import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCardSectionComponent } from './show-card-section.component';

describe('ShowCardSectionComponent', () => {
  let component: ShowCardSectionComponent;
  let fixture: ComponentFixture<ShowCardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCardSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
