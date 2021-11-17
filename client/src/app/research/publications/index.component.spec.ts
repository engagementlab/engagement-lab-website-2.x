import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicationIndexComponent } from './index.component';

describe('PublicationIndexComponent', () => {
    let component: PublicationIndexComponent;
    let fixture: ComponentFixture<PublicationIndexComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PublicationIndexComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicationIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
