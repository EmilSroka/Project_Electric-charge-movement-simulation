import { isBetween, deepCopy } from './../general/utils';
import { Rectangle, Circle, Coordinates } from './../general/geometrics';

export function collision(entity1, entity2, [shape1, shape2]){
  if(entity1.previousCollider === entity2 && entity2.previousCollider === entity1)
    return;
    
  const angle = calculateAngle(...getPoints(shape1, shape2));

  const u1 = rotate(entity1.velocity, angle);
  const u2 = rotate(entity2.velocity, angle);

  const {v1, v2} = calculateVelocity(u1, u2, entity1.mass, entity2.mass);

  entity1.velocity = rotate(v1, -angle);
  entity2.velocity = rotate(v2, -angle);

  entity1.previousCollider = shape2;
  entity2.previousCollider = shape1;
}

function getPoints(shape1, shape2){
  if(shape1 instanceof Circle && shape2 instanceof Circle){
    return [shape1.center, shape2.center];
  } else if ( shape1 instanceof Rectangle && shape2 instanceof Circle ){
    return [getCollisionPoint(shape2, shape1), shape2.center];
  } else if ( shape1 instanceof Circle && shape2 instanceof Rectangle){
    return [shape1.center, getCollisionPoint(shape1, shape2)];
  } else {
    throw new Error("Unsupported collision response");
  }

  // shape1 instanceof Rectangle && shape2 instanceof Rectangle
}

function getCollisionPoint(circle, rectangle){
  let x;
  if(isBetween(circle.center.x, rectangle.topLeftCorner.x, rectangle.topLeftCorner.x + rectangle.width)){
    x = circle.center.x;
  } else if(circle.center.x < rectangle.topLeftCorner.x){
    x = rectangle.topLeftCorner.x;
  } else {
    x = rectangle.topLeftCorner.x + rectangle.width;
  }

  let y;
  if(isBetween(circle.center.y, rectangle.topLeftCorner.y, rectangle.topLeftCorner.y - rectangle.height)){
    y = circle.center.y;
  } else if (circle.center.y > rectangle.topLeftCorner.y){
    y = rectangle.topLeftCorner.y
  } else {
    y = rectangle.topLeftCorner.y - rectangle.height;
  }

  return new Coordinates(x, y);
}

function rotate(velocity, angle) {
  return new Coordinates(
    velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  );
}

function calculateAngle(point1, point2){
  return -Math.atan2(point1.y - point2.y, point1.x - point2.x);
}

function calculateVelocity(u1, u2, m1, m2){
  return {
    v1: new Coordinates(
      u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      u1.y
    ),
    v2: new Coordinates(
      u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2),
      u2.y
    )
  }
}