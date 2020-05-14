class StopCondition{
  constructor(){
    this.i = 0;
  }

  check(){
    this.i++;
    return this.i > 1000;
  }

  reset(){
    this.i = 0;
  }

  result() {}
}

import css from './style.css';
import { Visualization } from './visualization/visualization';
import { electronFactory } from './entities/factories/electronFactory';
import { protonFactory } from './entities/factories/protonFactory';
import { EntityManager } from './entities/entityManager';

import Simulation from './simulation/simulation';

const entityManager = new EntityManager();
const visualization = new Visualization("#visualization", entityManager);
const simulation = new Simulation(new StopCondition(), setupEntityManager, entityManager);
simulation.startSimulation();

function setupEntityManager(entityManager){
  entityManager.add(electronFactory(50, 540));
  entityManager.add(protonFactory(1030,540));
}