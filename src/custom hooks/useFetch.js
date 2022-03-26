import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  error: false,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { loading: false, error: false, data: action.payload };
    case "error":
      return { loading: false, error: true };
    default:
      return state;
  }
};

export default function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "success", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "error" });
      });
  }, [url]);

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
  };
}
