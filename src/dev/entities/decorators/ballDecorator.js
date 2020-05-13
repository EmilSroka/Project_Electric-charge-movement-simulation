export function ballDecorator(component){
  component["isBall"] = true;
  return component;
}