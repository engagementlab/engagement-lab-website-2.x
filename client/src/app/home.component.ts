import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './utils/data.service';

import * as _ from 'underscore';
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
  public tagline: string;

  public isPhone: boolean;

  @ViewChildren('initiativeList') initiativeList: QueryList<any>;

  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('pattern1') pattern1: ElementRef;
  @ViewChild('pattern2') pattern2: ElementRef;
  @ViewChild('pattern3') pattern3: ElementRef;

  constructor(private _dataSvc: DataService) {}

  ngOnInit() {

    this._dataSvc.retrieve('homepage').subscribe(response => {
     
      this.initiatives = response.initiatives;    
      this.featuredProjects = response.projects;    
      this.events = response.events;    
      this.tagline = response.tagline;

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
      paths: paper.Path[] = [],
      prevPathPositions = [],
  		circles = [],
  		patterns = [],
      offsets = [],
      mouseOffsets = [],
      mouseTool = new paper.Tool(),
      mousePos: paper.Point,
      followMouse = false,
      resume = 0;
      
var RADIUS = 70;
  	const svgs = [
  			this.pattern1.nativeElement,
  			this.pattern2.nativeElement,
  			this.pattern3.nativeElement
  		],
  		fps = 10;
    
    mouseTool.onMouseMove = (evt: paper.ToolEvent) => {
      if(followMouse)
        mousePos = evt.point;
    };

    _paper.view.on('mouseenter', () => {
      followMouse = true;
      resume = 0;

      _.each(paths, (path, i) => {

        prevPathPositions[i] = path.position;

      });

      mouseOffsets = _.times(6, () => { return _.random(-250, 250); });
    });
    _paper.view.on('mouseleave', () => {
      followMouse = false;
      resume = 6;
    });
    
  	figures[0] = {
  		x: 300,
  		y: 110,
  		color: '#00ab9e',
  		points: _.times(10, () =>
      {
        return new paper.Point(_.random(150, 300), _.random(110, 250))
      }),
      lastPatternPos: new paper.Point(0, 0),
      orbit: .5 * .5 * Math.random()
  	};
  	figures[1] = {
  		x: 270,
  		y: 350,
  		color: '#f72923',
  		points: _.times(10, () =>
  		{
  			return new paper.Point(_.random(110, 230), _.random(350, 550))
  		}),
      lastPatternPos: new paper.Point(0, 0),
      orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
  	};
  	figures[2] = {
  		x: 500,
  		y: 250,
  		color: '#f6a536',
  		points: _.times(10, () =>
  		{
  			return new paper.Point(_.random(450, 550), _.random(150, 320))
  		}),
      lastPatternPos: new paper.Point(0, 0),
      orbit: .5 * .5 * Math.random()
  	};

  	_.each(figures, (figure, i: number) =>
  	{

  		paths[i] = new paper.Path(figure.points);
      paths[i].smooth();

  		offsets[i] = 0;

  		circles[i] = new paper.Path.Circle(new paper.Point(figure.x, figure.y), 104);
  		circles[i].fillColor = figure.color;
  		circles[i].blendMode = 'multiply';
  		circles[i].onFrame = (evt) =>
  		{
        
        if(resume > 0) {

          let deltaX = (prevPathPositions[i].x - paths[i].position.x) * .05;
          let deltaY = (prevPathPositions[i].y - paths[i].position.y) * .05;

          paths[i].translate(new paper.Point(deltaX, deltaY));

          if(Math.abs(prevPathPositions[i].x - paths[i].position.x) <= 0.000 &&
          Math.abs(prevPathPositions[i].y - paths[i].position.y) <= 0.000)
            resume--;

        }
  
          if (offsets[i] < paths[i].length)
          {
            circles[i].position = paths[i].getPointAt(offsets[i])
            offsets[i] += evt.delta * fps;
          }
          else
            offsets[i] = 0;
            
          if(followMouse) {

            var delta = (mousePos.x - paths[i].position.x)*.005;
            var space = Math.abs(mousePos.x - paths[i].position.x)
            var deltaY = (mousePos.y - paths[i].position.y)*.005;
            var spaceY = Math.abs(mousePos.y - paths[i].position.y)

            if(space < 150) delta = 0; 
            if(spaceY < 150) deltaY = 0; 

            paths[i].translate(new paper.Point(delta, deltaY));

          }

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
      
  		patterns[i - 3].onFrame = (evt) =>
  		{
        if(resume > 0) {
          
          let deltaX = (prevPathPositions[i].x - paths[i].position.x) * .05;
          let deltaY = (prevPathPositions[i].y - paths[i].position.y) * .05;

          paths[i].translate(new paper.Point(deltaX, deltaY));

          if(Math.abs(prevPathPositions[i].x - paths[i].position.x) <= 0.000 &&
          Math.abs(prevPathPositions[i].y - paths[i].position.y) <= 0.000)
            resume--;

        }

          if (offsets[i] < paths[i].length)
          {
            patterns[i - 3].position = paths[i].getPointAt(offsets[i]);
            offsets[i] += evt.delta * fps;
          }
          else
            offsets[i] = 0;
            
          patterns[i - 3].rotate(.15*evt.delta*fps);

          if(followMouse) {
            var delta = (mousePos.x - paths[i].position.x)*.005;
            var space = Math.abs(mousePos.x - paths[i].position.x)
            var deltaY = (mousePos.y - paths[i].position.y)*.005;
            var spaceY = Math.abs(mousePos.y - paths[i].position.y)

            if(space < 150) delta = 0; 
            if(spaceY < 150) deltaY = 0; 

            paths[i].translate(new paper.Point(delta, deltaY));
          }

      }

  	});

    // _paper.view.draw();
    
    this.pattern1.nativeElement.remove();
    this.pattern2.nativeElement.remove();
    this.pattern3.nativeElement.remove();
  }

}