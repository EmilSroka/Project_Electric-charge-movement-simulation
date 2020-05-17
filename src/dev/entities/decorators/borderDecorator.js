export function borderDecorator(component){
  component["isBorder"] = true;
  return component;
}

export function isBorder(object){
  return object.isBorder;
}