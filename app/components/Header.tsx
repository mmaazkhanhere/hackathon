'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

interface IResponse {
    id: number,
    user_id: string,
    product_name: string,
    quantity: number
}

interface IResponseObj {
    items: IResponse[]
}

export default function Header() {

    const [menu, setMenu] = useState(false);
    const [databaseData, setDatabaseData] = useState<IResponseObj | null>(null);

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

    useEffect(() => {
        fetchCartItems();
        const interval = setInterval(fetchCartItems, 4000);

        return () => {
            clearInterval(interval);
        };

    }, []);

    if (databaseData === null) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
            </div>
        );
    }

    const handleMenuShow = () => {
        setMenu(true);
    }

    const handleMenuHide = () => {
        setMenu(false)
    }
    return (

        <section className=' max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] mt-6 md:mt-12 lg:mt-8 mx-auto'>
            <nav className={`hidden items-center sticky justify-between lg:flex transition-transform duration-300`}>
                <div>
                    <Link href='/'>
                        <Image src="/Logo.webp" alt="Dine Market Logo" width={140} height={140} />
                    </Link>
                </div>
                <div className='font font-arimo hidden lg:flex items-center justify-center gap-x-10'>
                    <Link href='/female' >Female</Link>
                    <Link href='/male' >Male</Link>
                    <Link href='/all_products' >All Products</Link>
                </div>
                <div className='hidden items-center border lg:flex rounded-md'>
                    <span className='px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input type="text" placeholder='What you are looking for' className='w-[450px] rounded-md text-sm' />
                </div>
                {/*Icons */}
                <div className='flex items-center justify-center gap-10'>
                    <Link href="/cart">
                        <div className='relative hidden lg:flex'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 8 8"><path fill="currentColor" d="M.34 1A.506.506 0 0 0 .5 2H2l.09.25l.41 1.25l.41 1.25c.04.13.21.25.34.25h3.5c.14 0 .3-.12.34-.25l.81-2.5c.04-.13-.02-.25-.16-.25H3.3l-.38-.72A.5.5 0 0 0 2.48 1h-2a.5.5 0 0 0-.09 0a.5.5 0 0 0-.06 0zM3.5 6c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5zm3 0c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5z" />
                                </svg>
                            </div>
                            <SignedIn>
                                {databaseData.items.length > 0 &&
                                    <span className='absolute text-white bg-red-500 rounded-full w-[20px] h-[20px] text-[14px] 
                                -top-4 left-6 flex items-center justify-center'>
                                        {databaseData.items.length}
                                    </span>
                                }
                            </SignedIn>
                        </div>
                    </Link>

                    <div >
                        <SignedOut>
                            <button className='px-6 py-2 bg-black text-white hover:bg-gray-500 active:scale-95 rounded-lg'>
                                <SignInButton />
                            </button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl='/' />
                        </SignedIn>
                    </div>
                </div>
            </nav>
            {menu === false &&
                <nav className='flex items-center justify-between lg:hidden px-4 md:px-10 mx-auto '>
                    <div>
                        <Link href='/'>
                            <Image src="/Logo.webp" alt="Dine Market Logo" width={140} height={140} />
                        </Link>
                    </div>
                    <button onClick={handleMenuShow}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v2H3V4Zm6 7h12v2H9v-2Zm-6 7h18v2H3v-2Z" />
                            </svg>
                        </span>
                    </button>
                </nav>
            }
            {menu === true &&
                <section className='transition-all duration-700 mx-auto relative md:max-w-[650px]'>
                    <nav className='flex items-center justify-between'>
                        <div>
                            <Link href='/'>
                                <Image src="/Logo.webp" alt="Dine Market Logo" width={140} height={140} />
                            </Link>
                        </div>
                        <div>
                            <button className='' onClick={handleMenuHide}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </nav>
                    <div className='absolute flex flex-col items-center justify-center gap-y-4 bg-black text-white
                    rounded-xl p-10 mt-20 font-arimo   w-[75vw] md:top-0 z-10 md:left-10 '>
                        <Link href="/cart" className='border-b border-b-slate-300 w-full flex justify-center pb-2'>
                            <div className='relative flex '>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 8 8"><path fill="currentColor" d="M.34 1A.506.506 0 0 0 .5 2H2l.09.25l.41 1.25l.41 1.25c.04.13.21.25.34.25h3.5c.14 0 .3-.12.34-.25l.81-2.5c.04-.13-.02-.25-.16-.25H3.3l-.38-.72A.5.5 0 0 0 2.48 1h-2a.5.5 0 0 0-.09 0a.5.5 0 0 0-.06 0zM3.5 6c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5zm3 0c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5z" />
                                    </svg>
                                </div>
                                <SignedIn>
                                    <span className='absolute text-white bg-red-500 rounded-full w-[20px] h-[20px] text-[14px] 
                                -top-4 left-6 flex items-center justify-center'>
                                        {databaseData.items.length}
                                    </span>
                                </SignedIn>
                            </div>
                        </Link>
                        <Link href='/female' className='border-b border-b-slate-300 w-full flex justify-center pb-2' >
                            Female
                        </Link>
                        <Link href='/male' className='border-b border-b-slate-300 w-full flex justify-center pb-2'>
                            Male
                        </Link>
                        <Link href='/all_products' className='border-b border-b-slate-300 w-full flex justify-center pb-2'>
                            All Products
                        </Link>
                        <div >
                            <SignedOut>
                                <button className='px-6 py-2 bg-black text-white hover:bg-gray-500 active:scale-95 rounded-lg'>
                                    <SignInButton />
                                </button>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </section>
            }
        </section>


    )
}
