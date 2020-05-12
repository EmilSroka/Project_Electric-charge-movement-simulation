import { Entity } from "../entity";
import { ProtonView } from "../views/protonView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';

export function protonFactory(x, y){
  const entity = new Entity({
    electricCharge: new ElectricCharge(1, ChargeType.NEGATIVE),
    mass: 1.672621898e-27,
    velocity: new Coordinates(-0.6,0), // TODO
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),40),
    center: new Coordinates(x,y)
  });
  const view = new ProtonView(entity);
  return [entity, view];
}