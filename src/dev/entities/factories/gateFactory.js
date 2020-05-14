import { Entity } from "../entity";
import { GateView } from "../views/gateView";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { staticDecorator } from '../decorators/staticDecorator';
import { gateDecorator } from '../decorators/gateDecorator';
import { gateFill } from '../../general/images';

export function gateFactory(x, y, w=120, h=300){
  let entity = new Entity({
    mass:  9.10938356e-31, // TO DO
    velocity: new Coordinates(0,0),
    acceleration: new Coordinates(0,0),
    bounding: [
      new Rectangle(new Coordinates(x-w/2, y+h/2), w, 5),
      new Rectangle(new Coordinates(x+w/2 - 5, y+h/2 - 5), 5, h - 10),
      new Rectangle(new Coordinates(x-w/2, y-h/2 + 5), w, 5)
    ],
    center: new Coordinates(x,y)
  });
  entity =  gateDecorator(staticDecorator(collisionDecorator(entity)));
  const view = new GateView(entity, gateFill);
  return [entity, view];
}