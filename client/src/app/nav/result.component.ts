import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'search-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  @Input() content: string;
  @Input() type: string;
  @Input() key: string;
  
  private html: SafeHtml;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    this.html = this._sanitizer.bypassSecurityTrustHtml(this.content);
    
  }

}
