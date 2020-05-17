import onResize from '../general/onResizeEvent';
import { UnitTranslator } from './unitTranslator';
import { Painter } from './painter';
import { InteractionController } from './interactionController';
import { Visualization } from './visualization';
import { States, StateFactory } from './states/stateFactory';
import { puckFactory } from '../entities/factories/puckFactory';

const WIDTH = 1920;
const PART_OF_PAGE_WIDTH = 0.9;
const CANVAS_RATIO = 9 / 16;

export class Canvas{
  constructor(selector, entityManager){
    this.canvas = document.querySelector(selector);
    this.entityManager = entityManager;
    this.unitTranslator = new UnitTranslator(this.canvas, WIDTH, CANVAS_RATIO);
    this.painter = new Painter(this.canvas, this.unitTranslator);
    
    this.interactionController = new InteractionController(this.canvas, this.unitTranslator, this.entityManager);

    this.stateFactory = new StateFactory(this.entityManager, this.interactionController);
    this.interactionController.setState(this.stateFactory.get(States.AddEntityState, puckFactory(-100, -100)));
    
    this.updateSize();
    this.unitTranslator.recalc();

    onResize.subscribe(() => {
      this.updateSize();
      this.unitTranslator.recalc();
    }); 

    this.visualization = new Visualization(this.entityManager, this.painter);

  }

  updateSize(){
    const width = PART_OF_PAGE_WIDTH * window.innerWidth;
    this.canvas.width =  width;
    this.canvas.height = CANVAS_RATIO * width;
  }

  setEntityManager(entityManager){
    this.entityManager = entityManager;
    this.visualization.setEntityManager(entityManager);
  }
}