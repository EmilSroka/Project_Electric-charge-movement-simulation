export function collisionDecorator(component){
  component["previousCollider"] = null;
  component["canCollide"] = true;
  return component;
}

export function canCollide(entity){
  return entity.canCollide;
}