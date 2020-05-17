import { Entity } from "../entity";
import { Coordinates, Rectangle } from '../../general/geometrics';
import { curtainDecorator } from '../decorators/curtainDecorator';
import { CurtainView } from "../views/curtainView";
import { GRAY, BLACK } from '../../general/colors';

export function curtainFactory(x, y, text, w=120, h=300, textColor = BLACK, fontSize = 48, color = GRAY, opacity = 0.2){
  let entity = new Entity({
    bounding: new Rectangle(new Coordinates(x - w/2, y + h/2), w, h),
    center: new Coordinates(x,y)
  });
  entity = curtainDecorator(entity);
  const view = new CurtainView(entity, text, textColor, fontSize, color, opacity);
  return [entity, view];
}