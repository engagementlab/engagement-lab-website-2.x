import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'person-modal',
    templateUrl: './person-modal.component.html',
    styleUrls: ['./person-modal.component.scss'],

    animations: [
        trigger('projectSelectAnimation', [
            transition(':enter', [
                animate('.2s ease-in-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('.2s ease-in-out', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class PersonModalComponent implements OnInit {
    public projects: any[];
    public selectedProject: any;

    @Input() person: any;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        const personProjects = this.person['projects'];
        if (!personProjects || personProjects.length < 1) return;
        this.projects = personProjects.concat(this.person['mdProjects']);
        this.selectedProject = this.projects[0];
    }

    public closeModal() {
        this.onClose.emit();
    }

    public projectClick(index: number) {
        this.selectedProject = undefined;
        this.selectedProject = this.projects[index];
    }

    public getProjectImg(project: any) {
        return project.thumb
            ? project.thumb.public_id
            : project.image.public_id;
    }
}
