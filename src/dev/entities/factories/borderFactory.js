import { Entity } from "../entity";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { staticDecorator } from '../decorators/staticDecorator';
import { borderDecorator } from '../decorators/borderDecorator';
import { RED } from '../../general/colors';
import { RectangleAreaView } from '../views/rectangleAreaView';

export function borderFactory(x, y, w=120, h=300){
  let entity = new Entity({
    bounding: new Rectangle(new Coordinates(x - w/2, y + h/2), w, h),
    center: new Coordinates(x,y)
  });
  entity = borderDecorator(staticDecorator(entity));
  const view = new RectangleAreaView(entity, RED, 0.4);
  return [entity, view];
}