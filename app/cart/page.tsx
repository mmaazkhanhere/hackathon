'use client'

import React, { useEffect, useMemo, useState } from 'react'
import CartItem from '../components/CartItem'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector } from '../store/hooks'
import getStripePromise from '../lib/stripe'
import { Image as IImage } from 'sanity'


interface IResponse {
    id: number,
    user_id: string,
    product_name: string,
    quantity: number
}

interface IResponseObj {
    items: IResponse[]
}

interface IProduct {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    quantity: number,
    oneQuantityPrice: number
}


const getProductData = async (
    product: string
): Promise<IProduct | null> => {
    try {
        const req = await client.fetch(
            `*[_type=='product' && name=='${product}']{
        name,
        sub_cat,
        image,
        price,
        quantity,
        oneQuantityPrice
      }`
        );
        return req[0];
    } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
    }
};

export default function Cart() {
    const [databaseData, setDatabaseData] = useState<IResponseObj | null>(null);
    const [cartItems, setCartItems] = useState<IProduct[] | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // Fetch cart items from the database
                const response = await fetch('/api/cart/get');
                const data = await response.json();
                setDatabaseData(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    useEffect(() => {
        const fetchProductItems = async () => {
            if (databaseData) {
                const itemsPromises = databaseData.items.map((item) =>
                    getProductData(item.product_name)
                );
                const itemsData = await Promise.all(itemsPromises);
                setCartItems(itemsData as IProduct[]); // Type assertion
            }
        };

        fetchProductItems();
    }, [databaseData]);

    const subTotal = useMemo(() => {
        if (cartItems === null) return 0;
        return cartItems.reduce((total, val) => {
            return total + val.price;
        }, 0);
    }, [cartItems]);

    if (databaseData === null || cartItems === null) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Image src='/Logo.webp' alt='Logo Picture' width={200} height={200} />
            </div>
        );
    }

    const product: string[] = []
    for (let i = 0; i < databaseData.items.length; i++) {
        product.push(databaseData.items[i].product_name)
    }

    const handleCheckout = async () => {
        const stripe = await getStripePromise();
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        const response = await fetch("/api/stripe-session/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
            body: JSON.stringify({
                cartItems: cartItems,
            }),
        });

        const data = await response.json();
        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id });
        }
    }


    return (
        <main className=' max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] mt-[100px] px-6 md:px-10 mx-auto'>
            {cartItems.length > 0 && (
                <>
                    <h1 className='font-bold font-arimo text-4xl '>Shopping Cart</h1>
                    <div className='flex flex-col lg:flex-row lg:items-start '>
                        <section className='flex flex-col mt-[50px] gap-y-6 lg:w-[80%] mr-10'>
                            {cartItems.map((item) => (
                                <CartItem item={item} key={item.name} />
                            ))}
                        </section>
                        <section className=' bg-[#fdfdfd] mt-[50px] lg:w-[30%]'>
                            <div className='flex flex-col items-between gap-y-6'>
                                <h1 className='font-bold font-arimo text-[20px]'>Order Summary</h1>
                                <div className='flex items-center justify-between font-arimo gap-x-6'>
                                    <span>Total Products</span>
                                    <span>{cartItems.length} Product</span>
                                </div>
                                <div className='flex items-center justify-between font-arimo gap-x-6'>
                                    <span>Total Quantities</span>
                                    <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} Items</span>
                                </div>
                                <div className='flex items-center justify-between font-arimo gap-x-6'>
                                    <span>Sub Total</span>
                                    <span className='font-bold'>{subTotal} $</span>
                                </div>
                                <button className='bg-black text-white py-3 font-inconsolata rounded-lg'
                                    onClick={handleCheckout}>
                                    Process to Checkout
                                </button>
                            </div>
                        </section>
                    </div>
                </>
            )}
            {
                cartItems.length < 1 && (
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
                )}
        </main>

    )
}
