import React, { useEffect, useState } from "react";
import { MdNote, MdOutlineKeyboardBackspace, MdPerson } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { saveOrders } from "../utils/firebaseFunctions";
import AdminMenu from "./AdminMenu";

const Kasir = () => {
  const [{ cartItems, user, foodItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [rincian, setRincian] = useState('');


  const saveData = (cart) => {
    const currDate = Date.now();
    const dt = new Date(currDate)
    const date = dt.toUTCString();
    const data = {
      id: `${currDate}`,
      data: cart,
      nama_pelanggan: namaPelanggan,
      status_pembayaran: false,
      total: tot,
      tanggal_transaksi: date,
      rincian: rincian,
      done: false,
    }
    saveOrders(data);
    clearCart();
    console.log('tidak ada eror pada file CartContainer')
  };


  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.harga;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <div>
      <div
        className="fixed top-20 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
      >
        <div className="w-full flex items-center justify-between p-4">
          <p className="text-textColor text-lg font-semibold">Pesanan</p>

          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
            onClick={clearCart}
          >
            Clear
            <RiRefreshFill />
          </motion.p>
        </div>

        {/* bottom section */}
        {cartItems && cartItems.length > 0 ? (
          <div className="w-full h-full bg-white flex flex-col">
            {/* cart Items section */}
            <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              {/* cart Item */}
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                  />
                ))}
            </div>

            {/* cart total section */}
            <div className="w-full flex-1 bg-white rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
              <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                <MdPerson className='text-xl text-black' />
                <input
                  type="text" required value={namaPelanggan} placeholder='Nama Pelanggan'
                  onChange={(e) => { setNamaPelanggan(e.target.value); }}
                  className='w-full h-full text-lg text-black bg-transparent font-semibold p-1'>

                </input>
              </div>

              <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                <MdNote className='text-xl text-black' />
                <textarea
                  type="textfield" required value={rincian} placeholder='Detail Pesanan'
                  onChange={(e) => { setRincian(e.target.value); }}
                  className='w-full h-full text-lg text-white bg-transparent font-semibold p-1 align-middle'>

                </textarea>
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="text-black text-xl font-semibold">Total</p>
                <p className="text-black text-xl font-semibold">
                  Rp{tot}
                </p>
              </div>

              {(
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  data-modal-target="payment-modal"
                  data-modal-toggle="payment-modal"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                  onClick={() => {
                    saveData(cartItems);
                  }}
                // saveData(cartItems)
                >
                  Tambah Pesanan
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src={<a href="https://www.flaticon.com/free-icons/empty-cart" title="empty cart icons">Empty cart icons created by Flat Icons - Flaticon</a>} className="w-300" alt="" />
            <p className="text-xl text-textColor font-semibold">
              Belum ada menu yang dipesan
            </p>
          </div>
        )}
      </div>
      <AdminMenu
        data={foodItems} />
    </div>

  );
};

export default Kasir;