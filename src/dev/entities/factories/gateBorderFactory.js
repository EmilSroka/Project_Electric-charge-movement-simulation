import { Entity } from "../entity";
import { GateView } from "../views/gateView";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { staticDecorator } from '../decorators/staticDecorator';
import { gateFill } from '../../general/images';

export const Side = {
  top: 0,
  right: 1,
  left: 2,
  bottom: 3
}

export function gateBorderFactory(x, y, side, w=120, h=300){
  let sides = [
    new Rectangle(new Coordinates(x-w/2, y+h/2), w, 5),
    new Rectangle(new Coordinates(x+w/2 - 5, y+h/2 - 5), 5, h - 10),
    new Rectangle(new Coordinates(x - w/2, y+h/2 - 5), 5, h - 10),
    new Rectangle(new Coordinates(x-w/2, y-h/2 + 5), w, 5),
  ];
  sides.splice(side, 1);

  let entity = new Entity({
    bounding: sides,
    center: new Coordinates(x,y)
  });
  entity = staticDecorator(collisionDecorator(entity));
  const view = new GateView(entity, gateFill);
  return [entity, view];
}