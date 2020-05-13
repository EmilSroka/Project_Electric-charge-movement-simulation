import { collisionCheckerFactory } from "./collisionDetection";
import { collision } from "./collisionResponse";
import { accelerationFromElectricity, ChargeType } from "./electricCharge";

export class PhysicsSimulation {
  constructor(entityManager){
    this.entityManager = entityManager;
  }

  nextStep(deltaTime){
    this.calculateElectricForces(deltaTime);
    this.simulate(deltaTime);
    this.handleCollisions();
  }

  calculateElectricForces(deltaTime){
    for(const [entity1, entity2] of this.entityManager.pairs(hasCharge)){
      const [acceleration1, acceleration2] = accelerationFromElectricity(entity1,entity2,deltaTime);
      entity1.updateAcceleration(acceleration1);
      entity2.updateAcceleration(acceleration2);
    }
  }

  simulate(deltaTime){
    for(const entity of this.entityManager){
      entity.simulate(deltaTime);
    }
  }

  handleCollisions(){
    const pairs = this.entityManager.pairs(canCollide);
    for(const [entity1, entity2] of pairs){
      const boundings = collides(entity1, entity2);
      if(boundings){
        collision(entity1, entity2, boundings);
      }      
    }
  }
}

// helpers

function collides(entity1, entity2){
  const boundings1 = entity1.getArrayOfBoundings();
  const boundings2 = entity2.getArrayOfBoundings();
  for(let bounding1 of boundings1){
    for(let bounding2 of boundings2){
      const collisionChecker = collisionCheckerFactory(bounding1, bounding2);
      if(collisionChecker(bounding1, bounding2)){
        return [bounding1, bounding2];
      }
    }
  }

  return false;
} 

function canCollide([entity]){
  return entity.canCollide;
}

function hasCharge([entity]){
  return entity.isElectrical && entity.electricCharge.chargeType != ChargeType.NEUTRAL;
}