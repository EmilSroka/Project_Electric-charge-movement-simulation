export class Coordinates {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

export class Rectangle{
  constructor(point, width, height){
    this.topLeftCorner = point;
    this.width = width;
    this.height = height;
  }
}

export class Circle{
  constructor(center, radius){
    this.center = center;
    this.radius = radius;
  }
}