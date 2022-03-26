import React, { useReducer, useState } from "react";

// single component with useReducer
const intialState = [
  { id: Date.now(), name: "najmul", email: "najmul@gmail.com" },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((contact) => contact.id !== action.payload.id);

    default:
      throw new Error("hi");
  }
};
const UseReducer = () => {
  const [state, dispath] = useReducer(reducer, intialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function addContact(e) {
    e.preventDefault();
    const contact = {
      id: Date.now(),
      name,
      email,
    };
    setName("");
    setEmail("");
    dispath({ type: "add", payload: contact });
  }

  return (
    <div>
      <h1>UseReducer Hook</h1>
      <form onSubmit={addContact}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="write the name"
          id=""
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="write the email"
          id=""
        />
        <button>submit</button>
      </form>

      {state.map((contact) => {
        return (
          <ul key={contact.id}>
            <li>{contact.name}</li>
            <li>{contact.email}</li>
            <button
              onClick={() =>
                dispath({ type: "delete", payload: { id: contact.id } })
              }
            >
              delete
            </button>
          </ul>
        );
      })}
    </div>
  );
};

export default UseReducer;
