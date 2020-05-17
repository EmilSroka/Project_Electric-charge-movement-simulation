import { Mode } from './mode';

import { puckFactory } from '../../entities/factories/puckFactory';
import { gateFactory } from '../../entities/factories/gateFactory';
import { gateBorderFactory, Side } from '../../entities/factories/gateBorderFactory';
import { borderFactory } from '../../entities/factories/borderFactory';
import { wallFactory } from '../../entities/factories/wallFactory';

export class EasyMode extends Mode {
  onInit(entityManager){
    entityManager.add(puckFactory(400,540));
    entityManager.add(wallFactory(1900, 540, 40, 1000));
    entityManager.add(wallFactory(960, 1060, 1920, 40));
    entityManager.add(wallFactory(960, 20, 1920, 40));
    entityManager.add(borderFactory(20, 540, 40, 1000));
    entityManager.add(gateFactory(1620, 540, 150, 340));
    entityManager.add(gateBorderFactory(1600, 540, Side.left, 200, 350));
  }
}