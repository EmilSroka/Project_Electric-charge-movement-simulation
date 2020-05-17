import { deepCopy } from "../../general/utils";
import { isConfigurable } from "../../entities/decorators/configurableDecorator";
import { PositionVector } from "../../general/geometrics";

export class ConfigureState{
  constructor(stateFactory, entityManager){
    this.stateFactory = stateFactory
    this.entity = null;
    this.isMoving = false;
    this.entityManager = entityManager;
  }

  mouseMove(simulationCoordinates){
    if(!this.isMoving)
      return;

    const deltaPosition = PositionVector.fromDifference(simulationCoordinates, this.previousPosition); // .sum(this.mouseToCenter);
    this.previousPosition = simulationCoordinates;
    this.entity.translate(deltaPosition);
  }

  mouseOut(simulationCoordinates){
    if(!this.isMoving)
      return;


    if(!isConfigurable(this.entity))
      return;

    this.entityManager.remove(this.entity);
    this.isMoving = false;
  }

  mouseOver(simulationCoordinates){ }

  mouseDown(simulationCoordinates){
    if(this.isMoving)
      return;

    const target = this.entityManager.getEntityByCoordinates(simulationCoordinates);

    if(!target)
      return;

    if(!isConfigurable(target))
      return;

    this.entity = target;
    this.isMoving = true;
    this.centerCopy = deepCopy(target.center);
    this.boundingCopy = deepCopy(target.bounding);
    this.previousPosition = simulationCoordinates;
  }

  mouseUp(simulationCoordinates){
    if(!this.isMoving)
      return;

    if(!this.entityManager.isFreeArea(this.entity)){
      this.restore();
    }
    
    this.isMoving = false;
  }

  restore(){
    this.entity.center = this.centerCopy;
    this.entity.bounding = this.boundingCopy;
  }
}