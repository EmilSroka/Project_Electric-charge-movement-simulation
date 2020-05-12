import { Coordinates } from "../general/geometrics";

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
  // calculate acceleration based on force and mass of entites
  // return [acceleration for entity1, acceleration for entity2];
  return [new Coordinates(0,0), new Coordinates(0,0)];
}