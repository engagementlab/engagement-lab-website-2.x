import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
    let component: ProjectArchiveComponent;
    let fixture: ComponentFixture<ProjectArchiveComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectArchiveComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectArchiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
