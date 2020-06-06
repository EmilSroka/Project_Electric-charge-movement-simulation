import { Mode } from "./mode";

const WIDTH = 3840;
const CANVAS_RATIO = 9 / 16;

export class FreeMode extends Mode{
  constructor(entityManager){
    super();
    this.entityManager = entityManager;
    this.electrons = 50;
    this.protons = 50;
  }

  meetStopCondition(){
    return false;
  }

  getDimensions(){
    return [WIDTH, CANVAS_RATIO];
  }
}