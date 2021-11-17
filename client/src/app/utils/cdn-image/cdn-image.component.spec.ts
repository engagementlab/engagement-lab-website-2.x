import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CdnImageComponent } from './cdn-image.component';

describe('CdnImageComponent', () => {
  let component: CdnImageComponent;
  let fixture: ComponentFixture<CdnImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CdnImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdnImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
