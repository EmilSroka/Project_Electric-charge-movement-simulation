export function gateDecorator(component){
  component["isGate"] = true;
  return component;
}

export function isGate(object){
  return object.isGate;
}