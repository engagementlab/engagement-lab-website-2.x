import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import {
    ActivatedRoute, Router
} from '@angular/router';
import {
    DataService
} from '../utils/data.service';

import { TweenLite } from 'gsap';
import * as ismobile from 'ismobilejs';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    public content: any;
    public next: any;
    public previous: any;
    public hidden: boolean = true;
    public isPhone: boolean;
    
    private bgEndPerc: number;
    
    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;
    
    constructor(private _dataSvc: DataService, private _route: ActivatedRoute, private _router: Router) {
        
        this.isPhone = ismobile.phone;
        this._route.params.subscribe(params => {

            this._dataSvc.getDataForUrl('events/get/' + params['key']).subscribe(response => {
                this.setContent(response);
                this.hidden = false;
            });

        });

    }

    ngOnInit() {}

    ngAfterViewChecked() {

        this.setBgHeight();

    }

    ngOnDestroy() {

      // Skip bg fade out if going to other event
      if (this._router.url.split('/events')[1])
        return;

      // Undo bg gradient
      let color = '247, 41, 35'
      let alpha = {
          a: 1
      };
      TweenLite.to(alpha, 1, {
          a: '-=1',
          onUpdate: () => {
              document.body.style.backgroundImage = 'linear-gradient(to bottom, rgba(' + color + ',' + alpha.a + ' ) 0%, rgba(' + color + ',' + alpha.a + ') ' + this.bgEndPerc + '%, white ' + this.bgEndPerc + '%, white 100%)';
          }
      });
      
    }

    setContent(data: any) {

        let color = '247, 41, 35';

        this.content = data.event;
        this.next = data.next;
        this.previous = data.prev;

        // Slight timeout of 0 hack to allow page content to load in
        setTimeout(() => {

            // Skip bg fade if coming from other event, only adjust height
            if(this._dataSvc.previousUrl.split('/events')[1]) {
                document.body.style.backgroundImage = 'linear-gradient(to bottom, rgba(' + color + ', 1) 0%, rgba(' + color + ', 1) ' + this.bgEndPerc + '%, white ' + this.bgEndPerc + '%, white 100%)';
                return;
            }

            var alpha = {
                a: 0
            };

            TweenLite.to(alpha, 1, {
                a: '+=1',
                onUpdate: () => {
                    // Set bg to generated gradient
                    document.body.style.backgroundImage = 'linear-gradient(to bottom, rgba(' + color + ',' + alpha.a + ' ) 0%, rgba(' + color + ',' + alpha.a + ') ' + this.bgEndPerc + '%, white ' + this.bgEndPerc + '%, white 100%)';
                }
            });

        }, 0);

    }

    setBgHeight() {

        if (this.backgroundEnd === undefined) return;

        let endY = this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight;
        let windowHeight = document.body.clientHeight;
        this.bgEndPerc = (endY / windowHeight) * 100;

    }

}
