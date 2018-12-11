import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  public url: string;

  constructor(_route: ActivatedRoute) { 
    _route.data.subscribe((data) => {
      this.url = data['externalUrl'];
    });
  }

  ngOnInit() {
  }

}
