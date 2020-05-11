import { collision, collisionCheckerFactory } from "./collisions";
import { accelerationFromElectricity } from "./electricCharge";

export class PhysicsSimulation {
  constructor(entityManager){
    this.entityManager = entityManager;
  }

  nextStep(deltaTime){
    this.calculateElectricForces(deltaTime);
    this.simulate();
    this.handleCollisions();
  }

  calculateElectricForces(deltaTime){
    for(const [entity1, entity2] of entityManager.pairs()){
      const [acceleration1, acceleration2] = accelerationFromElectricity(entity1,entity2,deltaTime);
      entity1.updateAcceleration(acceleration1);
      entity2.updateAcceleration(acceleration2);
    }
  }

  simulate(){
    for(const entity of entityManager){
      entity.simulate();
    }
  }

  handleCollisions(){
    for(const [entity1, entity2] of entityManager.pairs()){
      if(!collides(entity1, entity2))
        continue;

      collision(entity1, entity2);
      entity1.handleCollision(entity2);
      entity2.handleCollision(entity1);
    }
  }
}

// helpers

function collides(){
  const boundings1 = entity1.getArrayOfBoundings();
  const boundings2 = entity2.getArrayOfBoundings();
  for(let bounding1 of boundings1){
    for(let bounding2 of boundings2){
      const collisionChecker = collisionCheckerFactory(bounding1, bounding2);
      if(collisionChecker(bounding1, boundings2)){
        return true;
      }
    }
  }

  return false;
} 