import onResize from '../general/onResizeEvent';
import { UnitTranslator } from './unitTranslator';
import { Painter } from './painter';
import { InteractionController } from './interactionController';
import { Visualization } from './visualization';
import { States, StateFactory } from './states/stateFactory';
import { puckFactory } from '../entities/factories/puckFactory';

const PART_OF_PAGE_WIDTH = 0.8;
const DEFAULT_WIDTH = 1920;
const DEFAULT_CANVAS_RATIO = 9 / 16;

export class Canvas{
  constructor(selector, entityManager){
    this.canvas = document.querySelector(selector);
    this.entityManager = entityManager;
    this.unitTranslator = new UnitTranslator(this.canvas, DEFAULT_WIDTH, DEFAULT_CANVAS_RATIO);
    this.painter = new Painter(this.canvas, this.unitTranslator);
    
    this.interactionController = new InteractionController(this.canvas, this.unitTranslator, this.entityManager);

    this.stateFactory = new StateFactory(this.entityManager, this.interactionController);
    this.interactionController.setState(this.stateFactory.get(States.ConfigureState, puckFactory(-100, -100)));
    
    this.updateSize();
    this.unitTranslator.recalc();

    onResize.subscribe(() => {
      this.updateSize();
      this.unitTranslator.recalc();
    }); 

    this.visualization = new Visualization(this.entityManager, this.painter, DEFAULT_WIDTH, DEFAULT_WIDTH * DEFAULT_CANVAS_RATIO);
  }

  updateSize(){
    const width = PART_OF_PAGE_WIDTH * window.innerWidth;
    this.canvas.width =  width;
    this.canvas.height = this.ratio * width;
    this.unitTranslator.recalc();
  }

  resize(width, ratio){
    this.unitTranslator.changeSize(width, ratio);
    this.ratio = ratio;
    this.updateSize();
    this.visualization.setSize(width, width * ratio);
  }

  setEntityManager(entityManager){
    this.entityManager = entityManager;
    this.visualization.setEntityManager(entityManager);
  }

  setVisualizeFieldState(state){
    this.visualization.setVisualizeFieldState(state); 
  }

  setState(state){
    this.interactionController.setState(state);
  }

  getState(){
    return this.interactionController.state;
  }

  getStateFactory(){
    return this.stateFactory;
  }
}