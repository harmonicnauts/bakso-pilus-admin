import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'foodItems', `${data.id}`), data, { merge: true });
};

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );


  return items.docs.map((doc) => doc.data());
};

export const getAllTransactions = async () => {
  const items = await getDocs(
    query(collection(firestore, "transactions"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const saveOrders = async (data) => {
  await setDoc(doc(firestore, 'transactions', `${Date.now()}`), data, { merge: true });
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(firestore, "foodItems", id));
};

export const updateItem = async (id, data) => {
  await updateDoc(doc(firestore, "foodItems", id), data);
};

export const updateTransaction = async (id, data) => {
  await updateDoc(doc(firestore, "transactions", id), data);
};
