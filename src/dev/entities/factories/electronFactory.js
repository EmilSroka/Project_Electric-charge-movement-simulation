import { Entity } from "../entity";
import { ElectronView } from "../views/electronView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';

export function electronFactory(x, y){
  const entity = new Entity({
    electricCharge: new ElectricCharge(1, ChargeType.NEGATIVE),
    mass: 9.10938356e-31,
    velocity: new Coordinates(0.4,0), // TODO
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),40),
    center: new Coordinates(x,y)
  });
  const view = new ElectronView(entity);
  return [entity, view];
}