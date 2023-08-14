import React, { useEffect } from 'react'
import { getAllTransactions } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import TableContainer from './TableContainer';


const Transaksi = () => {
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


  return (
    <div className='w-full h-auto min-h-screen flex flex-col items-center justify-center'>
      <TableContainer
        data={transactions}
      />
    </div>
  )
}

export default Transaksi