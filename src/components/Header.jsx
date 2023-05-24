import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
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



  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData } } = await signInWithPopup(fireBaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }
    else {
      setIsMenu(!isMenu);
    }
  }

  const logout = () => {
    setIsMenu(!isMenu);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null
    });
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center text-white">
            Home
          </a>
        </Typography>
      </Link>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          Menu
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          Footer
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-white">
          About Us
        </a>
      </Typography>

      {user && user.email === "nasutionrachmat@gmail.com" && (

        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to={"/admin"} href="#" className="flex items-center text-white">
            Admin
          </Link>
        </Typography>

      )}
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
              Bakso Pilus
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block text-white cursor-pointer"
              onClick={login}
            >
              <span>
                <div className="flex align-middle items-center ">
                  <img className=" m-1 rounded-full w-8" src={user ? user.photoURL : 'avatar'} >
                  </img>
                  {user ? user.displayName : 'Admin'}
                </div>
              </span>

              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className=" w-40 flex flex-col rounded-lg absolute"
                  onClick={logout}>
                  <p className="flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-sm">Log Out</p>
                </motion.div>
              )}
            </div>
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
        <MobileNav open={openNav}>
          {navList}
          <div
            variant="gradient"
            size="sm"
            className="lg:inline-block text-white flex flex-col justify-between items-center cursor-pointer"
            onClick={login}
          >
            <span>
              <div className="flex align-middle items-center ">
                <img className=" m-1 rounded-full w-8" src={user ? user.photoURL : 'avatar'} >
                </img>
                {user ? user.displayName : 'Admin'}
              </div>
            </span>

            <br></br>

            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 flex flex-col rounded-lg justify-between items-center"
                onClick={logout}>

                <p className="flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-sm ">Log Out</p>
              </motion.div>
            ) : ''}


          </div>
        </MobileNav>
      </Navbar>

    </>
  );
}
