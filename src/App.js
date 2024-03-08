
import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const stringCalculator = (numbersString) => {

    if (numbersString === "") return 0;

    let numbers = numbersString.split(',').map(Number);
    numbers = numbers.filter(x => x < 1000);

    if (numbersString.includes("-")) {
      const negativeNumbers = numbersString.split(',').map(Number).filter(num => num < 0).join(", ");
      return `Negative numbers not allowed: ${negativeNumbers}`;
    }

    if (numbersString.includes('\n')) {
      numbers = numbersString.replace(/\n/g, ",").split(',').map(Number);
    }

    if (numbersString.startsWith("//")) {
      numbers = numbersString.split("\;").map(x => JSON.parse(x.match(/\d+/)));
    }

    if (numbersString.includes('*')) {
      numbers = numbersString.split("*").map(x => JSON.parse(x.match(/\d+/)));
    }

    if (numbersString.includes('[*][%]')) {
      numbers = numbersString.replace(/[!@#%&*]/g, ',').split(",").map(x => JSON.parse(x.match(/\d+/)));
    }

    if (numbersString.split(',').includes('\\n')) {
      return "Invalid";
    }

    return numbers.reduce((acc, val) => acc + val, 0);

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(stringCalculator(input))
  }
  return (
    <div>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Calculate</button>
      </form>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;