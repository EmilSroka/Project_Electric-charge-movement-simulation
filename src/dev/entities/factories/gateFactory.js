import { Entity } from "../entity";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { staticDecorator } from '../decorators/staticDecorator';
import { gateDecorator } from '../decorators/gateDecorator';
import { GREEN } from '../../general/colors';
import { RectangleAreaView } from '../views/rectangleAreaView';

export function gateFactory(x, y, w=120, h=300){
  let entity = new Entity({
    bounding: new Rectangle(new Coordinates(x - w/2, y + h/2), w, h),
    center: new Coordinates(x,y)
  });
  entity = gateDecorator(staticDecorator(entity));
  const view = new RectangleAreaView(entity, GREEN, 0.4);
  return [entity, view];
}