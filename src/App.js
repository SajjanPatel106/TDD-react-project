import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (numbersString) => {
    let numbers = numbersString.split(',').map(Number);
    return numbers.reduce((acc, curr) => acc + curr, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(handleAdd(input));
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} aria-label="input" />
        <button type="submit">Calculate</button>
      </form>
      <p>Result: {result}</p>
    </div>
  );
};

export default App;
