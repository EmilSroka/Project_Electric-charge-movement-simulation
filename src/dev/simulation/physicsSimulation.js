import { collision } from "./collisionResponse";
import { accelerationFromElectricity } from "./electricCharge";
import { canCollide } from '../entities/decorators/collisionDecorator';
import { hasCharge } from '../entities/decorators/electricalDecorator';
import { collides } from '../entities/entity';

export class PhysicsSimulation {
  constructor(entityManager){
    this.entityManager = entityManager;
  }

  nextStep(deltaTime){
    this.resetAcceleration();
    this.calculateElectricForces();
    this.simulate(deltaTime);
    this.handleCollisions(deltaTime);
  }

  resetAcceleration(){
    for(const entity of this.entityManager){
      entity.resetAcceleration();
    }
  }

  calculateElectricForces(){
    for(const [entity1, entity2] of this.entityManager.pairs(hasCharge)){
      const [acceleration1, acceleration2] = accelerationFromElectricity(entity1, entity2);
      entity1.updateAcceleration(acceleration1);
      entity2.updateAcceleration(acceleration2);
    }
  }

  simulate(deltaTime){
    for(const entity of this.entityManager){
      entity.simulate(deltaTime);
    }
  }

  handleCollisions(deltaTime){
    const pairs = this.entityManager.pairs(canCollide);
    for(const [entity1, entity2] of pairs){
      const boundings = collides(entity1, entity2);
      if(boundings){
        collision(entity1, entity2, boundings, deltaTime);
      }      
    }
  }
}