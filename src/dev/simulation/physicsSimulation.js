import { collision, collisionCheckerFactory } from "./collisions";
import { accelerationFromElectricity } from "./electricCharge";

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
    for(const [entity1, entity2] of this.entityManager.pairs()){
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
    for(const [entity1, entity2] of this.entityManager.pairs()){
      if(!collides(entity1, entity2))
        continue;

      collision(entity1, entity2);
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
        return true;
      }
    }
  }

  return false;
} 