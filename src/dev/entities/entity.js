import { ElectricCharge, ChargeType } from "../simulation/electricCharge";
import { Coordinates, Circle } from "../general/geometrics";

export class abstractEntity {
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
  }

  simulate(deltaTime){
    throw new Error("Abstract method");
  }

  updateAcceleration(vector){
    this.acceleration.x += vector.x;
    this.acceleration.y += vector.y;
  }
}