import { ElectricCharge, ChargeType } from "../simulation/electricCharge";
import { Coordinates, Circle } from "../general/geometrics";

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
    for(const bounding of this.getArrayOfBoundings()){
      bounding.move(deltaX, deltaY);
    }
    this.center.translate(deltaX, deltaY);
  }

  calculateVelocity(deltaTime){
    this.velocity.translate(deltaTime * this.acceleration.x, deltaTime * this.acceleration.y);
  }

  getArrayOfBoundings(){
    return (Array.isArray(this.bounding)) ? this.bounding : [this.bounding];
  }
}