import { Coordinates } from "../general/geometrics";
import { StateFactory } from "./states/stateFactory";

export class UIController {
  constructor(canvas, unitTranslator, entityManager, state){
    this.state = state;
    this.canvas = canvas;
    this.unitTranslator = unitTranslator;
    this.entityManager = entityManager;

    this.setUpEventListeners();

    this.moveSum = 0;
  }

  setState(state){
    this.state = state;
  }

  setUpEventListeners(){
    this.canvas.addEventListener('mousemove', (event) => {
      const simulationCoordinates = this.unitTranslator.pageToSimulation(new Coordinates(event.clientX, event.clientY));
      this.state.mouseMove(simulationCoordinates, this.entityManager);
    });

    this.canvas.addEventListener('mouseout', (event) => {
      const simulationCoordinates = this.unitTranslator.pageToSimulation(new Coordinates(event.clientX, event.clientY));
      this.state.mouseOut(simulationCoordinates, this.entityManager);
    });

    this.canvas.addEventListener('mouseover', (event) => {
      const simulationCoordinates = this.unitTranslator.pageToSimulation(new Coordinates(event.clientX, event.clientY));
      this.state.mouseOver(simulationCoordinates, this.entityManager);
    })

    this.canvas.addEventListener('mousedown', (event) => {
      const simulationCoordinates = this.unitTranslator.pageToSimulation(new Coordinates(event.clientX, event.clientY));
      this.state.mouseDown(simulationCoordinates, this.entityManager);
    });

    this.canvas.addEventListener('mouseup', (event) => {
      const simulationCoordinates = this.unitTranslator.pageToSimulation(new Coordinates(event.clientX, event.clientY));
      this.state.mouseUp(simulationCoordinates, this.entityManager);
    });
  }
}