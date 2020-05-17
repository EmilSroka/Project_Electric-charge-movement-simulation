import { configurableDecorator } from '../decorators/configurableDecorator';
import { protonFactory } from './protonFactory';

export function configurableProtonFactory(x, y){
  let [entity, view] = protonFactory(x,y);
  entity = configurableDecorator( entity );
  return [entity, view];
}