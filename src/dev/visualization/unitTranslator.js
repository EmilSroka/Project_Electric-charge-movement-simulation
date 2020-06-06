import { Coordinates } from '../general/geometrics';

export class UnitTranslator{
  constructor(canvas, width, ratio){
    this.canvas = canvas;
    this.changeSize(width,ratio);
  }

  changeSize(width, ratio){
    this.width = width;
    this.ratio = ratio;
    this.height = width * ratio;
    this.recalc();
  }
  
  recalc(){
    const { width, height, left, top } = this.canvas.getBoundingClientRect();

    this.unitsRatio = width / this.width;
    this.leftBottom = new Coordinates(0, height);
    this.canvasLeftTop = new Coordinates(left, top);
  }

  toCanvasUnit(value){
    return value * this.unitsRatio;
  }

  toSimulationUnit(value){
    return value / this.unitsRatio;
  }

  simulationToCanvas(coordinates){ // translatePoint(coordinates){
    const x = this.leftBottom.x + coordinates.x * this.unitsRatio; 
    const y = this.leftBottom.y - coordinates.y * this.unitsRatio;
    return new Coordinates(x, y);
  }

  canvasToSimulation (coordinates){ // reverselyTranslatePoint(coordinates){
    const x = (coordinates.x - this.leftBottom.x) / this.unitsRatio;
    const y = (this.leftBottom.y - coordinates.y) / this.unitsRatio;
    return new Coordinates(x, y);
  }

  pageToSimulation(coordinates){
    return this.canvasToSimulation(coordinates.translate(-this.canvasLeftTop.x, -this.canvasLeftTop.y));
  }

}