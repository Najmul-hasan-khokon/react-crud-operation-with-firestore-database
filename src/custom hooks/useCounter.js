import { useState } from "react";

const useCounter = (initialValue, updateIncreament, updateDecreament) => {
  const [counter, setCounter] = useState(initialValue);
  //   const [reset, setReset] = useState('')
  function increament() {
    setCounter(counter + updateIncreament);
  }
  function decreament() {
    setCounter(counter - updateDecreament);
  }
  function reset() {
    setCounter(initialValue);
  }

  return [counter, increament, decreament, reset];
};

export default useCounter;
