import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrArComponent } from './webxr-ar.component';

describe('WebxrArComponent', () => {
  let component: WebxrArComponent;
  let fixture: ComponentFixture<WebxrArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebxrArComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebxrArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
