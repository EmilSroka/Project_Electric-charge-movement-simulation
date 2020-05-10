export function collisionCheckerFactory(shape1, shape2){
  // check shape types
  // return proper collision

  if(shape1.constructor.name == "Rectangle" && shape2.constructor.name == "Rectangle"){
    console.log(1);
    collisionResponse(shape1,shape2);
    return shape1,shape2;
  }
  else if ( shape1.constructor.name == "Rectangle" && shape2.constructor.name == "Circle"){
    console.log(2);
    collisionResponse(shaep1,shaep2);
    return shape1,shape2;
  }
  else if ( shape1.constructor.name == "Circle" && shape2.constructor.name == "Rectangle"){
    console.log(3);
    collisionResponse(shape1,shape1);
    return shape1,shape2;
  }
  else if ( shape1.constructor.name == "Circle" && shape2.constructor.name == "Circle"){
    console.log(4);
    circleCircleCollisionResponse(shape1,shape2);
    return shape1,shape2;
  }
  else
  return false;

}

function collisionResponse(rectangle1,rectangle2){

  var y_velocity1 = rectangle1.y_velocity;
  var x_velocity1 = rectangle1.x_velocity;
  var mas1  = rectangle1.mas;

  var y_velocity2 = rectangle2.y_velocity;
  var x_velocity2 = rectangle2.x_velocity;
  var mas2  = rectangle2.mas;


  rectangle1.y_velocity = ( (mas1 - mas2)/(mas1+mas2) )*y_velocity1 + ( (2*mas2)/(mas1+mas2) )*y_velocity2;
  rectangle2.y_velocity = ( (mas1 - mas2)/(mas1+mas2) )*y_velocity2 + ( (2*mas2)/(mas1+mas2) )*y_velocity1;

  rectangle1.x_velocity = ( (mas1 - mas2)/(mas1+mas2) )*x_velocity1 + ( (2*mas2)/(mas1+mas2) )*x_velocity2;
  rectangle1.x_velocity = ( (mas1 - mas2)/(mas1+mas2) )*x_velocity2 + ( (2*mas2)/(mas1+mas2) )*x_velocity1;

  return true;
}
function circleCircleCollisionResponse(circle1 , circle2){//Because they always have same mas ?

  var y_velocity = circle2.y_velocity;
  var x_velocity = circle2.x_velocity;

  circle2.x_velocity = circle1.x_velocity;
  circle2.y_velocity = circle1.y_velocity;

  circle1.x_velocity = x_velocity;
  circle1.y_velocity = y_velocity;

  return circle1,circle2;

}


function circleCircleCollision(circle1, circle2){
    // check if two circle collides
    // returns boolean
    var radius_sum = circle1.radius + circle2.radius;
    var x_distance = circle1.center.x - circle2.center.x;
    var y_distance = circle1.center.y - circle2.center.y; 
  
    var distance_between_centres = x_distance*x_distance + y_distance*y_distance;
    
    if(distance_between_centres <= radius_sum*radius_sum){
    return true;}
    else{
    return false;}
  
}

function isInsideRectangle(rectangle,point){
  // check if point is in rectangle
  //return boolean

  if( point.x >= rectangle.topLeftCorner.x &&
      point.x <= ( rectangle.topLeftCorner.x + rectangle.width) &&
      point.y <= rectangle.topLeftCorner.y &&
      point.y >= (rectangle.topLeftCorner.y - rectangle.height))
    return true;
  else
    return false;

}

function isInsideCircle(circle,point){
  //check if point is in circle
  // return boolean
  var distance = sqrt((circle.center.x - point.x)^2 + (circle.center.y - point.y)^2 );
  if (distance <= circle.radius)
    return true;
  else
  return false;

}


function rectangleRectangleCollision(rectangle1, rectangle2){
  // check if two rectangles collides
  // returns boolean
  const point1 = {x:rectangle2.topLeftCorner.x , y:rectangle2.topLeftCorner.y};
  const point2 = {x:rectangle2.topLeftCorner.x + rectangle2.width , y:rectangle2.topLeftCorner.y};
  const point3 = {x:rectangle2.topLeftCorner.x , y:rectangle2.topLeftCorner.y - rectangle2.height};
  const point4 = {x:rectangle2.topLeftCorner.x + rectangle2.width, y:rectangle2.topLeftCorner.y - rectangle2.height};
  if( isInsideRectangle(rectangle1,point1))
    return true;
  else if ( isInsideRectangl(rectangle1,point2))
    return true;
  else if ( isInsideRectangle(rectangle1, point3))
    return true;
  else if ( isInsideRectangle(rectangle1,point4))
    return true;
  else
  return false;
}

function twoPointDistance(point1,point2){
 //Returns distance between two points 
 //Helps with circle-rectanglecollisions   
  var x_distance = point1.x - point2.x;
  var y_distance = point1.y - point2.y;
  return Math.sqrt(Math.pow(x_distance,2) + Math.pow(y_distance,2),2);
}



function rectangleCircleCollision(circle, rectangle){
  // check if circle and rectangle collides
  // returns boolean
  var main_point = rectangle.topLeftCorner;
  var width = rectangle.width;
  var height = rectangle.height;
  //Divide area around rectangle into 8 specific areas topleft,top, topright etc
  // In different areas we will take different aproach
 if(circle.center.x <= main_point.x && circle.center.y >= main_point.y){//topleft 
  console.log(1);
    if(twoPointDistance(main_point,circle.center) <= circle.radius){
      return true;
    }
  }
  else if (circle.center.x > main_point.x && circle.center.x <= main_point.x + width && circle.center.y >= main_point.y){//top
    console.log(2);
    if(circle.center.y - main_point.y <= circle.radius){
      return true;
    }
  }
  else if ( circle.center.x > main_point.x + width && circle.center.y >= main_point.y ){//topright
    console.log(3);
    if(twoPointDistance(circle.center,{x:main_point.x+width,y:main_point.y}) <= circle.radius)
      return true;
  }
  else if ( circle.center.x > main_point.x + width && circle.center.y < main_point.y && circle.center.y >= main_point.y-height ){//middle right
    console.log(4);
    if(circle.center.x - main_point.x <= circle.radius){
      return true;
    }
  }
  else if (circle.center.x > main_point.x + width && circle.center.y <= main_point.y -height){//bottom right
    console.log(5);
    if(twoPointDistance(circle.center,{x:main_point.x + width, y: main_point.y-height}) <= circle.radius){
      return true;
    }
  }
  else if ( circle.center.x > main_point.x && circle.center.x <= main_point.x + width && circle.center.y <= main_point.y - height ){//bottom middle
    console.log(6);
    if( main_point.y - circle.center.y <= circle.radius){
      return true;
    }
  }
  else if ( circle.center.x <= main_point.x && circle.center.y <= main_point.y - height){//bottom left
    console.log(7);
    if (twoPointDistance(circle.center,{x:main_point.x,y:main_point.y - height}) <= circle.radius){
      return true;
    }
  }
  else if ( circle.center.x <= main_point.x && circle.center.y >= main_point.y - height && circle.center.y <= main_point.y ){
    console.log(8);
    if ( main_point.x - circle.center.x <= circle.radius){
      return true;
    }
  }
  else{
    return false;
  }
  return false;


}



//          ___|________|_______
//             |        |
//             |        |
//          ___|________|_______
//             |        |