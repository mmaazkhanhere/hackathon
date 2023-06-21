'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


import { RiDeleteBin6Line } from 'react-icons/ri'

export default function CartItem() {


    const [quantity, setQuantity] = useState<number>(1);

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const removeQuantity = () => {
        setQuantity(quantity - 1)
    };

    return (
        <section className='flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start 
        sm:max-w-[620px] md:max-w-[720px] lg:max-w-[920px] md:gap-x-4'>
            <div className='mb-[20px] lg:mb-0'>
                <Image src="/Product1.png" alt="Product Image" height={200} width={200}
                    className='lg:w-[190px] md:w-[200px]' />
            </div>
            <div className='flex items-start justify-between w-full'>
                <div className='flex flex-col items-start justify-center md:gap-y-[2px] lg:gap-y-2'>
                    <h1 className='font-bold text-[20px] font-arimo'>Raglan Sweatshirt</h1>
                    <span className='font-bold tracking-tighter text-gray-500'>
                        Dress
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
                        {quantity * 195} $
                    </span>
                </div>
                <div className='text-[22px] cursor-pointer'>
                    <RiDeleteBin6Line />
                </div>
            </div>

        </section>
    )
}
