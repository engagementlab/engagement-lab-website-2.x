import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  
  @Input() pub: any;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
