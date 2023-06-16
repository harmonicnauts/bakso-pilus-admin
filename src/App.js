import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/UpdateMenu';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';
import { getAllFoodItems, getAllTransactions } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import Order from './components/Order';
import Transaksi from './components/Transaksi';
import UpdateMenu from './components/UpdateMenu';

function App() {

  const [{ }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    }
    );

    await getAllTransactions().then((data) => {
      dispatch({
        type: actionType.SET_TRANSACTIONS,
        transactions: data,
      });
    }
    );
  };



  useEffect(() => {
    fetchData()

  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Order />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/updatemenu" element={<UpdateMenu />} />

          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
