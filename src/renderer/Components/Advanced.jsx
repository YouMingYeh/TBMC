import '.././App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import advanced from '../advanced'
import "tailwindcss/tailwind.css";

import { parse, simplify, evaluate } from 'mathjs';
// const cannot be used since nerdamer gets modified when other modules are loaded  
var nerdamer = require('nerdamer'); 
// Load additional modules. These are not required.  
require('nerdamer/Algebra'); 
require('nerdamer/Calculus'); 
require('nerdamer/Solve'); 
require('nerdamer/Extra');


function evaluateExpression(input) {
  let result;
  try {
    // Try parsing input as an equation

    if(input.includes('x') && input.includes('=')){
        try{
            var sol = nerdamer.solve(input, 'x');
            if(sol.symbol[0]){
                if(sol.symbol[0].value == '#')
                    throw "err"
            }
            return 'x = ' + sol.text().toString()
        } catch (error) {
            const parts = input.split('=');
            const left = parts[0].trim();
            const right = parts[1].trim();
            console.log(error)
            if(left.includes('x') && right.includes('x')){
                if(simplify(left).toString() == simplify(right).toString()){
                    console.log
                    return "TRUE"
                } else {
                    return "FALSE"
                }
            } 
        }
        
    }
    
    if(input.includes('=')){
        const parts = input.split('=');
        const left = parts[0].trim();
        const right = parts[1].trim();
        if(evaluate(left) == evaluate(right)){
            return "TRUE"
        } else {
            return "FALSE"
        }
    }

    // Try to simplify the equation
    if(input.includes('x')){
        result = simplify(input);
        console.log(result)
        return result
    }
    return evaluate(input);
}catch (error) {
    return "ERROR"
}
}

function solveEquation(equation, symbol) {
  const solved = equation.solve(symbol);
  if (solved.length === 1) {
    return solved[0].toString();
  } else {
    return solved.map((node) => node.toString()).join(', ');
  }
}


export default function Advanced() {
  // In this component, user can type in the container, and each line of the typed string is set to be the input state.
  const [input, setInput] = useState([]);

  // mathjs will calculate the output of the input state.
  const [output, setOutput] = useState([]);

  // Handle input change
  const handleInputChange = (event) => {
    const lines = event.target.value.split('\n');
    setInput(lines);
  };

  // Calculate output based on input state
  const calculateOutput = () => {
    let newOutput = [];
    for (let i = 0; i < input.length; i++) {
      try {

          let result = evaluateExpression(input[i]);
        if (typeof result === 'function') {
          newOutput.push('function?');
        } else {
          newOutput.push(result);
        }
      } catch (error) {
        newOutput.push(input[i]);
      }
    }

    setOutput(newOutput);
  };

  const applyStyles = (input) => {

    let output = input.split('\n').map((text) => {

        if(text == 'TRUE' || text == 'FALSE') {
            return `<span class="binary">${text}</span>`;
        }
      let cnt = 0;
      const operators = '+-*/';
      const endsWithOperator = operators.includes(text.slice(-1));
      if (endsWithOperator) return `<span class="warning">${text}</span>`;


      // Match operators and apply yellow color
      text = text.replace(/(\+|\-|\*|\/)/g, (match) => {
        cnt++;
        return `<span class="warning">${match}</span>`;
      });

      // Match numbers and apply blue color

      text = text.replace(/\b(\d+\.?\d*)\b/g, (match) => {
        cnt++;
        match = parseFloat(match);
        match = match.toLocaleString('en-US');

        return `<span class="number">${match}</span>`;
      });

      // Match functions and apply green color
      text = text.replace(/\b(sqrt|sin|cos|tan|log)\b/g, (match) => {
        cnt++;
        return `<span class="warning">${match}</span>`;
      });

      text = text.replace(/\(|\)/g, (match) => {
        cnt++;
        return `<span class="warning">${match}</span>`;
      });

      if (cnt == 0) {
        if (text === 'ERROR') {
          return `<span class="error">ERROR</span>`;
        } else {
          return `<span class="number">${text}</span>`;
        }
      }

      return `<span class="number">${text}</span>`;
    });

    return output.join('<br/>');
  };

  useEffect(() => {
    calculateOutput();
  }, [input]);

  return (
    <div className="container">
      <Link  to="/">
        <span className='title '>Text Calculator<span >    Advanced</span></span>
        
      </Link>
      <div className='editor'>
        <textarea
          value={input.join('\n')}
          onChange={handleInputChange}
          className="input "
        />

        <div
          className="output "
          dangerouslySetInnerHTML={{
            __html: applyStyles(output.join('\n')),
          }}
        ></div>
      </div>
    </div>
  );
}
