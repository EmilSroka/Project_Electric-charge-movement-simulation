import { Rectangle, Circle, Coordinates } from './../general/geometrics'

export function collisionCheckerFactory(shape1, shape2){
  if(shape1 instanceof Rectangle && shape2 instanceof Rectangle){
    return rectangleRectangleCollision;
  } else if (shape1 instanceof Circle && shape2 instanceof Circle){
    return circleCircleCollision;
  } else if (shape1 instanceof Rectangle && shape2 instanceof Circle) {
    return rectangleCircleCollision;
  } else if (shape1 instanceof Circle && shape2 instanceof Rectangle){
    return circleRectangleCollision;
  } else {
    throw new Error("Unexpected shape");
  }
}

export function circleCircleCollision(circle1, circle2){
  const distance = circle1.center.distance(circle2.center);
  const radiusSum = circle1.radius + circle2.radius;
  
  if(distance <= radiusSum){
    return true;
  } else {
    return false;
  }
}

export function rectangleRectangleCollision(rectangle1, rectangle2){
  const {
    topLeft: R1topLeft, 
    bottomRight: R1bottomRight
  } = rectangle1.getPoints();
  const {
    topLeft: R2topLeft, 
    bottomRight: R2bottomRight
  } = rectangle2.getPoints();
  
  if (R1topLeft.x <= R2bottomRight.x && R1bottomRight.x >= R2topLeft.x &&
      R1bottomRight.y <= R2topLeft.y && R1topLeft.y >= R2bottomRight.y){
    return true;
  } else {
    return false;
  }
}

export function circleRectangleCollision(circle, rectangle){
  return rectangleCircleCollision(rectangle, circle);
}

export function rectangleCircleCollision(rectangle, circle){
  const {topLeft, topRight, bottomRight, bottomLeft} = rectangle.getPoints();

  if(circle.center.isInsideRectangle(rectangle)){
    
    return true;
  }

  if( circle.intersectLineSegment(topLeft, topRight) ||
      circle.intersectLineSegment(topRight, bottomRight) ||
      circle.intersectLineSegment(bottomRight, bottomLeft) ||
      circle.intersectLineSegment(bottomLeft, topLeft)){
    return true;   
  }

  return false;
}

export function collision(entity1, entity2){
  if(entity1.previousCollider === entity2)
    return;

  const angle = calculateAngle(entity1.getCenter(), entity2.getCenter());

  const u1 = rotate(entity1.velocity, angle);
  const u2 = rotate(entity2.velocity, angle);

  const {v1, v2} = calculateVelocity(u1, u2, entity1.mass, entity2.mass);

  entity1.velocity = rotate(v1, -angle);
  entity2.velocity = rotate(v2, -angle);

  entity1.previousCollider = entity2;
  entity2.previousCollider = entity1;
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
      u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      u2.y
    )
  }
}