export class Simulation {
  constructor(entityManager){
    this.entityManager = entityManager;
  }

  nextStep(deltaTime){
    this.calculateElectricForces();
    this.simulate();
    this.handleCollisions();
  }

  calculateElectricForces(){
    // iterate over pairs of entities and calculate acceleration
  }

  simulate(){
    // iterate over entities and call 'simulate' methods
  }

  handleCollisions(){
    // iterate over pairs of entities
    // get proper collision type (collisionCheckerFactory)
    // bounding property of entity can be: Circle | Rectangle | Array of both types
    // if entities collide, call 'collision' method on both entities
  }

}