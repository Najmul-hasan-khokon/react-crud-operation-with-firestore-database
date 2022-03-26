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

// getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc

/// custom hook functional component eo likte partam.
/// just useService diye file like sob kichu kore sub function gula return kore dibo.

const db = getFirestore();
const bookCollectionRef = collection(db, "books");

class BookDataService {
  // add method
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  // getAllBooks method
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  // edit Single book method
  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };

  // deleteBook method
  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

  // updateBook method
  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  };
}

export default new BookDataService();
