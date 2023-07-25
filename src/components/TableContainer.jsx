import React, { useRef } from 'react'
import { getAllTransactions } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { Typography } from '@material-tailwind/react';


const TableContainer = (data) => {
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

  const tableContainer = useRef();

  return (
    <div ref={tableContainer} className='w-[90vw] h-auto min-h-screen flex flex-col justify-top mt-10'>

      <div className='align-middle justify-center text-center mb-8'>
        <Typography variant='h3' classname='text-center justify-center '>
          List Transaksi
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
                  Pesanan
                </th>
              </tr>
            </thead>
            <tbody>
              {data_transaksi && data_transaksi.length > 0 ? data_transaksi.map((item) => (
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
                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Terbayar</span>
                      </div>
                    ) : (
                      <div class="flex items-center">
                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Belum Terbayar</span>
                      </div>
                    )}
                  </td>
                  <td class="px-6 py-4">
                    Rp {new Intl.NumberFormat().format(item.total)}
                  </td>
                  <td class="px-6 py-4">
                    <ul>
                      {item.data.map(n =>
                      (<div>
                        <li>{n.nama} {n.qty}x</li>
                      </div>)
                      )}
                    </ul>
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