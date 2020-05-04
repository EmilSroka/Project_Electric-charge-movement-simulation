export class Coordinates {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  translate(x, y){
    this.x += x;
    this.y += y;
  }
}

export class Rectangle{
  constructor(point, width, height){
    this.topLeftCorner = point;
    this.width = width;
    this.height = height;
  }

  move(x, y){
    this.topLeftCorner.translate(x,y);
  }
}

export class Circle{
  constructor(center, radius){
    this.center = center;
    this.radius = radius;
  }

  move(x, y){
    this.center.translate(x,y);
  }
}