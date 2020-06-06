import { electronFactory } from '../entities/factories/electronFactory';
import { hasCharge } from '../entities/decorators/electricalDecorator';
import { forcesFromElectricity } from '../simulation/electricCharge';
import { PositionVector } from '../general/geometrics';
import { getColor, BLACK } from '../general/colors';

export class FieldVisualisation{
  constructor(){
    [this.q] = electronFactory(0,0); 
    this.force = new PositionVector(0,0);
  }

  draw(entityManager, painter, width, height, step){
    for(let x = step/2; x < width; x += step){
      for(let y = step/2; y < height; y += step){
        this.q.center.x = x; this.q.center.y = y;
        this.force.x = 0; this.force.y = 0;

        const entites = entityManager.filter(hasCharge);
        for(const entity of entites){
          const [force] = forcesFromElectricity(this.q, entity);
          this.force = this.force.sum(force)
        }

        this.force = this.force.normalize().multiply(step/2);
        //this.force = this.force.multiply(step * 1e32); // xD
        this.force = this.force.sum(this.q.center);
        painter.drawArrow(this.q.center, this.force, getColor(BLACK));
      }
    }
  }
}