import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalChatComponent } from './hospital-chat.component';

describe('HospitalChatComponent', () => {
  let component: HospitalChatComponent;
  let fixture: ComponentFixture<HospitalChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
