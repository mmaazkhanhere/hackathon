'use client'

import { getProduct } from '@/app/utils/getProduct'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Image as IImage } from 'sanity'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useAppDispatch } from '@/app/store/hooks'
import { addCartItem } from '@/app/store/cartSlice'

interface IProduct {
    name: string;
    sub_cat: string;
    price: number;
    image: IImage;
    product_info: string;
    quantity: number;
}

export default function Product({ params }: { params: { slug: string } }) {

    const [data, setData] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProduct(params.slug);
                setData(productData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.slug]);


    if (data === null) {

        return <div className='w-full h-screen flex items-center justify-center'>
            <Image src="/Logo.webp" alt='Logo Picture' width={200} height={200} />
        </div>;
    }

    const notify = () => {
        toast.success("Item added to the cart!", {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            draggable: true,
            closeOnClick: true,
            theme: 'colored'
        });
    };

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            await dispatch(
                addCartItem({
                    product_name: data.name,
                    quantity: data.quantity,
                    price: data.price,
                })
            );
            setIsLoading(false)
        } catch (error) {
            // Handle error here if needed
            console.error("Error adding item to cart:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <main className='sm:max-w-[450px] md:max-w-[950px] lg:max-w-[1400px] mt-[100px] md:px-10 mx-auto
        bg-[#fdfdfc]'>
                <section className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-0 lg:gap-x-[400px]'>
                    <div className=' w-[350px] md:w-[600px] lg:w-[800px] flex items-start justify-start mx-auto '>
                        <div className='mr-[10px] md:mr-[20px] lg:mr-[30px] ' >
                            <Image src={urlForImage(data.image).url()} alt={data.name} width={100} height={100}
                                className='object-cover w-[50px] md:w-[70px] lg:w-[90px]' />
                        </div>
                        <div>
                            <Image src={urlForImage(data.image).url()} alt={data.name} width={900} height={900}
                                className="object-cover w-[250px] md:w-[550px] lg:w-[800px]" />

                        </div>
                    </div>
                    <div className='p-10 pl-4 flex flex-col gap-y-4'>
                        <div className='flex flex-col items-start justify-center leading-[26px]'>
                            <h1 className=' font-arimo text-[28px] font-medium tracking-[2px]'>
                                {data.name}
                            </h1>
                            <span className=' text-gray-300 font-inconsolata font-bold text-[22px]'>
                                {data.sub_cat}
                            </span>
                        </div>
                        <div className='flex flex-col items-start justify-center gap-y-2'>
                            <span className='uppercase font-inconsolata tracking-tighter font-bold'>Select Size</span>
                            <div className='flex items-center justify-center gap-x-6'>
                                <div className='p-3 hover:shadow-xl rounded-full cursor-pointer hover:bg-white'>XS</div>
                                <div className='p-3 hover:shadow-xl rounded-full cursor-pointer hover:bg-white'>S</div>
                                <div className='p-3 hover:shadow-xl rounded-full cursor-pointer hover:bg-white'>M</div>
                                <div className='p-3 hover:shadow-xl rounded-full cursor-pointer hover:bg-white'>L</div>
                                <div className='p-3 hover:shadow-xl rounded-full cursor-pointer hover:bg-white'>XL</div>
                            </div>
                        </div>

                        <div className='flex items-center justify-start gap-x-4'>
                            <SignedOut>
                                <button className='bg-black text-white px-8 py-2 cursor-not-allowed'>
                                    Sign in for Add to Cart
                                </button>
                            </SignedOut>
                            <SignedIn>
                                <button
                                    className='bg-black text-white px-8 py-2 cursor-pointer active:scale-95 hover:scale-105'
                                    disabled={isLoading}
                                    onClick={() => {
                                        handleAddToCart();
                                        notify();
                                    }}
                                >
                                    {isLoading ? "Adding..." : "Add to Cart"}
                                </button>
                            </SignedIn>

                            <span className='text-[22px] font-bold font-inconsolata'>
                                $ {data.price}.00
                            </span>
                        </div>
                    </div>
                </section>

                <section className='flex flex-col items-start justify-center gap-y-10  mt-[80px] bg-white px-4
            mb-[50px]'>
                    <div className='relative mt-[20px]'>
                        <div className='absolute font-inconsolata -top-[60px]'>
                            <h1 className='text-[52px] md:text-[82px] lg:text-[92px]  tracking-tighter text-gray-200'>
                                Overview
                            </h1>
                        </div>
                        <div className='relative z-10'>
                            <h1 className='text-3xl font-bold font-inconsolata tracking-[2px]'>Product Infromation</h1>
                        </div>
                    </div>
                    <div className='border-2 border-gray-200 w-full mt-[30px]' />
                    <div className='flex flex-col items-start justify-center gap-y-10'>
                        <div className='flex flex-col md:flex-row items-start justify-center md:gap-x-[90px] 
                    lg:gap-x-[180px] gap-y-4'>
                            <h1 className='uppercase font-bold text-[20px] md:text-[22px] lg:text-[24px] 
                        text-gray-500 ' >
                                Products Details
                            </h1>
                            <p className='text-justify'>
                                {data.product_info}
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row items-start justify-center md:gap-x-[90px] 
                    lg:gap-x-[180px] gap-y-4'>
                            <h1 className='uppercase font-bold text-[20px] md:text-[22px] lg:text-[24px] text-gray-500' >Products Care</h1>
                            <ul className='font-bold list-inside list-disc'>
                                <li>Hand wash using cold water</li>
                                <li>Don not use bleach</li>
                                <li>Hang it to dry</li>
                                <li>Iron on low temperature</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}
