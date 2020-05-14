import { Entity } from "../entity";
import { ElectronView } from "../views/electronView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { electricalDecorator } from '../decorators/electricalDecorator';

export function electronFactory(x, y){
  let entity = new Entity({
    mass: 9.10938356e-31,
    velocity: new Coordinates(0,0),
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),40),
    center: new Coordinates(x,y)
  });
  entity = collisionDecorator(electricalDecorator(entity, new ElectricCharge(1, ChargeType.NEGATIVE)));
  const view = new ElectronView(entity);
  return [entity, view];
}