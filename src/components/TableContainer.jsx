import React, { useEffect, useRef, useState } from 'react'
import { MdCheck, MdClear } from 'react-icons/md';
import { getAllTransactions, updateTransaction } from '../utils/firebaseFunctions';
import { motion } from 'framer-motion';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { Typography } from '@material-tailwind/react';


const TableContainer = (data, fields, setFields, alertStatus, setalertStatus, msg, setMsg, isLoading, setIsLoading) => {
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

  const tableContainer = useRef();

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


  return (
    <div ref={tableContainer} className='w-[90vw] h-auto min-h-screen flex flex-col justify-top mt-10'>

      <div className='align-middle justify-center text-center mb-8'>
        <Typography variant='h3' classname='text-center justify-center '>
          Pesanan yang Sudah Dibayar
        </Typography>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        {
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-400 bg-gray-600 uppercase">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Tanggal Transaksi
                </th>
                <th scope="col" class="px-6 py-3">
                  Nama Pelanggan
                </th>
                <th scope="col" class="px-6 py-3">
                  Status Pembayaran
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {data_transaksi && data_transaksi.length > 0 ? data_transaksi.filter((n) => n.status_pembayaran === true).map((item) => (
                <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 text-white">
                  <th scope="row" class="px-6 py-4 ">
                    {item.tanggal_transaksi}
                  </th>
                  <td class="px-6 py-4">
                    {item.nama_pelanggan}
                  </td>
                  <td class="px-6 py-4 ">
                    {item.status_pembayaran ? (
                      <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Terbayar
                      </div>
                    ) : (
                      <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Belum Terbayar
                      </div>
                    )}
                  </td>
                  <td class="px-6 py-4">
                    Rp {new Intl.NumberFormat().format(item.total)}
                  </td>

                  <td class="px-6 py-4">

                    {!item.status_pembayaran ? (
                      <a href="#"
                        type="button"
                        class="font-bold text-2xl text-green-400 hover:underline hover:bg-slate-500 rounded-full"
                        onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}
                      >
                        <MdCheck />
                      </a>
                    ) : (
                      <a href="#"
                        type="button"
                        class="font-bold text-2xl text-red-600 hover:underline hover:bg-slate-500 rounded-full"
                        onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}
                      >
                        <MdClear />
                      </a>
                    )}
                  </td>
                </tr>

              ))
                :
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  data tidak ada
                </tr>
              }
            </tbody>
          </table>
        }
      </div>

      <br />
      <br />
      <br />



      <div className='align-middle justify-center text-center mb-8'>
        <Typography variant='h3' classname='text-center justify-center '>
          Pesanan yang Belum Dibayar
        </Typography>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        {
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-400 bg-gray-600 uppercase">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Tanggal Transaksi
                </th>
                <th scope="col" class="px-6 py-3">
                  Nama Pelanggan
                </th>
                <th scope="col" class="px-6 py-3">
                  Status Pembayaran
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                </th>
              </tr>
            </thead>


            <tbody>
              {data_transaksi && data_transaksi.length > 0 ? data_transaksi.filter((n) => n.status_pembayaran === false).map((item) => (
                <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 text-white">
                  <th scope="row" class="px-6 py-4 ">
                    {item.tanggal_transaksi}
                  </th>
                  <td class="px-6 py-4">
                    {item.nama_pelanggan}
                  </td>
                  <td class="px-6 py-4 ">
                    {item.status_pembayaran ? (
                      <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Terbayar
                      </div>
                    ) : (
                      <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Belum Terbayar
                      </div>
                    )}
                  </td>
                  <td class="px-6 py-4">
                    Rp {new Intl.NumberFormat().format(item.total)}
                  </td>

                  <td class="px-6 py-4">
                    {!item.status_pembayaran ? (
                      <a href="#"
                        type="button"
                        class="font-bold text-2xl text-green-400 hover:underline hover:bg-slate-500 rounded-full"
                        onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}
                      >
                        <MdCheck />
                      </a>
                    ) : (
                      <a href="#"
                        type="button"
                        class="font-bold text-2xl text-red-600 hover:underline hover:bg-slate-500 rounded-full"
                        onClick={() => { changeStat(item?.id, !item?.status_pembayaran); fetchData() }}
                      >
                        <MdClear />
                      </a>
                    )}
                  </td>
                </tr>
              ))
                :
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  data tidak ada
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default TableContainer