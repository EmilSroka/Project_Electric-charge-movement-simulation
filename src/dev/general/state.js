class State {
  setValue(key, value){
    this[key] = value;
  }

  getValue(key){
    if(this[key] !== undefined){
      return this[key];
    } else {
      throw new Error(`key doesn't exist`);
    }
  }
}

const state = new State();

export default state;