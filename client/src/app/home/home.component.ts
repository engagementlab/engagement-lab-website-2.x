import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';
import * as paper from 'paper';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public content: any;
    public latestEvent: any;
    public tagline: string;

    public isPhone: boolean;

    @ViewChildren('initiativeList') initiativeList: QueryList<any>;

    @ViewChild('canvasElement') canvasElement: ElementRef;
    @ViewChild('pattern1') pattern1: ElementRef;
    @ViewChild('pattern2') pattern2: ElementRef;
    @ViewChild('pattern3') pattern3: ElementRef;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        this.content = await this._dataSvc.getSet('homepage');

        this.drawArt();
    }

    drawArt() {
        setTimeout(() => {
            const _paper = new paper.PaperScope();
            _paper.setup(this.canvasElement.nativeElement);

            const MOUSE_RADIUS = 90;
            const ORBIT_RADIUS = 70;
            const FPS = 10;

            const figures = [],
                paths: paper.Path[] = [],
                prevPathPositions = [],
                circles = [],
                patterns = [],
                offsets = [],
                mouseTool = new paper.Tool();
            let mousePos: paper.Point,
                mouseShape = new paper.Shape.Circle(new paper.Point(-400, -4000), MOUSE_RADIUS),
                mouseOffsets = [],
                followMouse = false,
                resume = 0;
            mouseShape.fillColor = new paper.Color('black');

            mouseTool.onMouseMove = (evt: paper.ToolEvent) => {
                if (followMouse) {
                    mousePos = evt.point;
                    mouseShape.position = mousePos;
                }
            };

            const boundsRect = new paper.Shape.Rectangle(
                new paper.Point(52, 52),
                new paper.Point(_paper.view.bounds.bottomRight.subtract(52)),
            );
            boundsRect.addChild(mouseShape);
            _paper.project.activeLayer.addChild(boundsRect);

            _paper.view.on('mouseenter', () => {
                followMouse = true;
                resume = 0;

                _.each(paths, (path, i) => {
                    prevPathPositions[i] = path.position;
                });

                mouseOffsets = _.times(6, () => {
                    return _.random(-250, 250);
                });
            });
            _paper.view.on('mouseleave', () => {
                followMouse = false;
                resume = 6;
            });

            figures[0] = {
                x: 1200,
                y: 110,
                limitX: 150,
                color: '#00ab9e',
                points: _.times(10, () => {
                    return new paper.Point(_.random(150, 300), _.random(110, 250));
                }),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
                orbit: 0.5 * 0.5 * Math.random(),
            };
            figures[1] = {
                x: 1270,
                y: 350,
                limitX: 150,
                color: '#f72923',
                points: _.times(10, () => {
                    return new paper.Point(_.random(110, 230), _.random(350, 550));
                }),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
                orbit: ORBIT_RADIUS * 0.5 + ORBIT_RADIUS * 0.5 * Math.random(),
            };
            figures[2] = {
                x: 500,
                y: 250,
                limitX: 350,
                color: '#f6a536',
                points: _.times(10, () => {
                    return new paper.Point(_.random(620, 700), _.random(150, 320));
                }),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
                orbit: 0.5 * 0.5 * Math.random(),
            };

            _.each(figures, (figure, i: number) => {
                // Create all paths and circles
                paths[i] = new paper.Path.Circle({ center: [figure.x, figure.y], radius: 52 });
                paths[i].strokeColor = '#000';
                paths[i].strokeWidth = 1;
                // _.times(6, n => paths[i].divideAt(n));

                _.each(paths[i].curves, c => {
                    c.point1 = new paper.Point(c.point1.x + _.random(-10, 10), c.point1.y + _.random(-20, 20));
                });
                paths[i].smooth();
                console.log(paths[i].curves);

                offsets[i] = 0;

                circles[i] = new paper.Path.Circle(new paper.Point(figure.x, figure.y), 104);
                // circles[i].fillColor = figure.color;
                circles[i].blendMode = 'difference';

                // Circle movement
                circles[i].onFrame = evt => {
                    if (resume > 0) {
                        const deltaX = (prevPathPositions[i].x - paths[i].position.x) * 0.05;
                        const deltaY = (prevPathPositions[i].y - paths[i].position.y) * 0.05;

                        paths[i].translate(new paper.Point(deltaX, deltaY));

                        if (
                            Math.abs(prevPathPositions[i].x - paths[i].position.x) <= 0.0 &&
                            Math.abs(prevPathPositions[i].y - paths[i].position.y) <= 0.0
                        )
                            resume--;
                    }

                    if (offsets[i] < paths[i].length) {
                        circles[i].position = paths[i].getPointAt(offsets[i]);
                        offsets[i] += evt.delta * FPS;
                    } else offsets[i] = 0;

                    if (followMouse) {
                        // console.log(circles[i].position.subtract(mousePos).y);
                        const distance = new paper.Point(circles[i].position.subtract(mousePos));
                        // figures[i].momentum = figures[i].momentum.subtract(distance.divide(3));
                        figures[i].momentum = distance.multiply(0.007);

                        const newPosition = paths[i].position.add(figures[i].momentum);
                        const predictedBounds = paths[i].bounds.include(newPosition).expand(2);
                        const pathOutside = !boundsRect.bounds.contains(predictedBounds);

                        figures[i].wasInBounds = !pathOutside;
                        if (pathOutside) {
                            figures[i].momentum = 0;
                            paths[i].position = figures[i].lastInBoundsPos;
                            return;
                        }
                        figures[i].lastInBoundsPos = newPosition;
                        paths[i].position = newPosition;
                    }
                };
                boundsRect.addChild(circles[i]);
                boundsRect.addChild(paths[i]);
            });

            _.each(figures, (figure, i: number) => {
                i = i + 3;

                offsets[i] = 0;
                paths[i] = new paper.Path(figure.points.reverse());
                paths[i].closed = true;
                paths[i].smooth();

                patterns[i - 3] = _paper.project.importSVG(svgs[i - 3]);
                patterns[i - 3].position = new paper.Point(figure.x, figure.y);

                patterns[i - 3].onFrame = evt => {
                    if (resume > 0) {
                        const deltaX = (prevPathPositions[i].x - paths[i].position.x) * 0.05;
                        const deltaY = (prevPathPositions[i].y - paths[i].position.y) * 0.05;

                        paths[i].translate(new paper.Point(deltaX, deltaY));

                        if (
                            Math.abs(prevPathPositions[i].x - paths[i].position.x) <= 0.0 &&
                            Math.abs(prevPathPositions[i].y - paths[i].position.y) <= 0.0
                        )
                            resume--;
                    }

                    if (offsets[i] < paths[i].length) {
                        patterns[i - 3].position = paths[i].getPointAt(offsets[i]);
                        offsets[i] += evt.delta * FPS;
                    } else offsets[i] = 0;

                    patterns[i - 3].rotate(0.15 * evt.delta * fps);

                    if (followMouse) {
                        let delta = (mousePos.x - paths[i].position.x) * 0.005;
                        let deltaY = (mousePos.y - paths[i].position.y) * 0.005;
                        const space = Math.abs(mousePos.x - paths[i].position.x);
                        const spaceY = Math.abs(mousePos.y - paths[i].position.y);

                        if (space < 1150) delta = 0;
                        // if (spaceY < 1150)
                        deltaY = 0;

                        const newTranslate = paths[i].position.x + delta;
                        console.log(space);
                        if (newTranslate > Math.abs(figures[i].x)) paths[i].translate(new paper.Point(delta, deltaY));
                    }
                };
            });

            this.pattern1.nativeElement.remove();
            this.pattern2.nativeElement.remove();
            this.pattern3.nativeElement.remove();
        }, 100);
    }
}
