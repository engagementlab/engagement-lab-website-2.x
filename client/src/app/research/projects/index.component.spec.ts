import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectIndexComponent } from './index.component';

describe('ProjectIndexComponent', () => {
    let component: ProjectIndexComponent;
    let fixture: ComponentFixture<ProjectIndexComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectIndexComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
