import { deepCopy } from "./utils";

export class Coordinates {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  isInsideRectangle(rectangle){  
    if( this.x >= rectangle.topLeftCorner.x &&
        this.x <= ( rectangle.topLeftCorner.x + rectangle.width) &&
        this.y <= rectangle.topLeftCorner.y &&
        this.y >= (rectangle.topLeftCorner.y - rectangle.height)){
      return true;
    } else {
      return false;
    }
  }

  isInsideCircle(circle){
    const distance = this.distance(circle.center);
    if (distance <= circle.radius) {
      return true;
    }else {
      return false;
    }
  }

  distance(point){
     const x_distance = this.x - point.x;
     const y_distance = this.y - point.y;
     return Math.sqrt(x_distance ** 2 + y_distance ** 2);
   }

  distanceFromLine(point1, point2){
    if(point1.x === point2.x){
      return Math.abs(this.x - point1.x);
    } else {
      // line general form: Ax + By + C = 0
      const A = point1.y - point2.y;
      const B = point2.x - point1.x;
      const C = -point1.y * (point2.x - point1.x) + point1.x * (point2.y - point1.y);

      return Math.abs(A * this.x + B * this.y + C) / Math.sqrt(A**2 + B**2);
    }
  }

  translate(x, y){
    this.x += x;
    this.y += y;

    return this;
  }
}

export class PositionVector extends Coordinates{
  static fromDifference(point1, point2){
    return new PositionVector(point1.x - point2.x, point1.y - point2.y);
  }

  constructor(x, y){
    super(x,y);
  }

  length(){
    return this.distance(new Coordinates(0,0));
  }

  normalize(){
    const vectorLength = this.length();

    return (vectorLength != 0) ? new PositionVector(this.x / vectorLength, this.y / vectorLength) : this;
  }

  dot(vector){
    return this.x * vector.x + this.y * vector.y;
  }

  multiply(scalar){
    return new PositionVector(this.x * scalar, this.y * scalar);
  }

  sum(vector){
    return new PositionVector(this.x + vector.x, this.y + vector.y);
  }

  dif(vector){
    return new PositionVector(this.x - vector.x, this.y - vector.y)
  }
}

export class Rectangle{
  constructor(point, width, height){
    this.topLeftCorner = point;
    this.width = width;
    this.height = height;
  }

  getPoints(){
    const topLeft = this.topLeftCorner;
    const topRight = deepCopy(topLeft).translate(this.width, 0);
    const bottomRight = deepCopy(topRight).translate(0, -this.height);
    const bottomLeft = deepCopy(bottomRight).translate(-this.width, 0);
    return { topLeft, topRight, bottomRight, bottomLeft }
  }

  move(x, y){
    this.topLeftCorner.translate(x,y);
  }

  getCenter(){
    return deepCopy(this.topLeftCorner).translate(0.5*this.width, -0.5*this.height);
  }
}

export class Circle{
  constructor(center, radius){
    this.center = center;
    this.radius = radius;
  }

  intersectLineSegment(point1, point2){ 
    const [closestEndPoint, farthestEndPoint] = [point1, point2].sort((a,b) => a.distance(this.center) - b.distance(this.center));

    const segment = PositionVector.fromDifference(farthestEndPoint, closestEndPoint);
    const normalizedSegment = segment.normalize();
    const vectorToOrigin = PositionVector.fromDifference(this.center, closestEndPoint);
    const vectorProjectionLength = vectorToOrigin.dot(normalizedSegment);

    let closest;
    if(vectorProjectionLength < 0){
      closest = closestEndPoint;
    } else if(vectorProjectionLength > vectorToOrigin.length()) {
      closest = farthestEndPoint;
    } else {
      const vectorProjection = normalizedSegment.multiply(vectorProjectionLength);
      closest = vectorProjection.sum(closestEndPoint);
    }

    if(closest.distance(this.center) <= this.radius){
      return true;
    } else {
      return false;
    }
  }

  move(x, y){
    this.center.translate(x,y);
  }

  getCenter(){
    return this.center;
  }
}