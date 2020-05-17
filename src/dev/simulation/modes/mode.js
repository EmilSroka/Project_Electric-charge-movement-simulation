import { puckFactory } from '../../entities/factories/puckFactory';
import { gateFactory } from '../../entities/factories/gateFactory';
import { gateBorderFactory } from '../../entities/factories/gateBorderFactory';
import { borderFactory } from '../../entities/factories/borderFactory';
import { isPuck } from '../../entities/decorators/puckDecorator';
import { isGate } from '../../entities/decorators/gateDecorator';
import { isBorder } from '../../entities/decorators/borderDecorator';
import { collisionCheckerFactory } from '../collisionDetection';

import { wallFactory } from '../../entities/factories/wallFactory';
import { electronFactory } from '../../entities/factories/electronFactory';
import { protonFactory } from '../../entities/factories/protonFactory';

export const Result = {
  win: 1,
  lose: -1,
  unknown: 0
}

const maxTime = 60000;

export class Mode {
  constructor(){
    this.result = Result.unknown; 
    this.maxTime = maxTime; 
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
      this.result = Result.lose;
      return true;
    }

    return false;
  }

  getResult(){
    return this.result;
  }

  onReset() { }

  onInit() { }

  onStart() { }

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

