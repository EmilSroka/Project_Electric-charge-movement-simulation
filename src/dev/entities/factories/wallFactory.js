import { Entity } from "../entity";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { collisionDecorator } from '../decorators/collisionDecorator';
import { staticDecorator } from '../decorators/staticDecorator';
import { WallView } from '../views/wallView';

export function wallFactory(x, y, w=120, h=300){
  let entity = new Entity({
    bounding: new Rectangle(new Coordinates(x - w/2, y + h/2), w, h),
    center: new Coordinates(x,y)
  });
  entity = collisionDecorator(staticDecorator(entity));
  const view = new WallView(entity);
  return [entity, view];
}