import React, { useEffect, useState } from 'react'
import { getAllTransactions } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import CardContainer from './CardContainer';



const Order = () => {

  const [transactions, dispatch] = useStateValue();


  const fetchData = async () => {
    await getAllTransactions().then((data) => {
      dispatch({
        type: actionType.SET_TRANSACTIONS,
        transactions: data,
      });
    }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);


  console.log('test transactions ', transactions.transactions)


  return (
    <div className='w-full h-auto min-h-screen flex flex-col items-center justify-center'>
      <CardContainer
        data={transactions}
      />
    </div>
  )
}

export default Order;