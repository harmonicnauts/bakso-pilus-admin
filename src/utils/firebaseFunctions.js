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
  await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, { merge: true });
};

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  // console.log('test firebase fooditems:', items);

  return items.docs.map((doc) => doc.data());
};

export const getAllTransactions = async () => {
  const items = await getDocs(
    query(collection(firestore, "transactions"), orderBy("id", "desc"))
  );

  // console.log('test firebasefunc.js transaction:', items);

  return items.docs.map((doc) => doc.data());
};

export const saveOrders = async (data) => {
  await setDoc(doc(firestore, 'transactions', `${Date.now()}`), data, { merge: true });
  console.log('tidak ada eror pada file firebasefunc')
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(firestore, "foodItems", id));
  // console.log(`Mencoba untuk menghapus item dengan ID ${id}`)
};

export const updateItem = async (id, data) => {
  // const newData = data;
  await updateDoc(doc(firestore, "foodItems", id), data);
  // console.log(`Mencoba untuk mengupdate item dengan ID ${id}`)
};

export const updateTransaction = async (id, data) => {
  // const newData = data;
  await updateDoc(doc(firestore, "transactions", id), data);
  console.log(`Mencoba untuk mengupdate item dengan ID ${id} dengan data berupa ${JSON.stringify(data)}`)
};
