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