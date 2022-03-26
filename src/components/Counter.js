import React from "react";
import useCounter from "../custom hooks/useCounter";

// all the functionality from useCounter custom hook

const Counter = () => {
  const [counter, increament, decreament, reset] = useCounter(0, 5, 10);

  return (
    <div>
      <h1>counter: {counter}</h1>
      <button onClick={increament}>increment</button>
      <button onClick={decreament}>decreament</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default Counter;
