import { Coordinates } from '../general/geometrics';

export class UnitTranslator{
  constructor(canvas, width, ratio){
    this.canvas = canvas;
    this.width = width;
    this.height = width * ratio;
  }
  
  recalc(){
    const { width, height } = this.canvas.getBoundingClientRect();

    this.unitsRatio = width / 1920;
    this.leftBottom = new Coordinates(0, height);
  }

  toCanvasUnit(value){
    return value * this.unitsRatio;
  }

  toSimulationUnit(value){
    return value / this.unitsRatio;
  }

  translatePoint(coordinates){
    const x = this.leftBottom.x + coordinates.x * this.unitsRatio; 
    const y = this.leftBottom.y - coordinates.y * this.unitsRatio;
    return new Coordinates(x, y);
  }

  reverselyTranslatePoint(coordinates){
    const x = (coordinates.x - this.leftBottom.x) / this.unitsRatio;
    const y = (this.leftBottom.y - coordinates.y) / this.unitsRatio;
    return new Coordinates(x, y);
  }

}