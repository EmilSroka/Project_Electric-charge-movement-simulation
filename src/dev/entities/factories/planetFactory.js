import { Entity } from "../entity";
import { ElectronView } from "../views/electronView";
import { ProtonView } from "../views/protonView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { puckDecorator } from '../decorators/puckDecorator';
import { electricalDecorator } from '../decorators/electricalDecorator';
import { GRAY, BLACK } from '../../general/colors';

export function planetFactory(x, y){
  let entity = new Entity({
    mass: 1, // 9.10938356e-31,
    velocity: new Coordinates(0,0),
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),65),
    center: new Coordinates(x,y)
  });
  const electricCharge = new ElectricCharge(ChargeType.POSITIVE, 4);
  entity = collisionDecorator(electricalDecorator(entity, electricCharge));
  const view = new ProtonView(entity, BLACK, GRAY);
  return [entity, view];
}