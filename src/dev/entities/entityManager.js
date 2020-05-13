export class EntityManager{
  constructor(){
    // [entity, entityView]
    this.entities = [];
  }

  *[Symbol.iterator] () {
    for (let k=0; k < this.entities.length; k++) {
      yield this.entities[k][0];
    }
  }

  *views(){
    for (let k=0; k < this.entities.length; k++) {
      yield this.entities[k][1];
    }
  }

  *pairs(
    condition = () => true
  ) {
    const entities = this.entities.filter(condition);
    for(let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        yield [entities[i][0], entities[j][0]];
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