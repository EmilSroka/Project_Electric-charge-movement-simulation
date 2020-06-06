import { deepCopy } from '../general/utils';
import { collides, Entity } from './entity';
import { Circle } from '../general/geometrics';

export class EntityManager{
  constructor(){
    // [entity, entityView]
    this.elements = [];
    this.removeListeners = [];
    this.addListeners = [];
  }

  *[Symbol.iterator] () {
    for (let k=0; k < this.elements.length; k++) {
      yield this.elements[k][0];
    }
  }

  filter(
    condition = () => true
  ){
    return [...this].filter(condition);
  }

  *views(){
    for (let k=0; k < this.elements.length; k++) {
      yield this.elements[k][1];
    }
  }

  *pairs(
    condition = () => true
  ) {
    const entities = [...this].filter(condition);
    for(let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        yield [entities[i], entities[j]];
      }
    }   
  }

  add(entity){
    if(!this.elements.includes(entity)){
      this.elements.push(entity);
    }
    this.notifyAddObservers();
  }

  addOnAddListener(listener){
    if(!this.addListeners.includes(listener)){
      this.addListeners.push(listener);
    }
  }

  notifyAddObservers(){
    for(let listener of this.addListeners){
      listener();
    }
  }

  remove(entity){
    const entityIndex = this.elements.findIndex(([entityObject]) => entityObject === entity);
    if(entityIndex != -1){
      this.elements.splice(entityIndex, 1);
    }
    this.notifyRemoveObservers();
  }

  addOnRemoveListener(listener){
    if(!this.removeListeners.includes(listener)){
      this.removeListeners.push(listener);
    }
  }

  notifyRemoveObservers(){
    for(let listener of this.removeListeners){
      listener();
    }
  }

  deleteByCondition(condition){
    const entityIndex = [...this].findIndex(condition);
    if(entityIndex != -1){
      this.elements.splice(entityIndex, 1);
    }
  }

  takeSnapshot(){
    const copy = [];
    for(let [entity, view] of this.elements){
      copy.push([deepCopy(entity), view]);
    }
    return copy;
  }

  restoreSnapshot(copy){
    this.elements = copy;
    for (let k=0; k < copy.length; k++) {
      // this.elements[k][0] = copy[k][0];
      // this.elements[k][1] = copy[k][1];
      // this.elements[k][1].entity = this.elements[k][0];
      this.elements[k][1].entity = this.elements[k][0];
    }
  }

  isFreeArea(target){
    for(let entity of this){
      if(collides(target, entity) && target != entity){
        return false;
      }
    } 
    return true;
  }

  getEntityByCoordinates(coordinates){
    const target = new Entity({
      center: coordinates, 
      bounding: new Circle(coordinates, 0)
    }); //  tmp
    for(let entity of this){
      if(collides(target, entity)){
        return entity;
      }
    } 
  }

  clear(){
    this.elements = [];
  }
}