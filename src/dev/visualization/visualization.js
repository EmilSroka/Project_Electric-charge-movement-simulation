import onResize from '../general/onResizeEvent';
import { UnitTranslator } from './unitTranslator';
import { Painter } from './painter';
import { Circle, Coordinates } from '../general/geometrics';

const WIDTH = 1920;
const PART_OF_PAGE_WIDTH = 0.9;
const CANVAS_RATIO = 9 / 16;

export class Visualization {
  constructor(selector, entityManager){
    this.canvas = document.querySelector(selector);
    this.entityManager = entityManager;
    this.unitTranslator = new UnitTranslator(this.canvas, WIDTH, CANVAS_RATIO);
    this.painter = new Painter(this.canvas, this.unitTranslator);

    
    this.updateSize();
    this.unitTranslator.recalc();

    onResize.subscribe(() => {
      this.updateSize();
      this.unitTranslator.recalc();
    }); 

    this.nextFrame = this.nextFrame.bind(this);
    this.nextFrame();
  }

  updateSize(){
    const width = PART_OF_PAGE_WIDTH * window.innerWidth;
    this.canvas.width =  width;
    this.canvas.height = CANVAS_RATIO * width;
  }

  nextFrame(){
    this.painter.drawCircle(new Circle(new Coordinates(0,0), 5000), 'white', 'white'); // TODO clean

    for(let view of this.entityManager.views()){
      view.draw(this.painter);
    }

    window.requestAnimationFrame(this.nextFrame);
  }
}