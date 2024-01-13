import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdepComponent } from './userdep.component';

describe('UserdepComponent', () => {
  let component: UserdepComponent;
  let fixture: ComponentFixture<UserdepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
