import { Mode } from "./mode";
import { planetFactory } from "../../entities/factories/planetFactory";
import { moonFactory } from "../../entities/factories/moonFactory";

const WIDTH = 3840;
const CANVAS_RATIO = 9 / 16;

export class VisualizationMode extends Mode{
  constructor(entityManager){
    super();
    this.entityManager = entityManager;
    this.electrons = 0;
    this.protons = 0;
  }

  onInit(entityManager){
    super.onInit(entityManager);

    entityManager.add( planetFactory(1920,1080) );
    entityManager.add( moonFactory(2300, 1080, 0, 0.575) );
  }

  meetStopCondition(){
    return false;
  }

  getDimensions(){
    return [WIDTH, CANVAS_RATIO];
  }
}