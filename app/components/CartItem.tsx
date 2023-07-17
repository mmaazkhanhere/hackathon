'use client'

import Image from 'next/image'
import React, { useState, FC } from 'react'
import { Image as IImage } from 'sanity'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { urlForImage } from '@/sanity/lib/image'
import { useAppDispatch } from '../store/hooks'
import { updateCart } from '@/app/store/cartSlice'
import { cartTable, db } from '../lib/drizzle'
import { eq } from 'drizzle-orm'

interface Product {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    quantity: number,
    oneQuantityPrice: number
}


const CartItem: FC<{ item: Product }> = ({ item }) => {

    const [quantity, setQuantity] = useState<number>(item.quantity);
    const oneQuantityPrice = item.price * 1;

    const dispatch = useAppDispatch();

    const addQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateCart({ ...item, quantity: quantity + 1 }));
    }

    const removeQuantity = () => {
        setQuantity(quantity - 1)
        dispatch(updateCart({ ...item, quantity: quantity - 1 }));
    };

    const handleDelete = async () => {
        try {
            const productName = item.name; // Replace with the actual product name
            const req = await fetch(`/api/cart?product_name=${encodeURIComponent(productName)}`, {
                method: 'DELETE',
                cache: 'no-cache'
            });
            if (!req.ok) {
                throw new Error('Unexpected Error');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
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
                            disabled={quantity == 1}>
                            -
                        </button>
                        <span className='font-medium'>{quantity}</span>
                        <button className=' bg-gray-200 p-1 cursor-pointer rounded-full hover:bg-[#fdfdfc] 
                        hover:border hover:border-black text-[14px]'
                            onClick={addQuantity}>
                            +
                        </button>
                    </div>
                    <span className='font-bold font-inconsolata'>
                        {oneQuantityPrice * quantity} $
                    </span>
                </div>
                <div className='text-[22px] cursor-pointer'>
                    <RiDeleteBin6Line onClick={handleDelete}
                    />
                </div>
            </div>

        </section>
    )
}

export default CartItem