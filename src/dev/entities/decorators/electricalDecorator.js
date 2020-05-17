import { ChargeType } from '../../simulation/electricCharge';

export function electricalDecorator(component, electricCharge = new ElectricCharge(0, ChargeType.NEUTRAL)){
  component["electricCharge"] = electricCharge;
  component["isElectrical"] = true;
  return component;
}

export function hasCharge(entity){
  return entity.isElectrical && entity.electricCharge.chargeType != ChargeType.NEUTRAL;
}