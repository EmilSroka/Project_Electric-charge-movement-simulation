import { Rectangle, Circle } from './../general/geometrics';

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