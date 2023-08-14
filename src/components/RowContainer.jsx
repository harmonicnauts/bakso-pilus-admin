import React, { useEffect, useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.png"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteItem, updateItem, getAllFoodItems } from "../utils/firebaseFunctions";

const RowContainer = ({ flag, data, nama, setNama, harga, setHarga, category, setCategory, fields, setFields, alertStatus, setalertStatus, msg, setMsg, imageAsset, setImageAsset, isLoading, setIsLoading, isUpdate, setisUpdate, id, setId }) => {

	const rowContainer = useRef();
	const [{ }, dispatch] = useStateValue();
	const [items, setItems] = useState([]);

	useEffect(() => {

	}, []);

	const fetchData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		}
		);
	};

	const stateUpdate = (id, nama, kategori, img, harga) => {
		setIsLoading(true);
		setNama(nama);

		setCategory(kategori);
		const $select = document.querySelector('#select-kategori');
		$select.value = kategori;

		setImageAsset(img);
		setHarga(harga);
		setisUpdate(true);
		setIsLoading(false);
		setId(id);


		window.scrollTo(0, 0);
	}

	// console.log('test data rowcont.js ', data.length)

	return (
		<div
			ref={rowContainer}
			className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${flag
				? "overflow-x-scroll scrollbar-none"
				: "overflow-x-hidden flex-wrap justify-center"
				}`}
		>
			{data && data.length > 0 ? (
				data.map((item) => (
					<div
						key={item?.id}
						className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
					>
						<div className="w-full flex items-center justify-between">
							<motion.div
								className="w-40 h-40 -mt-8 drop-shadow-2xl"
								whileHover={{ scale: 1.2 }}
							>
								<img
									src={item?.imageURL}
									alt="item image"
									className=" h-[85%] object-contain rounded-full"
								/>
							</motion.div>

							<motion.div
								whileTap={{ scale: 0.75 }}
								className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
								onClick={() => { stateUpdate(item?.id, item?.nama, item?.category, item?.imageURL, item?.harga); }}
							// updateItem(item?.id, item)
							>
								<MdEdit className="text-white" />
							</motion.div>

							<motion.div
								whileTap={{ scale: 0.75 }}
								className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
								onClick={() => {
									deleteItem(item?.id)
									fetchData()
								}}
							>
								<MdDelete className="text-white" />
							</motion.div>

						</div>

						<div className="w-full flex flex-col items-end justify-end -mt-8">
							<div className="flex items-center gap-8">
								<p className="text-textColor font-semibold text-base md:text-lg">
									{item?.nama}
								</p>
							</div>

							<div className="flex items-center gap-8">
								<p className="text-lg text-headingColor font-semibold">
									<span className="text-sm text-red-500">Rp </span> {item?.harga}
								</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="w-full flex flex-col items-center justify-center">
					<img src={NotFound} className="h-340" />
					<p className="text-xl text-headingColor font-semibold my-2">
						Items Not Available
					</p>
				</div>
			)}
		</div>
	);
};

export default RowContainer;