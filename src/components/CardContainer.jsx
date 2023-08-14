import React, { useEffect, useRef } from 'react'
import { MdCheck, MdClear, MdDelete } from 'react-icons/md';
import { deleteTransaction, getAllTransactions, updateTransaction } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { Typography } from '@material-tailwind/react';


const CardContainer = (data) => {
  const data_transaksi = data.data.transactions;
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

  }, []);

  console.log('data : ', data_transaksi);
  console.log(Boolean(data_transaksi));
  console.log(data_transaksi);

  const cardContainer = useRef();

  const changeStat = (id, currStat) => {
    try {
      const newStat = currStat;
      const data = {
        status_pembayaran: newStat
      }
      console.log('newStat =', newStat, 'data =', data);
      updateTransaction(id, data);
    }
    catch (error) {
      console.log(error)
    }

    fetchData();
  };

  const changeDone = (id, currDone) => {
    try {
      const newDone = currDone;
      const data = {
        done: newDone
      }
      updateTransaction(id, data);
    }
    catch (error) {
      console.log(error)
    }
    fetchData();
  };


  return (
    <div ref={cardContainer} className='w-full h-auto min-h-screen flex flex-row justify-top mt-10'>
      <div className='w-[75%] h-auto min-h-screen flex flex-col justify-top mt-10'>
        <div className='align-middle justify-center text-center mb-8'>
          <Typography variant='h3' classname='text-center justify-center '>
            Pesanan yang Belum dilayani
          </Typography>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg flex flex-wrap justify-center">
          {
            data_transaksi && data_transaksi.length > 0 ? data_transaksi.filter((n) => n.done === false && n.status_pembayaran == true).map((item, i) => (
              <div
                class="flex rounded-lg bg-white  w-2/3 border-solid border-2 border-neutral-500 mb-4 flex-row ">
                <div className='border-r-2 border-black'>
                  <p
                    class=" px-6 py-3 text-neutral-800">
                    Pesanan ke-{i + 1}
                  </p>
                  <div class="pl-6 pr-6">
                    <div class="flex items-center mb-4">
                      <input id="default-checkbox" checked={item.done} onChange={() => { changeDone(item.id, !item.done); fetchData() }} type="checkbox" value='' class="w-4 h-4 m-2 align-middle text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <h5
                        class=" text-xl font-medium leading-tight text-neutral-800 flex">
                        {item.nama_pelanggan}
                      </h5>
                    </div>
                    <p class="mb-4 text-base text-neutral-600 ">
                      <b>Menu yang dipesan :</b>
                      {item.data.map(n =>
                      (<div>
                        <p>{n.nama} {n.qty}x</p>
                      </div>)
                      )}
                    </p>
                    <button
                      type="button"
                      class="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}>
                      <MdClear />
                    </button>
                  </div>
                  <div
                    class="text-neutral-600 px-6 py-3 border-neutral-600">
                    Total : Rp {new Intl.NumberFormat().format(item.total)}
                  </div>
                </div>
                <p class="mb-4 text-base text-neutral-600 p-12 ">
                  <b>Detail Pesanan :</b><br></br>
                  {item.rincian}
                </p>
              </div>
            )) :
              (
                <p> tidak ada data</p>
              )
          }
        </div>

        <br />  <br />  <br />
        <div className='align-middle justify-center text-center mb-8'>
          <Typography variant='h3' classname='text-center justify-center '>
            Pesanan yang Sudah Selesai Dilayani
          </Typography>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-wrap justify-center">
          {
            data_transaksi && data_transaksi.length > 0 ? data_transaksi.filter((n) => n.done === true && n.status_pembayaran == true).map((item, i) => (
              <div
                class="flex rounded-lg bg-white  w-2/3 border-solid border-2 border-neutral-500 mb-4 flex-row ">
                <div className='border-r-2 border-black'>
                  <div class="pl-6 pr-6">
                    <div class="flex items-center mb-4 pt-4">
                      <input id="default-checkbox" checked={item.done} onChange={() => { changeDone(item.id, !item.done); fetchData() }} type="checkbox" value='' class="w-4 h-4 m-2 align-middle text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <h5
                        class=" text-xl font-medium leading-tight text-neutral-800 flex">
                        {item.nama_pelanggan}
                      </h5>
                    </div>
                    <p class="mb-4 text-base text-neutral-600 ">
                      <b>Menu yang dipesan :</b>
                      {item.data.map(n =>
                      (<div>
                        <p>{n.nama} {n.qty}x</p>
                      </div>)
                      )}
                    </p>
                    <button
                      type="button"
                      class="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}>
                      <MdClear />
                    </button>
                  </div>
                  <div
                    class="text-neutral-600 px-6 py-3 border-neutral-600">
                    Total : Rp {new Intl.NumberFormat().format(item.total)}
                  </div>
                </div>
                <p class="mb-4 text-base text-neutral-600 p-12 ">
                  <b>Detail Pesanan :</b><br></br>
                  {item.rincian}
                </p>
              </div>
            )) :
              (
                <p> tidak ada data</p>
              )
          }
        </div>
      </div>
      <div className='w-[25%] h-auto min-h-screen flex flex-col justify-top mt-10 border-l-slate-500 border-2 '>
        <div className='align-middle justify-center text-center mb-8'>
          <Typography variant='h4' classname='text-center justify-center '>
            Pesanan belum dibayar
          </Typography>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-wrap justify-center">
          {
            data_transaksi && data_transaksi.length > 0 ? data_transaksi.filter((n) => n.status_pembayaran === false).map((item, i) => (
              <div
                class="block rounded-lg w-[90%] bg-white border-solid border-2 border-neutral-500 mb-4">
                <p
                  class=" px-6 py-3 text-neutral-800">
                  Pesanan ke-{i + 1}
                </p>
                <div class="pl-6 pr-6">
                  <div class="flex items-center mb-4">
                    <h5
                      class=" text-xl font-medium leading-tight text-neutral-800 flex">
                      {item.nama_pelanggan}
                    </h5>
                  </div>
                  <button
                    type="button"
                    class="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}>
                    <MdCheck />
                  </button>

                  <button
                    type="button"
                    class="inline-block rounded bg-red-500 px-6 pb-2 ml-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => { deleteTransaction(item?.id) }}>
                    <MdDelete />
                  </button>
                </div>
                <div
                  class="text-neutral-600 px-6 py-3 border-neutral-600">
                  Total : Rp {new Intl.NumberFormat().format(item.total)}
                </div>


              </div>
            )) :
              (
                <p> tidak ada data</p>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default CardContainer