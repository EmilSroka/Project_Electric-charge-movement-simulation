import { Entity } from "../entity";
import { ElectronView } from "../views/electronView";
import { ProtonView } from "../views/protonView";
import { ElectricCharge, ChargeType } from '../../simulation/electricCharge';
import { Coordinates, Circle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { puckDecorator } from '../decorators/puckDecorator';
import { electricalDecorator } from '../decorators/electricalDecorator';
import { GRAY, BLACK } from '../../general/colors';

// tmp
import { configurableDecorator } from '../decorators/configurableDecorator';

export function puckFactory(x, y, electricCharge = new ElectricCharge(ChargeType.NEGATIVE, 1)){
  let entity = new Entity({
    mass: 1.672621898e-29, // 9.10938356e-31,
    velocity: new Coordinates(0,0),
    acceleration: new Coordinates(0,0),
    bounding: new Circle(new Coordinates(x,y),40),
    center: new Coordinates(x,y)
  });
  entity = configurableDecorator(puckDecorator(collisionDecorator(electricalDecorator(entity, electricCharge))));
  const view = (electricCharge.chargeType === ChargeType.NEGATIVE) ? 
                  new ElectronView(entity, BLACK, GRAY) : 
                  new ProtonView(entity, BLACK, GRAY);
  return [entity, view];
}