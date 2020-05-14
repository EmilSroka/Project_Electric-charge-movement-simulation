import { PhysicsSimulation } from "./physicsSimulation";
import { EntityManager } from "../entities/entityManager";
import { deepCopy } from '../general/utils';
import { Time } from '../general/time';

export default class Simulation{
  /**
   * @constructor
   * @param {object} stopCondition - object which contains three methods:
   *   @property {function} check - returns true, if simulation ends
   *     @param {EntityManager} entityManager
   *     @param {Time} time
   *   @property {function} reset - resets side effects before the next simulation
   *   @property {function} result - returns object that indicates a result of the simulation, np. win, lose
   * @param {function} setupEntityManager - adds crucial objects to EntityManager like a puck, hockey gate, walls etc.
   */
  constructor(stopCondition, setupEntityManager, entityManager){ 
    this.stopCondition = stopCondition;

    this.entityManager = entityManager;
    this.simulation = new PhysicsSimulation(entityManager);
    this.observers = [];

    this.nextFrame = this.nextFrame.bind(this);

    setupEntityManager(this.entityManager);
  }

  startSimulation(){
    this.time = new Time(performance.now());
    this.stopCondition.reset();
    this.copy = this.makeCopy();

    this.nextFrame(0);
  }

  nextFrame(timestamp){
    this.time.nextStamp(timestamp);
    this.simulation.nextStep(this.time.deltaTime);

    if(!this.stopCondition.check(this.entityManager, this.time)){
      window.requestAnimationFrame(this.nextFrame);
    } else {
      this.notifySubscribers();
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
      observer(this.stopCondition.result());
    }
  }

  makeCopy(){ // TODO - refactor
    const entityManager = [];
    for(let [entity, view] of this.entityManager.entities){
      entityManager.push([deepCopy(entity),view]);
    }

    return {
      entityManager
    }
  }

  restoreCopy({entityManager}){
    this.entityManager.entities = entityManager;
  }
}