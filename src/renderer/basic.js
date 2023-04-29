import * as math from 'mathjs'
import Qty from 'js-quantities/esm';
import * as chrono from 'chrono-node';

export default function calculate(input) {
  return math.evaluate(input)
}