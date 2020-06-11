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
    public errors: any;
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
        const query = `
            {
                allAboutPages {
                    tagline
                }
                recentEvents {
                    name
                    key
                    date
                    images {
                        public_id
                    }
                }
                allNewsItems(featured: true) {
                    title
                    url
                    image {
                        public_id
                    }
                }
            }
        `;
        this.content = await this._dataSvc.getSet('homepage', query);
        this.drawArt();
    }

    drawArt() {
        setTimeout(() => {
            const _paper = new paper.PaperScope();
            _paper.setup(this.canvasElement.nativeElement);

            const MOUSE_RADIUS = 90;
            const CIRCLE_RADIUS = 104;
            const FPS = 10;
            const SVGS = [this.pattern1.nativeElement, this.pattern2.nativeElement, this.pattern3.nativeElement];

            const figures = [],
                paths: paper.Path[] = [],
                prevPathPositions = [],
                circles = [],
                patterns = [],
                offsets = [],
                mouseTool = new paper.Tool();

            let mousePos: paper.Point,
                mouseOffsets = [],
                followMouse = false,
                resume = 0;
            mouseTool.onMouseMove = (evt: paper.ToolEvent) => {
                if (followMouse) {
                    mousePos = evt.point;
                }
            };

            const boundsRect = new paper.Shape.Rectangle(
                new paper.Point(CIRCLE_RADIUS / 2, CIRCLE_RADIUS / 2),
                new paper.Point(_paper.view.bounds.bottomRight.subtract(CIRCLE_RADIUS / 2)),
            );
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
                color: '#00ab9e',
                points: _.times(10, () => {
                    return new paper.Point(_.random(150, 300), _.random(110, 250));
                }),
                center: new paper.Point(800, 250),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
            };
            figures[1] = {
                color: '#f72923',
                points: _.times(10, () => {
                    return new paper.Point(_.random(110, 230), _.random(350, 550));
                }),
                center: new paper.Point(770, 550),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
            };
            figures[2] = {
                color: '#f6a536',
                points: _.times(10, () => {
                    return new paper.Point(_.random(1620, 1700), _.random(150, 320));
                }),
                center: new paper.Point(1100, 350),
                momentum: new paper.Point(0, 0),
                lastInBoundsPos: new paper.Point(0, 0),
            };

            _.each(figures, (figure, i: number) => {
                // Create all paths and circles
                paths[i] = new paper.Path.Circle({
                    center: [figure.center.x, figure.center.y],
                    radius: CIRCLE_RADIUS / 2,
                });
                _.times(6, n => paths[i].divideAt(n));

                _.each(paths[i].curves, c => {
                    c.point1 = new paper.Point(c.point1.x + _.random(-10, 10), c.point1.y + _.random(-20, 20));
                });
                paths[i].smooth();
                console.log(paths[i].curves);

                offsets[i] = 0;

                circles[i] = new paper.Path.Circle(figure.center, CIRCLE_RADIUS);
                circles[i].fillColor = figure.color;
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
                            resume -= evt.delta;
                    }

                    if (offsets[i] < paths[i].length) {
                        circles[i].position = paths[i].getPointAt(offsets[i]);
                        offsets[i] += evt.delta * FPS;
                    } else offsets[i] = 0;

                    if (followMouse) {
                        const distance = new paper.Point(circles[i].position.subtract(mousePos));
                        figures[i].momentum = figures[i].momentum.subtract(distance.divide(3));
                        figures[i].momentum = distance.multiply(0.005);

                        const newPosition = paths[i].position.add(figures[i].momentum);
                        const predictedBounds = paths[i].bounds.include(newPosition).expand(2);
                        let pathOutside = !boundsRect.bounds.contains(predictedBounds);

                        figures[i].wasInBounds = !pathOutside;
                        const distanceCenter = newPosition.subtract(figures[i].center);
                        if (!pathOutside) {
                            pathOutside =
                                Math.abs(distanceCenter.y) >= CIRCLE_RADIUS ||
                                Math.abs(distanceCenter.x) >= CIRCLE_RADIUS;
                        }

                        // Disallow movement outside specified radius
                        // Reset momentum and lock last position if bounds or radius hit
                        if (pathOutside) {
                            figures[i].momentum = new paper.Point(0, 0);
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
            const patternCurvePoints = {};
            const patternCurves = {};

            _.each(figures, (figure, i: number) => {
                i = i + 3;

                offsets[i] = 0;
                const path = new paper.Path.Circle({
                    center: figure.center,
                    radius: CIRCLE_RADIUS / 3,
                });
                _.each(path.curves, c => {
                    c.point1 = new paper.Point(c.point1.x + _.random(-20, 20), c.point1.y + _.random(-20, 20));
                });
                path.smooth();
                paths.push(path);

                let thisPattern = patterns[i - 3];
                thisPattern = _paper.project.importSVG(SVGS[i - 3]);
                thisPattern.position = figure.center;
                thisPattern.clipped = false;
                // thisPattern.blendMode = 'screen';
                boundsRect.addChild(thisPattern);

                patternCurvePoints[i - 3] = [];
                patternCurves[i - 3] = thisPattern.children
                    .filter(a => {
                        return a._type !== 'rectangle';
                    })
                    .flatMap(a => {
                        if (a !== undefined) return a.segments;
                    })
                    .flatMap(a => {
                        if (a !== undefined) {
                            patternCurvePoints[i - 3].push(a.curve.point1);
                            return a.curve;
                        }
                    });

                thisPattern.onFrame = evt => {
                    // if (resume > 0) {
                    //     const deltaX = (prevPathPositions[i].x - path.position.x) * 0.05;
                    //     const deltaY = (prevPathPositions[i].y - path.position.y) * 0.05;

                    //     path.translate(new paper.Point(deltaX, deltaY));

                    //     if (
                    //         Math.abs(prevPathPositions[i].x - path.position.x) <= 0.0 &&
                    //         Math.abs(prevPathPositions[i].y - path.position.y) <= 0.0
                    //     )
                    //         resume--;
                    // }

                    if (offsets[i] < path.length) {
                        thisPattern.position = path.getPointAt(offsets[i]);
                        offsets[i] += evt.delta * (FPS * _.random(0.5, 2));
                    } else offsets[i] = 0;

                    // thisPattern.rotate(evt.delta * (FPS * _.random(0.1, 0.5)));
                    // thisPattern.shear(_.random(-0.01, 0.05));

                    // EXPERIMENTAL: animate all patterns with sine function
                    /* for (let ci = 0; ci < patternCurves[i - 3].length; ci += 5) {
                        const curve = patternCurves[i - 3][ci];
                        if (curve && patternCurvePoints[i - 3][ci]) {
                            const sinus = Math.sin(evt.time + ci);
                            curve.point1.x = patternCurvePoints[i - 3][ci].x -= sinus / _.random(1, 15);
                            curve.point1.y = patternCurvePoints[i - 3][ci].y += sinus / _.random(1, 15);
                        }
                    }
                    */
                    // if (followMouse) {
                    //     let delta = (mousePos.x - path.position.x) * 0.005;
                    //     let deltaY = (mousePos.y - path.position.y) * 0.005;
                    //     const space = Math.abs(mousePos.x - path.position.x);
                    //     const spaceY = Math.abs(mousePos.y - path.position.y);

                    //     if (space < 1150) delta = 0;
                    //     // if (spaceY < 1150)
                    //     deltaY = 0;

                    //     // const newTranslate = path.position.x + delta;
                    //     // console.log(space);
                    //     // if (newTranslate > Math.abs(figures[i].x)) path.translate(new paper.Point(delta, deltaY));
                    // }
                };
            });

            this.pattern1.nativeElement.remove();
            this.pattern2.nativeElement.remove();
            this.pattern3.nativeElement.remove();
        }, 100);
    }
}
