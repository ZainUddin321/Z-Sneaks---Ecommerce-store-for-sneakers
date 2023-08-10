import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSecondSectionComponent } from './home-page-second-section.component';

describe('HomePageSecondSectionComponent', () => {
  let component: HomePageSecondSectionComponent;
  let fixture: ComponentFixture<HomePageSecondSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomePageSecondSectionComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSecondSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
