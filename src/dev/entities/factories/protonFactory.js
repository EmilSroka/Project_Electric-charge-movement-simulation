import { Entity } from "../entity";
import { ProtonView } from "../views/protonView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { electricalDecorator } from '../decorators/electricalDecorator';
import { staticDecorator } from '../decorators/staticDecorator';

export function protonFactory(x, y){
  let entity = new Entity({
    mass: 1.672621898e-29, // 1.672621898e-27, 
    velocity: new Coordinates(0,0),
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),40),
    center: new Coordinates(x,y)
  });
  // entity = staticDecorator(collisionDecorator(electricalDecorator(entity, new ElectricCharge(1, ChargeType.POSITIVE))));
  entity = collisionDecorator(electricalDecorator(entity, new ElectricCharge(1, ChargeType.POSITIVE)));
  const view = new ProtonView(entity);
  return [entity, view];
}