import { bisection } from './component/calculate/bisection';
import { false_position } from './component/calculate/false';
import { newton } from './component/calculate/newton';
import { secant } from './component/calculate/secant';
import { fixed_point } from './component/calculate/fixpoint';

const data = {
  "f(x)":"x^2 - 9",
  XL:0, //for bisection and false position
  XR:4,

  X:1, //for newton raphson

  X1:0, //for secant method
  X0:1,
}
const ans = 3; // for data above

const datafix = {
  "f(x)":"x^2 - x - 1",
  "g(x)":"1 + 1/x",
  X:1,
}
const ans2 = 1.6180338; // for data above

describe('bisection', () => {
  test('calculate correctly', () => {
    expect(bisection(data)["ans"]).toBeCloseTo(ans, 5);
  });
});

describe('false position', () => {
  test('calculate correctly', () => {
    expect(false_position(data)["ans"]).toBeCloseTo(ans, 5);
  });
});

describe('newton raphson', () => {
  test('calculate correctly', () => {
    expect(newton(data)["ans"]).toBeCloseTo(ans, 5);
  });
});

describe('secant', () => {
  test('calculate correctly', () => {
    expect(secant(data)["ans"]).toBeCloseTo(ans, 5);
  });
});

describe('fixed point iteration', () => {
  test('calculate correctly', () => {
    expect(fixed_point(datafix)["ans"]).toBeCloseTo(ans2, 5);
  });
});