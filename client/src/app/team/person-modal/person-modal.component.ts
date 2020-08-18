import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { projects } from 'paper';

@Component({
    selector: 'person-modal',
    templateUrl: './person-modal.component.html',
    styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent implements OnInit {
    public projects: any[];
    public selectedProject: any;

    @Input() person: any;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        if (!this.projects || this.projects.length < 1) return;
        this.projects = this.person['projects'].concat(
            this.person['mdProjects'],
        );
        this.selectedProject = this.projects[0];
    }

    public closeModal() {
        this.onClose.emit();
    }

    public projectClick(index: number) {
        this.selectedProject = undefined;
        this.selectedProject = this.projects[index];
    }
}
