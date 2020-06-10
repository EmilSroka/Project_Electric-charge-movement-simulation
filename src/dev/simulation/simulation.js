import { PhysicsSimulation } from "./physicsSimulation";
import { Time } from '../general/time';
import globalState from '../general/state';
import { Result } from './modes/mode'
import { Entity } from "../entities/entity";

export default class Simulation{
  constructor(mode, entityManager){ 
    this.mode = mode;

    this.entityManager = entityManager;
    this.simulation = new PhysicsSimulation(entityManager);
    this.observers = [];
    this.forcedStop = false;

    this.nextFrame = this.nextFrame.bind(this);

    mode.onInit(this.entityManager);
  }

  startSimulation(){
    this.time = new Time(performance.now());
    this.mode.onStart(this.entityManager);

    this.nextFrame(performance.now());
  }

  nextFrame(timestamp){
    this.time.nextStamp(timestamp);
    const deltaTime = globalState.getValue('fixedStep') ? globalState.getValue('fixedStepValue') : this.time.getDeltaTime();
    this.simulation.nextStep(deltaTime);

    if(this.mode.meetStopCondition(this.entityManager, this.time) || this.forcedStop){
      this.forcedStop = false;
      this.notifySubscribers();
    } else {

      window.requestAnimationFrame(this.nextFrame);
    }
  }

  subscribeSimulationEnd(callback){
    if(!this.observers.includes(callback))
      this.observers.push(callback)
  }

  unsubscribeSimulationEnd(callback){
    if(this.observers.includes(callback)){
      const index = this.observers.indexOf(callback);
      this.observers.splice(index, 1);
    }
  }

  notifySubscribers(){
    for(const observer of this.observers){
      observer(this.mode.getResult());
    }
  }

  reset(){
    this.mode.onReset(this.entityManager);
  }

  waitUntilStop(){
    return new Promise(resolve => {
      setInterval(() => {
        if(this.forcedStop === false){
          resolve();
        }
      })
    })
  }

  stop(){
    if(this.mode.getResult() === Result.unknown)
      this.forcedStop = true;
  }

  getCurrentMode(){
    return this.mode;
  }

  setMode(mode){
    this.mode.makeCopy(this.entityManager);
    this.mode = mode;
    this.mode.onReset(this.entityManager);
  }
}