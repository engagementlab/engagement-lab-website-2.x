import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeopleGridComponent } from './people-grid.component';

describe('PeopleGridComponent', () => {
    let component: PeopleGridComponent;
    let fixture: ComponentFixture<PeopleGridComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PeopleGridComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PeopleGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
