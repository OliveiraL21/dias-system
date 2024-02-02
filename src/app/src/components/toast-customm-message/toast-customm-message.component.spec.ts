import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastCustommMessageComponent } from './toast-customm-message.component';

describe('ToastCustommMessageComponent', () => {
  let component: ToastCustommMessageComponent;
  let fixture: ComponentFixture<ToastCustommMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastCustommMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastCustommMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
