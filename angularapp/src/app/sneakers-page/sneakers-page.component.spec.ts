import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakersPageComponent } from './sneakers-page.component';

describe('SneakersPageComponent', () => {
  let component: SneakersPageComponent;
  let fixture: ComponentFixture<SneakersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SneakersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
