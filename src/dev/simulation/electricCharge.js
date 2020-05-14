import { PositionVector } from "../general/geometrics";

export class ElectricCharge {
  constructor(chargeType, value) {
    this.chargeType = chargeType;
    this.value = value; // value * const e * chargeType = real value 
  }
}

export const ChargeType = {
  POSITIVE: 1,
  NEGATIVE: -1,
  NEUTRAL: 0
}

export function accelerationFromElectricity(entity1, entity2, deltaTime){
  // calculate interaction (force) between entities in given time
  var k = 8.9875*Math.pow(10,9);
  
  var distance = entity1.position.distance(entity2.position);
  var force = k*( ( Math.abs( entity1.ElectricCharge*entity2.ElectricCharge ) )/(distance**2) );
  // calculate acceleration based on force and mass of entites

  var acceleration1 = force/entity1.mass;
  var acceleration2 = force/entity2.mass;

  var vector1 = new PositionVector(entity1.point,entity2.point);
  var vector2 = new PositionVector(entity2.point,entity1.point);

  vector1 = vector1.normalize();
  vector2 = vector2.normalize();

  vector1.multiply(acceleration1);
  vector2.multiply(acceleration2);

  entity1.updateAcceleration(vector1);
  entity2.updateAcceleration(vector2);
  // return [acceleration for entity1, acceleration for entity2];
}

