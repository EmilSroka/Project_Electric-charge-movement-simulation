import { puckFactory } from '../../entities/factories/puckFactory';
import { gateFactory } from '../../entities/factories/gateFactory';
import { gateBorderFactory } from '../../entities/factories/gateBorderFactory';
import { borderFactory } from '../../entities/factories/borderFactory';
import { isPuck } from '../../entities/decorators/puckDecorator';
import { isGate } from '../../entities/decorators/gateDecorator';
import { isBorder } from '../../entities/decorators/borderDecorator';
import { collisionCheckerFactory } from '../collisionDetection';
import { isConfigurable } from '../../entities/decorators/configurableDecorator';
import { ChargeType } from '../electricCharge';

export const Result = {
  win: 1,
  lose: -1,
  unknown: 0,
  draw: 2
}

const maxTime = 60000;

export class Mode {
  constructor(){
    this.result = Result.unknown; 
    this.maxTime = maxTime; 
    this.electrons = 1;
    this.protons = 1;
  }

  meetStopCondition(entityManager, time){
    const pucks = [...entityManager].filter(isPuck);
    const gates = [...entityManager].filter(isGate);
    const borders = [...entityManager].filter(isBorder);

    if(this.goal(pucks, gates)){
      this.result = Result.win;
      return true;
    }
    
    if(this.out(pucks, borders)){
      this.result = Result.lose;
      return true;
    }

    if(this.outOfTime(time)){
      this.result = Result.draw;
      return true;
    }

    return false;
  }

  getResult(){
    return this.result;
  }

  onReset(entityManager) {
    if(this.copy){
      entityManager.restoreSnapshot(this.copy);
    } else {
      this.onInit(entityManager);
    }
    this.result = Result.unknown; 
  }

  onInit() { }

  onStart(entityManager) {
    this.copy = entityManager.takeSnapshot();
  }

  getEntityLimit(entityManager) {
    let playerEntities = [...entityManager].filter(isConfigurable);
    let electrons = this.electrons - playerEntities.filter(entity => entity.electricCharge.chargeType === ChargeType.NEGATIVE).length;
    let protons = this.protons - playerEntities.filter(entity => entity.electricCharge.chargeType === ChargeType.POSITIVE).length;
    return [electrons, protons];
  }

  makeCopy(entityManager){
    this.copy = entityManager.takeSnapshot();
  }

  goal(pucks, gates){
    const puckBoundings = pucks.flatMap(puck => puck.getArrayOfBoundings());
    const gateBoundings = gates.flatMap(gate => gate.getArrayOfBoundings());
    return this.intersects(puckBoundings, gateBoundings);
  }
  
  out(pucks, borders){
    const puckBoundings = pucks.flatMap(puck => puck.getArrayOfBoundings());
    const bordersBoundings = borders.flatMap(border => border.getArrayOfBoundings());
    return this.intersects(puckBoundings, bordersBoundings);
  }

  outOfTime(time){
    return time.getTotalTime() > this.maxTime;
  }
  
  intersects(boundings1, boundings2){
    for(let bounding1 of boundings1){
      for(let bounding2 of boundings2){
        const collisionChecker = collisionCheckerFactory(bounding1, bounding2);
        if(collisionChecker(bounding1, bounding2)){
          return true;
        }
      }
    }
    return false;
  }

}