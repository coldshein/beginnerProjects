import { useState } from 'react';
import './index.scss';

function App() {
  let [count, setCount] = useState(0);
  const decrement =  () => {
    setCount(--count);
  }
  const increment = () => {
    setCount(++count);
  }
  return (
    
    <div className="App">
      <div>
        <h2>Counter:</h2>
        <h1>{count}</h1>
        <button className="minus" onClick={decrement}>- Decrement</button>
        <button className="plus" onClick={increment}>increment +</button>
      </div>
    </div>
  );
}

export default App;
