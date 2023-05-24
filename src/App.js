import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/Admin';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

function App() {

  const [{ }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data,
      });
    }
    );
  };

  useEffect(() =>
    {
    fetchData()
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
