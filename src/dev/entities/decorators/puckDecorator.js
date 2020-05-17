export function puckDecorator(component){
  component["isPuck"] = true;
  return component;
}

export function isPuck(object){
  return object.isPuck;
}
