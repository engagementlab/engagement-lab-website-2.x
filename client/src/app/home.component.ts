import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './utils/data.service';

import * as AOS from 'aos';
import * as _ from 'underscore';
import * as ismobile from 'ismobilejs';
import * as paper from 'paper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public initiatives: any[];
  public featuredProjects: any[];
  public events: any[];
  public latestEvent: any;

  public isPhone: boolean;

  @ViewChildren('initiativeList') initiativeList: QueryList<any>;

  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('pattern1') pattern1: ElementRef;
  @ViewChild('pattern2') pattern2: ElementRef;
  @ViewChild('pattern3') pattern3: ElementRef;

  constructor(private _dataSvc: DataService) {
    this.isPhone = ismobile.phone;
  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('homepage/get/').subscribe(response => {
     
      this.initiatives = response.initiatives;    
      this.featuredProjects = response.projects;    
      this.events = response.events;    

      this.latestEvent = response.events[response.events.length-1];

    });
  }

  ngAfterViewInit()  {

  	this.initiativeList.changes.subscribe(t =>
  	{
  		// AOS.init();
  	});

  	let _paper = new paper.PaperScope();
  	_paper.setup(this.canvasElement.nativeElement);

  	let figures = [],
  		paths = [],
  		circles = [],
  		patterns = [],
  		offsets = [];
  	const svgs = [
  			this.pattern1.nativeElement,
  			this.pattern2.nativeElement,
  			this.pattern3.nativeElement
  		],
  		fps = 10;

  	let arr
    
  	figures[0] = {
  		x: 300,
  		y: 110,
  		color: '#00ab9e',
  		points: _.times(10, () =>
      {
        return new paper.Point(_.random(150, 300), _.random(110, 250))
      })
  	};
  	figures[1] = {
  		x: 270,
  		y: 350,
  		color: '#f72923',
  		points: _.times(10, () =>
  		{
  			return new paper.Point(_.random(110, 230), _.random(350, 550))
  		})
  	};
  	figures[2] = {
  		x: 500,
  		y: 250,
  		color: '#f6a536',
  		points: _.times(10, () =>
  		{
  			return new paper.Point(_.random(450, 550), _.random(150, 320))
  		})
  	};

  	_.each(figures, (figure, i: number) =>
  	{

  		paths[i] = new paper.Path(figures[i].points);
  		paths[i].closed = true;
  		paths[i].smooth();

  		offsets[i] = 0;

  		circles[i] = new paper.Path.Circle(new paper.Point(figure.x, figure.y), 104);
  		circles[i].fillColor = figure.color;
  		circles[i].blendMode = 'multiply';
  		circles[i].onFrame = (evt) =>
  		{
  			if (offsets[i] < paths[i].length)
  			{
  				circles[i].position = paths[i].getPointAt(offsets[i]);
  				offsets[i] += evt.delta * fps;
  			}
  			else
  				offsets[i] = 0;
  		}
  		_paper.project.activeLayer.addChild(circles[i]);
  		_paper.project.activeLayer.addChild(paths[i]);

  	});

  	_.each(figures, (figure, i: number) =>
  	{

  		i = i + 3;

  		offsets[i] = 0;
  		paths[i] = new paper.Path(figure.points.reverse());
  		paths[i].closed = true;
  		paths[i].smooth();

  		patterns[i - 3] = _paper.project.importSVG(svgs[i - 3]);
      patterns[i - 3].position = new paper.Point(figure.x, figure.y);
  		// patterns[i - 3].blendMode = 'screen';
      
  		patterns[i - 3].onFrame = (evt) =>
  		{
  			if (offsets[i] < paths[i].length)
  			{
  				patterns[i - 3].position = paths[i].getPointAt(offsets[i]);
  				offsets[i] += evt.delta * fps;
  			}
  			else
          offsets[i] = 0;
          
          patterns[i - 3].rotate(.15*evt.delta*fps);
  		}

  	});

    _paper.view.draw();
    
    this.pattern1.nativeElement.remove();
    this.pattern2.nativeElement.remove();
    this.pattern3.nativeElement.remove();
  }

}