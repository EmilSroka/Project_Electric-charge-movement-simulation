
import { Canvas } from './visualization/canvas';
import { EntityManager } from './entities/entityManager';

import Simulation from './simulation/simulation';
import { HardMode } from './simulation/modes/hardMode';
import { RandomMode } from './simulation/modes/randomMode'; 
import { wait } from "./general/utils";

const canvasSelector = '#visualization';

export class Controller{
  init(){
    const entityManager = new EntityManager();
    const canvas = new Canvas(canvasSelector, entityManager);
    const simulation = new Simulation(new HardMode(), entityManager);
    // simulation.startSimulation();
    simulation.subscribeSimulationEnd(async(result) => {
      simulation.reset();
      await wait(5000);
      simulation.startSimulation();
    })
  }
}



