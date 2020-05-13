export function electricalDecorator(component, electricCharge = new ElectricCharge(0, ChargeType.NEUTRAL)){
  component["electricCharge"] = electricCharge;
  component["isElectrical"] = true;
  return component;
}