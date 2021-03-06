
import { Canvas } from './visualization/canvas';
import { EntityManager } from './entities/entityManager';

import Simulation from './simulation/simulation';
import { ModesFactory, SimulationModes } from './simulation/modes/modesFactory'; 
import { Result } from './simulation/modes/mode'
import { UIManager } from './visualization/uiManager';
import { States } from './visualization/states/stateFactory'
import { configurableElectronFactory } from './entities/factories/configurableElectronFactory';
import { configurableProtonFactory } from './entities/factories/configurableProtonFactory';
import { GREEN, RED, BLUE, BLACK } from './general/colors'
import { curtainFactory } from './entities/factories/curtainFactory';

import globalState from './general/state';

const canvasSelector = '#visualization';
const defaultMode = SimulationModes.easy;


export class Controller{
  init(){
    this.entityManager = new EntityManager();
    this.modesFactory = new ModesFactory(this.entityManager);
    this.canvas = new Canvas(canvasSelector, this.entityManager);
    this.simulation = new Simulation(
      this.modesFactory.get(defaultMode), 
      this.entityManager
    );
    this.ui = new UIManager();

    this.setUpUI();
    this.setUpEvents();
    this.updateCanvasSize();
  }

  setUpUI(){
    this.ui.setButtonTexts('Electrons', 'Protons');
    this.updateButtons();
    this.ui.setSelectOptions(Object.values(SimulationModes), SimulationModes.easy);
  }

  setUpEvents(){
    this.ui.addButtonCenterLeftListener(() => {
      const factory = this.canvas.getStateFactory();
      const state = factory.get(States.AddEntityState);
 
      if(this.canvas.getState() !== state){
        state.reset(configurableElectronFactory(-100, -100));
        this.canvas.setState( state ); 
      }
    });

    this.ui.addButtonCenterRightListener(() => {
      const factory = this.canvas.getStateFactory();
      const state = factory.get(States.AddEntityState);
 
      if(this.canvas.getState() !== state){
        state.reset(configurableProtonFactory(-100, -100));
        this.canvas.setState( state ); 
      }
    });

    this.ui.addOptionListener(event => {
      const newMode = this.modesFactory.get(event.target.value);

      this.simulation.setMode(newMode);
      this.updateButtons();
      this.updateCanvasSize();
      
    });

    this.ui.addStartListener(() => {
      this.simulation.startSimulation();
      this.ui.disableCenterLeftButton();
      this.ui.disableCenterRightButton();
      this.ui.disableSelectOptions();

      const factory = this.canvas.getStateFactory();
      this.canvas.setState( factory.get(States.StaticState) );
    })

    this.ui.addResetListener(async () => {
      this.simulation.stop();
      await this.simulation.waitUntilStop();
      this.simulation.reset();
      this.ui.setButtonState(true);
      this.updateButtons();
      this.ui.enableSelectOptions();

      const factory = this.canvas.getStateFactory();
      this.canvas.setState( factory.get(States.ConfigureState) );
    });

    this.ui.addCheckboxFVListener(event => {
      this.canvas.setVisualizeFieldState(event.target.checked); 
    });

    this.ui.addCheckboxFSListener(event => {
      globalState.setValue('fixedStep', event.target.checked);
    });

    this.entityManager.addOnAddListener(() => {
      const factory = this.canvas.getStateFactory();
      if(this.canvas.getState() !== factory.get(States.StaticState))
        this.updateButtons();
    });

    this.entityManager.addOnRemoveListener(() => {
      this.updateButtons();
    })

    this.simulation.subscribeSimulationEnd(result => {
      if(result !== Result.unknown){
        this.displayResult(result);
      }
    });
  }

  updateCanvasSize(){
    const [width, ratio] = this.simulation.getCurrentMode().getDimensions();
    this.canvas.resize(width, ratio);
  }

  // helpers

  displayResult(result){
    let color;
    let text 
    if(result === Result.win){
      color = GREEN;
      text = 'win';
    } else if(result === Result.lose) {
      color = RED;
      text = 'lose';
    } else if(result === Result.draw){
      color = BLUE;
      text = 'draw';
    } else {
      color = BLUE;
      text = 'Unknown result';
    }

    const resultDisplay = curtainFactory(960, 540, text, 1920, 1080, BLACK, 96, color, 0.4);
    this.entityManager.add(resultDisplay);
  }

  updateButtons(){
    const [electrons, protons] = this.simulation.getCurrentMode().getEntityLimit(this.entityManager);
    this.ui.setState(electrons, protons);
    (electrons < 1) ? this.ui.disableCenterLeftButton() : this.ui.enableCenterLeftButton(); 
    (protons < 1) ? this.ui.disableCenterRightButton() : this.ui.enableCenterRightButton();
  }
}



