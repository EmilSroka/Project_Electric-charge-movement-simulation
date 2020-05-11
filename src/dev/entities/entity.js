import { ElectricCharge, ChargeType } from "../simulation/electricCharge";
import { Coordinates, Circle } from "../general/geometrics";

export class entity {
  constructor({ 
      electricCharge = new ElectricCharge(0, ChargeType.NEUTRAL),
      mass = 1,
      velocity = new Coordinates(0,0), 
      acceleration = new Coordinates(0,0),
      bounding = new Circle(new Coordinates(0,0),1)
     } = {}){
    this.electricCharge = electricCharge;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.bounding = bounding;

    this.previousCollider = null;
  }

  simulate(deltaTime){
    this.move(deltaTime);
    this.updateVelocity(deltaTime);
  }

  updateAcceleration(vector){
    this.acceleration.x += vector.x;
    this.acceleration.y += vector.y;
  }

  move(deltaTime){
    const deltaX = this.x + this.velocity.x * deltaTime + 0.5 * this.acceleration.x * Math.pow(deltaTime, 2);
    const deltaY = this.y + this.velocity.y * deltaTime + 0.5 * this.acceleration.y * Math.pow(deltaTime, 2);
    this.bounding.move(deltaX, deltaY);
  }

  calculateVelocity(deltaTime){
    this.velocity.translate(deltaTime * this.acceleration.x, deltaTime * this.acceleration.y);
  }

  getArrayOfBoundings(){
    return (Array.isArray(this.bounding)) ? this.bounding : [this.bounding];
  }

  handleCollision(){ }
}