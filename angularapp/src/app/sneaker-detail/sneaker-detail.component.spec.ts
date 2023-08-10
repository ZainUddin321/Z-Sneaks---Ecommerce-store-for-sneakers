import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerDetailComponent } from './sneaker-detail.component';

describe('SneakerDetailComponent', () => {
  let component: SneakerDetailComponent;
  let fixture: ComponentFixture<SneakerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SneakerDetailComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SneakerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
