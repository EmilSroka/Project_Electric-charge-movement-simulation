export function collisionDecorator(component){
  component["previousCollider"] = null;
  component["canCollide"] = true;
  return component;
}