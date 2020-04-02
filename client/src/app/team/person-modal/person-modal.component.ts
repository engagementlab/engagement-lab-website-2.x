import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'person-modal',
    templateUrl: './person-modal.component.html',
    styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent {
    @Input() person: any;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor() {}

    public closeModal() {
        this.onClose.emit();
    }
}
