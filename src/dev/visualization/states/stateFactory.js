import { ConfigureState } from './ConfigureState'
import { AddEntityState } from './AddEntityState';
import { StaticState } from './StaticState';

export const States = {
  ConfigureState: 0,
  AddEntityState: 1,
  StaticState: 2
}

export class StateFactory{
  constructor(entityManager, ui){
    this.configureState = new ConfigureState(this, entityManager);
    this.addEntityState = new AddEntityState(this, entityManager, ui); 
    this.staticState = new StaticState();
  }

  get(state){
    switch(state){
      case States.ConfigureState:
        return this.configureState;
      case States.AddEntityState:
        return this.addEntityState;
      case States.StaticState:
        return this.staticState;
      default:
        return;
    }
  }
}