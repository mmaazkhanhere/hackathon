
import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'

import Link from 'next/link'
import Image from 'next/image'


export default function Cart() {



    return (
        <main className='sm:max-w-[450px] md:max-w-[950px] lg:max-w-[1400px] mt-[100px] px-6 md:px-10 mx-auto'>
            {/* {cartList.length > 0 && (
                <> */}
            <h1 className='font-bold font-arimo text-4xl '>Shopping Cart</h1>
            <div className='flex flex-col lg:flex-row lg:items-start '>
                <section className='flex flex-col mt-[50px] gap-y-6 lg:w-[80%]'>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </section>
                <section className=' bg-[#fdfdfd] mt-[50px] lg:w-[30%]'>
                    <div className='flex flex-col items-between gap-y-6'>
                        <h1 className='font-bold font-arimo text-[20px]'>Order Summary</h1>
                        <div className='flex items-center justify-between font-arimo gap-x-6'>
                            <span>Quantity</span>
                            <span>2 Products</span>
                        </div>
                        <div className='flex items-center justify-between font-arimo gap-x-6'>
                            <span>Sub Total</span>
                            <span>$ 195</span>
                        </div>
                        <button className='bg-black text-white py-2 font-inconsolata'>
                            Process to Checkout
                        </button>
                    </div>
                </section>
            </div>
            {/* </>
            )} */}
            {/* {
                cartList.length < 1 && (
                    <section className='sm:max-w-[450px] md:max-w-[950px] lg:max-w-[1400px] mt-[100px] px-4 md:px-10 mx-auto
             flex flex-col items-center justify-center'>
                        <Image src="/emptyCart.png" alt="Empty Cart Page" width={600} height={600} />

                        <div className='mt-[50px] flex flex-col items-center justify-center font-inconsolata gap-y-4'>
                            <span className="text-xl md:text-3xl text-center font-bold">
                                Looks like this cart is on a diet, it is empty!
                            </span>
                            <span className="text-center text-[16px] md:text-[20px]">
                                Go ahead and explore our products
                            </span>
                            <Link href="/">
                                <button className='px-8 py-2 bg-black text-white rounded-md'>
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </section>
                )} */}
        </main>

    )
}
