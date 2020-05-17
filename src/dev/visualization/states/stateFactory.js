import { ConfigureState } from './ConfigureState'
import { AddEntityState } from './AddEntityState';

export const States = {
  ConfigureState: 0,
  AddEntityState: 1
}

export class StateFactory{
  constructor(entityManager, ui){
    this.configureState = new ConfigureState(this, entityManager);
    this.addEntityState = new AddEntityState(this, entityManager, ui); 
  }

  get(state, ...args){
    switch(state){
      case States.ConfigureState:
        return this.configureState;
      case States.AddEntityState:
        this.addEntityState.reset(...args);
        return this.addEntityState;
      default:
        return; // ???
    }
  }
}