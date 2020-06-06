
import { PositionVector } from "../general/geometrics";

const e = 1.602176634e-19;

export class ElectricCharge {
  constructor(chargeType, value) {
    this.chargeType = chargeType;
    this.value = value; // value * const e * chargeType = real value 
  }

  toNumber(){
    return this.chargeType * this.value * e;
  }
}

export const ChargeType = {
  POSITIVE: 1,
  NEGATIVE: -1,
  NEUTRAL: 0
}

export function accelerationFromElectricity(entity1, entity2){
  const force = forceValueFromElectricity(entity1, entity2);

  const accelerationValue1 = force / entity1.getMass();
  const accelerationValue2 = force / entity2.getMass();

  const direction1 = PositionVector.fromDifference(entity1.center,entity2.center);
  const direction2 = PositionVector.fromDifference(entity2.center,entity1.center);

  const acceleration1 = direction1.normalize().multiply(accelerationValue1);
  const acceleration2 = direction2.normalize().multiply(accelerationValue2);

  return [acceleration1, acceleration2];
}

export function forcesFromElectricity(entity1, entity2){
  const forceValue = forceValueFromElectricity(entity1, entity2);

  const direction1 = PositionVector.fromDifference(entity1.center,entity2.center);
  const direction2 = PositionVector.fromDifference(entity2.center,entity1.center);

  const force1 = direction1.normalize().multiply(forceValue);
  const force2 = direction2.normalize().multiply(forceValue);

  // console.log(force1, force2);

  return [force1, force2];
}

function forceValueFromElectricity(entity1, entity2){
  const k = 8.9875 * 10 ** 9;
  const distance = Math.max(entity1.center.distance(entity2.center), 80);
  return k * (entity1.electricCharge.toNumber() * entity2.electricCharge.toNumber()) / distance**2;
}