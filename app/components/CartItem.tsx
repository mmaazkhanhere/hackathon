'use client'

import Image from 'next/image'
import React, { useState, FC, useEffect } from 'react'
import { Image as IImage } from 'sanity'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { urlForImage } from '@/sanity/lib/image'
import { useAppDispatch } from '../store/hooks'
import { deleteItem, removeFromCart, updateCart } from '../store/cartSlice'
import { ToastContainer, toast } from 'react-toastify'


interface IProduct {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    quantity: number,
}

interface IDatabase {
    product_name: string,
    quantity: number,
    price: number
}

interface ICartItems {
    item: IProduct,
    database: IDatabase[]
}


const CartItem: React.FC<ICartItems> = ({ item, database }) => {


    const product = database.find((product) => product.product_name === item.name);
    const oneQuantityPrice = item.price * 1;
    const quantityFromDatabase = product?.quantity || 0;
    const [itemQuantity, setItemQuantity] = useState<number>(quantityFromDatabase);

    const dispatch = useAppDispatch();
    useEffect(() => {
        handleQuantity(itemQuantity);
    }, [itemQuantity]);

    const handleQuantity = async (newQuantity: number) => {
        try {
            const product = item.name;
            await dispatch(updateCart({ product_name: product, quantity: newQuantity }));
        } catch (error) {
            console.error("Cannot update item: ", error)
        }
    }

    const addQuantity = () => {
        setItemQuantity(itemQuantity + 1);
        handleQuantity(itemQuantity);
    }

    const removeQuantity = () => {
        setItemQuantity(itemQuantity - 1)
        handleQuantity(itemQuantity);
    };

    const notify = () => {
        toast.error("Item deleted from the cart the cart!", {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            draggable: true,
            closeOnClick: true,
            theme: 'dark'
        });
    };

    const handleDelete = async () => {
        try {
            const productName = item.name;
            await dispatch(deleteItem({ product_name: productName })); // Dispatch the deleteItem asyncThunk
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const removeItem = () => {
        handleDelete();
        dispatch(removeFromCart(item.name));
        notify();
    }

    return (
        <>
            <ToastContainer />
            <section className='flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start 
        sm:max-w-[620px] md:max-w-[720px] lg:max-w-[920px] md:gap-x-4'>
                <div className='mb-[20px] lg:mb-0'>
                    <Image src={urlForImage(item.image).url()} alt={item.name} height={200} width={200}
                        className='lg:w-[190px] md:w-[200px]' />
                </div>
                <div className='flex items-start justify-between w-full'>
                    <div className='flex flex-col items-start justify-center md:gap-y-[2px] lg:gap-y-2'>
                        <h1 className='font-bold text-[20px] font-arimo'>{item.name}</h1>
                        <span className='font-bold tracking-tighter text-gray-500'>
                            {item.sub_cat}
                        </span>
                        <p className='lg:font-bold font-inconsolata flex flex-col lg:flex-row'>
                            Delievery Estimation:
                            <span className='font-medium text-yellow-500'>5 Working Days</span>
                        </p>
                        <div className='flex items-center justify-start gap-x-4'>
                            <span className='lg:font-bold font-inconsolata'>Quantity:  </span>
                            <button className=' bg-gray-200 p-1 cursor-pointer rounded-full hover:bg-[#fdfdfc] hover:border 
                        hover:border-black text-[14px]'
                                onClick={removeQuantity}
                                disabled={itemQuantity == 1}>
                                -
                            </button>
                            <span className='font-medium'>{itemQuantity}</span>
                            <button className=' bg-gray-200 p-1 cursor-pointer rounded-full hover:bg-[#fdfdfc] 
                        hover:border hover:border-black text-[14px]'
                                onClick={addQuantity}>
                                +
                            </button>
                        </div>
                        <span className='font-bold font-inconsolata'>
                            {oneQuantityPrice * itemQuantity} $
                        </span>
                    </div>
                    <div className='text-[22px] cursor-pointer'>
                        <RiDeleteBin6Line onClick={removeItem}
                        />
                    </div>
                </div>

            </section>
        </>
    )
}

export default CartItem