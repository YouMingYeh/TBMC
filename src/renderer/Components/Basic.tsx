import '.././App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { evaluate } from 'mathjs';
import calculate from '../basic';
import 'tailwindcss/tailwind.css';

export default function Basic() {
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
        console.log;
        let result = calculate(input[i]);
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
      let cnt = 0;
      const operators = '+-*/';
      const endsWithOperator = operators.includes(text.slice(-1));
      if (endsWithOperator) return `<span class="warning">${text}</span>`;

      console.log(text);

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
      <div className="header">
        <Link to="/advanced">
          <span className="title ">
            Text Calculator<span> Basic</span>
          </span>
        </Link>
      </div>
      <div className="editor">
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
