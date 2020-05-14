import "babel-polyfill";

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
import { puckFactory } from './entities/factories/puckFactory';
import { gateFactory } from './entities/factories/gateFactory';
import { EntityManager } from './entities/entityManager';

import { tmpFactory } from './entities/factories/tmpFactory';

import Simulation from './simulation/simulation';

const entityManager = new EntityManager();
const visualization = new Visualization("#visualization", entityManager);
const simulation = new Simulation(new StopCondition(), setupEntityManager, entityManager);
simulation.startSimulation();

function setupEntityManager(entityManager){
  entityManager.add(gateFactory(1800, 400, 200, 350));
  entityManager.add(electronFactory(480, 540));
  // entityManager.add(protonFactory(1280, 200));
  entityManager.add(puckFactory(900,540));
  // entityManager.add(tmpFactory(1100, 900, 200, 200, -0.1, -0.1));
  // entityManager.add(tmpFactory(800, 400, 200, 350, 0.1, 0));
  
}