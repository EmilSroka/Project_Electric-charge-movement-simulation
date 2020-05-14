export function gateDecorator(component){
  component["isGate"] = true;
  return component;
}