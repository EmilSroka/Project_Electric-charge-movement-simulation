import { deepCopy } from "../../general/utils";
import { Coordinates } from "../../general/geometrics";

export function staticDecorator(component){
  const newComponent = deepCopy(component);
  newComponent["simulate"] = function(deltaTime){
    const velocity = deepCopy(this.velocity);
    const acceleration = deepCopy(this.acceleration);
    const bounding = deepCopy(this.bounding);
    const center  = deepCopy(this.center);

    component.simulate.call(this, deltaTime);

    this.velocity = velocity;
    this.acceleration = acceleration;
    this.bounding = bounding;
    this.center = center;
  }
  newComponent["getMass"] = function(){ 
    component.getMass.call(this);
    return this.mass;
  }
  newComponent["mass"] = Number.MAX_VALUE / 4;
  newComponent["isStatic"] = true;
  newComponent["velocity"] = new Coordinates(0,0);
  newComponent["acceleration"] = new Coordinates(0,0);

  return newComponent;
}