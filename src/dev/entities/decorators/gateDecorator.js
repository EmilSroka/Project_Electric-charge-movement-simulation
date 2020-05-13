export function gareDecorator(component){
  component["isGate"] = true;
  return component;
}