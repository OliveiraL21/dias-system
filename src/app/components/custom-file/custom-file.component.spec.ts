import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFileComponent } from './custom-file.component';

describe('CustomFileComponent', () => {
  let component: CustomFileComponent;
  let fixture: ComponentFixture<CustomFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
