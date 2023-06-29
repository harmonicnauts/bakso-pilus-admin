import React, { useEffect, useState } from 'react'
import { getAllTransactions } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import CardContainer from './CardContainer';



const Order = () => {

  const [transactions, dispatch] = useStateValue();
  const [fields, setFields] = useState(false); //Untuk error
  const [alertStatus, setalertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



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
        fields={fields}
        setFields={setFields}
        alertStatus={alertStatus}
        setalertStatus={setalertStatus}
        msg={msg}
        setMsg={setMsg}
        isLoading={isLoading}
        setIsLoading={setIsLoading}

      />
    </div>
  )
}

export default Order;