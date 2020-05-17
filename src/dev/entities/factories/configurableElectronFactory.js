import { electronFactory } from '../factories/electronFactory';
import { configurableDecorator } from '../decorators/configurableDecorator';

export function configurableElectronFactory(x, y){
  let [entity, view] = electronFactory(x, y);
  entity = configurableDecorator( entity );
  return [entity, view];
}