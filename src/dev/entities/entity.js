import { Coordinates, Circle } from "../general/geometrics";
import { collisionCheckerFactory } from '../simulation/collisionDetection' 
import globalState from '../general/state';

export class Entity {
  constructor({
      mass = 1,
      velocity = new Coordinates(0,0), 
      acceleration = new Coordinates(0,0),
      bounding = new Circle(new Coordinates(0,0),1),
      center = new Coordinates(0,0)
     } = {}){
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.bounding = bounding;
    this.center = center;
  }

  simulate(deltaTime){
    this.move(deltaTime);
    this.calculateVelocity(deltaTime);
  }

  updateAcceleration(vector){
    this.acceleration.x += vector.x;
    this.acceleration.y += vector.y;
  }

  resetAcceleration(){
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  move(deltaTime){
    const deltaX = this.velocity.x * deltaTime + 0.5 * this.acceleration.x * Math.pow(deltaTime, 2);
    const deltaY = this.velocity.y * deltaTime + 0.5 * this.acceleration.y * Math.pow(deltaTime, 2);
    this.translate( new Coordinates(deltaX, deltaY) );
  }

  translate(vector){
    for(const bounding of this.getArrayOfBoundings()){
      bounding.move(vector.x, vector.y);
    }
    this.center.translate(vector.x, vector.y);
  }

  calculateVelocity(deltaTime){
    this.velocity.translate(deltaTime * this.acceleration.x, deltaTime * this.acceleration.y);
  }

  getArrayOfBoundings(){
    return (Array.isArray(this.bounding)) ? this.bounding : [this.bounding];
  }

  getMass(){
    return globalState.getValue('massFactor') * this.mass;
  }
}

export function collides(entity1, entity2){
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