import { EntityManager } from "./entities/entityManager";
import { Simulation } from "./simulation/simulation";

// TMP
const deltaTime = 25;
const endCondition = i > 100;
let i = 0;

const entitiyManager = new EntityManager();
const simulation = new Simulation(entitiyManager);

while(endCondition){
  simulation.simulate();
  i++;
}