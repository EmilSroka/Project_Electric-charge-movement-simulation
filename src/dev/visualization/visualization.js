import onResize from '../general/onResizeEvent';
import { UnitTranslator } from './unitTranslator';
import { Painter } from './painter';
import { Circle, Coordinates } from '../general/geometrics';
import { LIGHT_BLUE, getColor } from '../general/colors';
import { UIController } from './UIController';

const WIDTH = 1920;
const PART_OF_PAGE_WIDTH = 0.9;
const CANVAS_RATIO = 9 / 16;

export class Visualization {
  constructor(entityManager, painter){
    this.entityManager = entityManager;
    this.painter = painter;
    
    this.nextFrame = this.nextFrame.bind(this);
    this.nextFrame();
  }

  setEntityManager(entityManager){
    this.entityManager = entityManager;
  }

  nextFrame(){
    this.cleanCanvas();
    for(let view of this.entityManager.views()){
      view.draw(this.painter);
    }

    window.requestAnimationFrame(this.nextFrame);
  }

  cleanCanvas(){
    this.painter.drawCircle(new Circle(new Coordinates(0,0), 5000), getColor(LIGHT_BLUE), getColor(LIGHT_BLUE, 0));
  }
}