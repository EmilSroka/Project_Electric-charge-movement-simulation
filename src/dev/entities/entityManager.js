export class EntityManager{
  constructor(){
    // create array for entities
    this.entities = [];
  }

  *[Symbol.iterator] () {
    // create iterator
    // loop over array and yield value
    for (let k; k < this.entities.length; k++) {
      yield this.entities[k].value;
    }
  }

  *pairs(){
    // create iterator
    // yield pair (array of length 2) with both element
    // without repetition
    for(let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        yield [this.entities[i], this.entities[j]];
      }
    }   
  }

  add(entity){
    // add entity to array
    this.entities.push(entity);
  }

  remove(entity){
    // remove entity from array
    const entityIndex = this.entities.findIndex(entityArr => entityArr.electricCharge === entity.electricCharge);
    this.entities.splice(entityIndex, 1);
  }
}