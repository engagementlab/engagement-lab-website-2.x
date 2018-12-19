import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  
  @Input() pub: any;
  @Input() type: string;

  public iconWidth: number;
  public year: number;

  constructor() {}

  ngOnInit() {

      this.iconWidth = this.type === 'book' ? 37 : 50;
      this.year = new Date(this.pub.date).getFullYear();
      
  }

}
