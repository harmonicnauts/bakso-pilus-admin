import React from 'react'
import Loader from './Loader';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/data';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem, updateItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import RowContainer from './RowContainer';
import { Typography } from '@material-tailwind/react';
import { v4 as uuidv4 } from 'uuid';

const UpdateMenu = () => {

	const [nama, setNama] = useState("");
	const [id, setId] = useState('')
	const [harga, setHarga] = useState("");
	const [category, setCategory] = useState(null);
	const [fields, setFields] = useState(false); //Untuk error
	const [alertStatus, setalertStatus] = useState("danger");
	const [msg, setMsg] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setisUpdate] = useState(false);
	const [{ foodItems }, dispatch] = useStateValue();


	const uploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on('state_changed', (snapshot) => {
		}, (error) => {
			console.log(error)
			setFields(true)
			setMsg('Error uploading : Try again')
			setalertStatus('danger')
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000)
		}, () => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				setImageAsset(downloadURL);
				setIsLoading(false);
				setFields(true);
				setMsg('Image uploaded successfully');
				setalertStatus('success');
				setTimeout(() => {
					setFields(false);
				}, 4000);
			});
		})
	};

	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg('Image deleted successfully');
			setalertStatus('success');
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const saveDetails = () => {
		setIsLoading(true);
		try {
			if (!nama || !harga || !imageAsset || !category) {
				setFields(true)
				setMsg('Lengkapi field yang masih kosong terlebih dahulu!')
				setalertStatus('danger')
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000)
			}
			else {
				const data = {
					id: uuidv4(),
					nama: nama,
					imageURL: imageAsset,
					category: category,
					qty: 1,
					harga: harga
				}
				saveItem(data);
				setIsLoading(false);
				setFields(true);
				setMsg('Data berhasil disimpan');
				clearData();
				setalertStatus('success');
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log(error)
			setFields(true)
			setMsg('Gagal menyimpan data')
			setalertStatus('danger')
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000)
		}
		fetchData();
	};

	const updateDetails = (id) => {
		setIsLoading(true);
		try {
			if (!nama || !harga || !imageAsset || !category) {
				setFields(true)
				setMsg('Lengkapi field yang masih kosong terlebih dahulu!')
				setalertStatus('danger')
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000)
			}
			else {
				const data = {
					nama: nama,
					imageURL: imageAsset,
					category: category,
					qty: 1,
					harga: harga
				}
				updateItem(id, data);
				setIsLoading(false);
				setFields(true);
				setMsg('Data berhasil diupdate');
				clearData();
				setalertStatus('success');
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log(error)
			setFields(true)
			setMsg('Gagal Mengupdate')
			setalertStatus('danger')
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000)
		}
		fetchData();
	}

	const clearData = () => {
		setNama("");
		setImageAsset(null);
		setHarga("");
		setCategory(null);
		setisUpdate(false);
		setId('');

		const $select = document.querySelector('#select-kategori');
		$select.value = 'other'
	};

	const fetchData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		}
		);
	};

	return (
		<div className='w-full h-auto min-h-screen flex flex-col items-center justify-center'>
			<div className='w-full py-2 flex gap-2 justify-center align-middle mb-4 mt-4'>
				<Typography variant="h3">
					Tambahkan Menu Baru
				</Typography>
			</div>

			<div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 
			flex flex-col items-center justify-center gap-4'>

				{
					fields && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
								? "bg-red-400 text-red-800"
								: "bg-emerald-400 text-emerald-800"
								}`}
						>
							{msg}
						</motion.p>
					)
				}

				<div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
					<MdFastfood className='text-xl text-gray-700' />
					<input
						type="text" required value={nama} placeholder='Masukkan nama menu..'
						onChange={(e) => setNama(e.target.value)}
						className='w-full h-full text-lg bg-transparent font-semibold p-1'>

					</input>
				</div>

				<div className='w-full'>
					<select className='w-full outline-none text-base border-b-2 
					border-gray-200 p-2 rounded-md cursor-pointer'
						id='select-kategori'
						onChange={(e) => { setCategory(e.target.value) }}>
						<option
							value='other'
							className='bg-white'
						>
							Pilih Kategori
						</option>
						{categories &&
							categories.map((item) => (
								<option
									key={item.id}
									className='text-base border-0 outline-none capitalize bg-white'
									value={item.urlParamName}
								>
									{item.name}
								</option>
							))}
					</select>
				</div>

				<div className=' group flex justify-center items-center flex-col border-2
				border-dotted border-gray-300 w-full h-[30rem] xs:h-[15rem] md:h-[30rem] 
				cursor-pointer rounded-lg'>
					{isLoading ? <Loader /> : (<>
						{!imageAsset ? <>
							<label className='w-full h-full flex flex-col items-center justify-center
						cursor-pointer '>
								<div className='w-full h-full flex flex-col items-center justify-center
							cursor-pointer '>
									<MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
									<p className='text-gray-500 hover:text-gray-700'>Klik untuk upload</p>
								</div>
								<input type='file' name='uploadimage' accept='image/*' onChange={uploadImage}
									className=' w-0 h-0'></input>
							</label>
						</> : (<>

							<div className='relative h-full'>
								<img src={imageAsset} alt="uploaded" className='w-full h-full object-cover' />

								<button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500
						text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
									onClick={deleteImage}>
									<MdDelete className='text-white' />
								</button>

							</div>

						</>)}
					</>)
					}
				</div>

				<div className='w-full flex flex-col md:flex-row items-center gap-3'>
					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdAttachMoney className="text-gray-700 text-2xl" />
						<input
							type="text"
							required
							value={harga}
							onChange={(e) => setHarga(e.target.value)}
							placeholder="Harga"
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
						/>
					</div>
				</div>

				<div className='flex item-center w-full'>

					{!isUpdate ? (
						<button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none
					outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
							onClick={saveDetails}>Simpan</button>
					) :
						(
							<div className='justify-end align-middle'>
								<button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none
					outline-none bg-blue-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
									onClick={() => updateDetails(id)}>Update
								</button>

								<button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none
					outline-none bg-red-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
									onClick={clearData}>Cancel</button>
							</div>
						)
					}

				</div>
			</div>

			<div className='w-full py-2 flex gap-2 justify-center align-middle mb-4 mt-7'>
				<Typography variant="h3">
					Update Menu yang Ada
				</Typography>
			</div>


			<RowContainer
				data={foodItems}
				setNama={setNama}
				setCategory={setCategory}
				setImageAsset={setImageAsset}
				setHarga={setHarga}
				setIsLoading={setIsLoading}
				setisUpdate={setisUpdate}
				setId={setId}
			/>
		</div>
	)
}

export default UpdateMenu