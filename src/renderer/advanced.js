import * as math from 'mathjs';

export default function evaluateExpression(expression) {
  // Check if the expression contains an equation
  if (expression.includes('=')) {
    const parts = expression.split('=');
    const left = parts[0].trim();
    const right = parts[1].trim();

    // Check if the equation is linear
    if (left.includes('x') && right.includes('x')) {
      const leftParts = left.split('x');
      const rightParts = right.split('x');
      
      // Extract coefficients and constants
      const leftCoeff =
        leftParts[0].trim() === '' ? 1 : parseFloat(leftParts[0].trim());
      const rightCoeff =
        rightParts[0].trim() === '' ? 1 : parseFloat(rightParts[0].trim());
      const leftConst = parseFloat(leftParts[1].trim());
      const rightConst = parseFloat(rightParts[1].trim());

      // Solve for x
      const x = (rightConst - leftConst) / (leftCoeff - rightCoeff);
      return `x = ${x}`;
    }
  }

  // Check if the expression contains an exponent
  if (expression.includes('^')) {
    const parts = expression.split('^');
    const base = parts[0].trim();
    const exponent = parseFloat(parts[1].trim());

    // Check if the base contains a variable
    if (base.includes('x')) {
      // Check if the exponent is an integer
      if (Number.isInteger(exponent)) {
        const coeff = Math.pow(parseFloat(base), exponent);
        return `${coeff}x^${exponent}`;
      }
    }
  }

  // If no special cases apply, use math.js to evaluate the expression
  const result = math.evaluate(expression);
  
  return result;
}
