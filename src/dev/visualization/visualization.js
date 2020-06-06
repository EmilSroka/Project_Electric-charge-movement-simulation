import { Coordinates, Rectangle, Circle } from '../general/geometrics';
import { LIGHT_BLUE, getColor, BLACK } from '../general/colors';
import { FieldVisualisation } from './fieldVisualisation';

export class Visualization {
  constructor(entityManager, painter, width, height){
    this.entityManager = entityManager;
    this.painter = painter;

    this.width = width;
    this.height = height;

    this.visualizeField = false;
    this.fieldVisualisation = new FieldVisualisation();
    
    this.nextFrame = this.nextFrame.bind(this);
    this.nextFrame();
  }

  setSize(width, height){
    this.width = width;
    this.height = height;
  }

  setVisualizeFieldState(state){
    this.visualizeField = state; 
  }

  setEntityManager(entityManager){
    this.entityManager = entityManager;
  }

  nextFrame(){
    this.cleanCanvas();
    for(let view of this.entityManager.views()){
      view.draw(this.painter);
    }
    if(this.visualizeField) { 
      this.fieldVisualisation.draw(this.entityManager, this.painter, this.width, this.height, 80);
    } 

    window.requestAnimationFrame(this.nextFrame);
  }

  cleanCanvas(){
    this.painter.drawRectangle(new Rectangle(new Coordinates(0,this.height), this.width, this.height), getColor(LIGHT_BLUE)); //, ), getColor(LIGHT_BLUE, 0));
  }
}