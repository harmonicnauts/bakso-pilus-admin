import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";


export default function Navigationbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);



  // const fireBaseAuth = getAuth(app);
  // const provider = new GoogleAuthProvider();

  // const [{ user }, dispatch] = useStateValue();

  // const [isMenu, setIsMenu] = useState(false);


  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          href='#'
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <span className="flex items-center text-white">
            Kasir
          </span>
        </Typography>
      </Link>

      <Link to={"/order"}>
        <Typography
          as="li"
          href='#'
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <span className="flex items-center text-white">
            Pesanan
          </span>
        </Typography>
      </Link>

      <Link to={"/transaksi"}>
        <Typography
          as="li"
          href='#'
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <span className="flex items-center text-white">
            Transaksi
          </span>
        </Typography>
      </Link>

      <Link to={"/updatemenu"}>
        <Typography
          as="li"
          variant="small"
          href='#'
          color="blue-gray"
          className="p-1 font-normal"
        >
          <span className="flex items-center text-white">
            Update Menu
          </span>
        </Typography>
      </Link>
    </ul>
  );

  return (
    <>
      <Navbar
        className="sticky bg-slate-900 inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 
      lg:px-8 lg:py-4 overflow-visible">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium text-white"
            >
              Bakso Pilus Admin Page
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>

    </>
  );
}
