import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

// single component with firebase firestore and react-bootstrap

export const Prectice = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  // get state
  const [users, setUsers] = useState([]);
  const [getId, setGetId] = useState("");
  const [dangerMessage, setDangerMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");

  // db and refference of firestore
  const db = getFirestore();
  const ref = collection(db, "users");

  // data submit
  async function submitHandler(e) {
    e.preventDefault();

    if (name === "" || address === "" || number === "") {
      setDangerMessage("your field was empty!");
      setSuccessMessage("");
      return; // return na korle success message dekhabe
    }

    const fullInformation = { name, address, number };
    getUsers();

    try {
      if (getId !== undefined && getId !== "") {
        const updateDocRef = doc(ref, getId);
        await updateDoc(updateDocRef, fullInformation); // update book
        setGetId("");
        setSuccessMessage("you have updated successfully!");
        setDangerMessage("");
      } else {
        addDoc(ref, fullInformation);
        getUsers();
        setSuccessMessage("you have added successfully!");
        setDangerMessage("");
      }

      setName("");
      setAddress("");
      number("");
    } catch (err) {
      setName("");
      setAddress("");
      setNumber("");
    }
  }

  // get data
  async function getUsers() {
    const result = await getDocs(ref);

    return setUsers(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  // deleteHandler
  function deleteHandler(id) {
    const instence = doc(ref, id);

    try {
      deleteDoc(instence);
      getUsers();
      setSuccessMessage("you have deleted succesfully!");
      setDangerMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  // update data
  async function updateHandler(id) {
    setGetId(id);
    const updateRef = doc(ref, id);
    try {
      const result = await getDoc(updateRef);
      setName(result.data().name);
      setAddress(result.data().address);
      setNumber(result.data().number);
    } catch (err) {
      console.log(err);
    }
  }

  //   data get
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {/* {error && <div>{message}</div>} */}

      {dangerMessage && (
        <Alert
          variant={"danger"}
          dismissible
          onClose={() => setDangerMessage("")}
        >
          {dangerMessage}
        </Alert>
      )}
      {succesMessage && (
        <Alert
          variant={"success"}
          dismissible
          onClose={() => setSuccessMessage("")}
        >
          {succesMessage}
        </Alert>
      )}

      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="write your name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="write your address"
        />
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="write your number"
        />
        <button>submit</button>
      </form>

      {users.map((user) => {
        return (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.address}</li>
            <li>{user.number}</li>
            <button onClick={() => updateHandler(user.id)}>update</button>
            <button onClick={() => deleteHandler(user.id)}>delete</button>
          </ul>
        );
      })}
    </div>
  );
};
