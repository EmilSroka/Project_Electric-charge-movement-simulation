export class EntityManager{
  constructor(){
    // [entity, entityView]
    this.entities = [];
  }

  *[Symbol.iterator] () {
    for (let k; k < this.entities.length; k++) {
      yield this.entities[k][0];
    }
  }

  *pairs(){
    for(let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        yield [this.entities[i][0], this.entities[j][0]];
      }
    }   
  }

  add(entity){
    if(!this.entities.includes(entity)){
      this.entities.push(entity);
    }
  }

  remove(entity){
    const entityIndex = this.entities.findIndex(entityArr => entityArr.electricCharge === entity.electricCharge);
    if(entityIndex != -1){
      this.entities.splice(entityIndex, 1);
    }
  }
}