import {collisionCheckerFactory, circleCircleCollision, rectangleRectangleCollision, rectangleCircleCollision} from './collisionDetection';
import { Circle, Rectangle, Coordinates } from '../general/geometrics';

test('collisionCheckerFactory function returns proper collision checker based on arguments', () => {
  expect(
    collisionCheckerFactory(new Circle(), new Circle())
  ).toBe(circleCircleCollision);

  expect(
    collisionCheckerFactory(new Rectangle(), new Circle())
  ).toBe(rectangleCircleCollision);

  expect(
    collisionCheckerFactory(new Rectangle(), new Rectangle())
  ).toBe(rectangleRectangleCollision);
});

test.each([
  [0, 0, 2, 0, 0, 1, "should", true],
  [0, 0, 1, 2, 0, 1, "should", true],
  [0, 0, 3, 1, 0, 1, "should", true],
  [1, 1, 1.5, 2, 2, 1.5, "should", true],
  [5, 5, 1.5, 5, 7, 1.5, "should", true],
  [0, 0, 1, 2, 2, 1, "should not", false],
  [-3.46,-0.52, 1, -5.6, -0.88, 1, "should not", false]
])('Circle (x:%f y:%f r:%f) and circle (x:%f y:%f r:%f) %s collide', (x1, y1, r1, x2, y2, r2, _, expected) => {
  expect(
    circleCircleCollision(
      new Circle(new Coordinates(x1, y1), r1),
      new Circle(new Coordinates(x2, y2), r2)
    )
  ).toBe(expected);
});

test.each([
  [0, 0, 2, 2, 0.5, -0.5, 0.5, 0.5, "should", true],
  [0, 0, 2, 2, -1, -1, 2, 2, "should", true],
  [0, 0, 2, 2, 1, 1, 2, 2, "should", true],
  [0, 0, 2, 2, -1, 1, 2, 2, "should", true],
  [0, 0, 2, 2, 1, -1, 2, 2, "should", true],
  [0, 0, 2, 2, -0.5, -0.5, 1, 0.5, "should", true],
  [0, 0, 2, 2, 0.5, 0.5, 0.5, 1, "should", true],
  [0, 0, 2, 2, -2, 0, 2, 2, "should", true],
  [0, 0, 4, 2, 4, 2, 6, 6, "should", true],
  [0, 0, 2, 1, -0.25, -0.25, 3, 0.5, "should", true],
  [0, 0, 4, 2, 4, 2.1, 6, 6, "should", true],
  [-100, -100, 10, 5, 0, 0, 1, 1, "should not", false],
  [0, 0, 4, 2, 4.1, 2, 6, 6, "should not", false],
  [0, 0, 4, 2, 4, 2.1, 6, 2, "should not", false]
])('Rectangle (x:%f y:%f w:%f, h:%f) and rectangle (x:%f y:%f w:%f, h:%f) %s collide', (x1, y1, w1, h1, x2, y2, w2, h2, _, expected) => {
  expect(
    rectangleRectangleCollision(
      new Rectangle(new Coordinates(x1, y1), w1, h1),
      new Rectangle(new Coordinates(x2, y2), w2, h2)
    )
  ).toBe(expected);
});

test.each([
  [0, 0, 4, 4, 1.5, -2, 1, "should", true],
  [0, 0, 2, 4, 1, -2, 2, "should", true],
  [0, 0, 2, 2, 1, -1, 5, "should", true],
  [0, 0, 4, 4, -1, -2, 4, "should", true],
  [0, 0, 4, 4, -1, -2, 2, "should", true],
  [0, 0, 4, 4, -1, -2, 8, "should", true],
  [0, 1, 1, 3, 2, 2, Math.SQRT2, "should", true],
  [0, 0, 1, 1, 5, 5, 1, "should not", false],
  [1.1, 1, 1, 2, 0, 0, 1, "should not", false],
  [-3.01, -6.99, 5, 2, -5, -5, 2, "should not", false],
])('Rectangle (x:%f y:%f w:%f, h:%f) and circle (x:%f y:%f r:%f) %s collide', (x1, y1, w, h, x2, y2, r, _, expected) => {
  expect(
    rectangleCircleCollision(
      new Rectangle(new Coordinates(x1, y1), w, h),
      new Circle(new Coordinates(x2, y2), r)
    )
  ).toBe(expected);
});