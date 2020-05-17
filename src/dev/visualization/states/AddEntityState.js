import { PositionVector } from "../../general/geometrics";
import { States } from './stateFactory';
import { deepCopy } from '../../general/utils';

export class AddEntityState{
  constructor(stateFactory, entityManager, ui){
    this.stateFactory = stateFactory;
    this.entityManager = entityManager;
    this.ui = ui;
  }

  reset(element){
    this.entityManager.add(element);
    this.entity = element[0];
    this.previousPosition = deepCopy(element[0].center);
  }

  mouseMove(simulationCoordinates){
    const deltaPosition = PositionVector.fromDifference(simulationCoordinates, this.previousPosition);
    this.previousPosition = simulationCoordinates;
    this.entity.translate(deltaPosition);
  }

  mouseOut(simulationCoordinates){ 
    this.entityManager.remove(this.entity);
    this.ui.setState(this.stateFactory.get(States.ConfigureState));
  }

  mouseOver(simulationCoordinates){ }

  mouseDown(simulationCoordinates){
    if(!this.entityManager.isFreeArea(this.entity)){
      this.entityManager.remove(this.entity);
    }

    this.ui.setState(this.stateFactory.get(States.ConfigureState));
  }

  mouseUp(simulationCoordinates){ }
}