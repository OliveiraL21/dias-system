import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTiredMenuComponent } from './button-tired-menu.component';

describe('ButtonTiredMenuComponent', () => {
  let component: ButtonTiredMenuComponent;
  let fixture: ComponentFixture<ButtonTiredMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTiredMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTiredMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
