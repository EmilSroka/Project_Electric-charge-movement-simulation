import { Mode } from './mode';

import { puckFactory } from '../../entities/factories/puckFactory';
import { gateFactory } from '../../entities/factories/gateFactory';
import { gateBorderFactory, Side } from '../../entities/factories/gateBorderFactory';
import { borderFactory } from '../../entities/factories/borderFactory';
import { wallFactory } from '../../entities/factories/wallFactory';
import { curtainFactory } from '../../entities/factories/curtainFactory';
import { isCurtain } from '../../entities/decorators/curtainDecorator';
import { Coordinates } from '../../general/geometrics';
import { protonFactory } from '../../entities/factories/protonFactory';
import { electronFactory } from '../../entities/factories/electronFactory';

const curtainText = 'Area of opposite team';
const curtainTopLeft = new Coordinates(960, 1040);
const curtainBottomRight = new Coordinates(1880, 40);

export class RandomMode extends Mode {
  constructor(){
    super(); 
    this.electrons = 2;
    this.protons = 2;
  }

  onInit(entityManager){
    entityManager.clear();

    entityManager.add(puckFactory(960,540));
    entityManager.add(wallFactory(1900, 540, 40, 1000));
    entityManager.add(wallFactory(20, 540, 40, 1000));
    entityManager.add(wallFactory(960, 1060, 1920, 40));
    entityManager.add(wallFactory(960, 20, 1920, 40));
    entityManager.add(gateFactory(1620, 540, 140, 330));
    entityManager.add(gateBorderFactory(1600, 540, Side.left, 200, 350));
    entityManager.add(borderFactory(300, 540, 140, 330));
    entityManager.add(gateBorderFactory(320, 540, Side.right, 200, 350));
    entityManager.add(curtainFactory(...calculateInput()));
  }

  onStart(entityManager){
    this.copy = entityManager.takeSnapshot();
    deleteCurtain(entityManager);
    insert(protonFactory, 2, curtainTopLeft, curtainBottomRight, entityManager);
    insert(electronFactory, 2, curtainTopLeft, curtainBottomRight, entityManager);
  }
}

function calculateInput(){
  return [
    (curtainTopLeft.x + curtainBottomRight.x) / 2,
    (curtainTopLeft.y + curtainBottomRight.y) / 2,
    curtainText,
    curtainBottomRight.x - curtainTopLeft.x,
    curtainTopLeft.y - curtainBottomRight.y
  ];
}

function deleteCurtain(entityManager) {
  entityManager.deleteByCondition(isCurtain);
}

function insert(entityFactory, number, topLeft, bottomRight, entityManager){
  let count = 0
  while(count < number){
    const targetCenter = getRandomPoint(topLeft, bottomRight, 40); // 40 -> proton / electron radius
    const newEntity = new entityFactory(targetCenter.x, targetCenter.y);
    if(entityManager.isFreeArea(newEntity[0])){
      entityManager.add(newEntity);
      count += 1;
    }
  }
}  

function getRandomPoint(topLeft, bottomRight, padding = 0){
  const xStart = topLeft.x + padding;
  const xEnd = bottomRight.x - padding;
  const yStart = bottomRight.y + padding;
  const yEnd = topLeft.y - padding;
  return new Coordinates(
    randomInRange(xStart, xEnd),
    randomInRange(yStart, yEnd)
  );
}

function randomInRange(start, end){
  const range = end - start;
  return start + Math.random() * range; 
}