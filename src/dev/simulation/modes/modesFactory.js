import { EasyMode } from './easyMode';
import { MediumMode } from './mediumMode';
import { HardMode } from './hardMode';
import { RandomMode } from './randomMode';
import { FreeMode } from './freeMode';
import { VisualizationMode } from './visualizationMode';

export const SimulationModes = {
  easy: 'Easy mode',
  medium: 'Medium mode',
  hard: 'Hard mode',
  random: 'Random mode',
  free: 'Free mode',
  visualization: 'Visualization of orbiting'
}

export class ModesFactory{
  constructor(entityManager){
    this.easyMode = new EasyMode(entityManager);
    this.mediumMode = new MediumMode(entityManager);
    this.hardMode = new HardMode(entityManager);
    this.randomMode = new RandomMode(entityManager);
    this.freeMode = new FreeMode(entityManager);
    this.visualization = new VisualizationMode(entityManager);
  }

  get(mode){
    switch(mode){
      case SimulationModes.easy:
        return this.easyMode;
      case SimulationModes.medium:
        return this.mediumMode;
      case SimulationModes.hard:
        return this.hardMode;
      case SimulationModes.random:
        return this.randomMode;
      case SimulationModes.free:
        return this.freeMode;
      case SimulationModes.visualization:
        return this.visualization;
    }
  }
}