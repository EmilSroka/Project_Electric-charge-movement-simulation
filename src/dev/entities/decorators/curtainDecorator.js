export function curtainDecorator(component){
  component["isCurtain"] = true;
  return component;
}

export function isCurtain(entity){
  return entity.isCurtain;
}