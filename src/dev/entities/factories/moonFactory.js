import { Entity } from "../entity";
import { ElectronView } from "../views/electronView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { electricalDecorator } from '../decorators/electricalDecorator';

export function moonFactory(x, y, velocityX, velocityY){
  let entity = new Entity({
    mass: 1.672621898e-29, // 9.10938356e-31,
    velocity: new Coordinates(velocityX, velocityY),
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),55),
    center: new Coordinates(x,y)
  });
  const electricCharge = new ElectricCharge(ChargeType.NEGATIVE, 2.5);
  entity = collisionDecorator(electricalDecorator(entity, electricCharge));
  const view = new ElectronView(entity);
  return [entity, view];
}