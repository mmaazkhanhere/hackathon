'use client'

import React, { useEffect, useMemo, useState } from 'react'
import CartItem from '../components/CartItem'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import Image from 'next/image'
import getStripePromise from '../lib/stripe'
import { Image as IImage } from 'sanity'
import { useAppSelector } from '../store/hooks'
interface IProduct {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    quantity: number,
    _id?: string
}

const getProductData = async (product: string): Promise<IProduct | null> => {
    try {
        const req = await client.fetch(
            `*[_type=='product' && name=='${product}']{
        name,
        sub_cat,
        image,
        price,
        quantity,
        _id
    }`
        );
        return req[0];
    } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
    }
};

export default function Cart() {

    const [cartItems, setCartItems] = useState<IProduct[] | null>(null);
    const database = useAppSelector((state) => state.cart.cartItems);
    const [totalQuantity, setTotalQuantity] = useState<number>(1);

    useEffect(() => {
        // Function to fetch product data for cart items
        const fetchProductItems = async () => {
            const itemsPromises = database.map((item) => getProductData(item.product_name));
            const itemsData = await Promise.all(itemsPromises);
            setCartItems(itemsData as IProduct[]);
        };

        // Fetch product data only when the "database" changes
        fetchProductItems();
    }, [database]);


    useEffect(() => {
        if (database) {
            const totalQty = database.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantity(totalQty);
        }
    }, [database, totalQuantity]);


    const subTotal = useMemo(() => {
        if (cartItems === null) return 0;
        return cartItems.reduce((total, val) => {
            const product = database.find((item) => item.product_name === val.name);
            const quantityFromDatabase = product?.quantity || 0;
            return total + val.price * quantityFromDatabase;
        }, 0);
    }, [cartItems, database]);


    if (cartItems === null) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Image src='/Logo.webp' alt='Logo Picture' width={200} height={200} />
            </div>
        );
    }

    const handleCheckout = async () => {
        const stripe = await getStripePromise();

        const cartItemsWithQuantity = database.map((item) => {
            const cartItem = cartItems.find((cartItem) => cartItem.name === item.product_name);
            if (cartItem) {
                return {
                    ...cartItem,
                    quantity: item.quantity,
                };
            }
            return item;
        });

        const response = await fetch("/api/stripe-session/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
            body: JSON.stringify({
                cartItems: cartItemsWithQuantity,
            }),
        });

        const data = await response.json();
        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id });
        }
    };


    return (
        <main className=' max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] mt-[100px] px-6 md:px-10 mx-auto'>
            {cartItems.length > 0 && (
                <>
                    <h1 className='font-bold font-arimo text-4xl '>Shopping Cart</h1>
                    <div className='flex flex-col lg:flex-row lg:items-start '>
                        <section className='flex flex-col mt-[50px] gap-y-6 lg:w-[80%] mr-10'>
                            {cartItems.map((item) => (
                                <CartItem item={item} key={item.name} database={database} />
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
                                    <span> {totalQuantity} Items</span>
                                </div>
                                <div className='flex items-center justify-between font-arimo gap-x-6'>
                                    <span>Sub Total</span>
                                    <span className='font-bold'>{subTotal} $</span>
                                </div>
                                <button className='bg-black text-white py-3 font-inconsolata rounded-lg'
                                    onClick={handleCheckout}
                                >
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
