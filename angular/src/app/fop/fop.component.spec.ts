import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FopComponent } from './fop.component';

describe('FopComponent', () => {
  let component: FopComponent;
  let fixture: ComponentFixture<FopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
