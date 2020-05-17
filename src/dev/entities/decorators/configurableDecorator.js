export function configurableDecorator(component){
  component["isConfigurable"] = true;
  return component;
}

export function isConfigurable(object){
  return object.isConfigurable;
}