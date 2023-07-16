'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import React from 'react';
import ProductCard from './ProductCard';
import { client } from '@/sanity/lib/client';

import { Image as IImage } from 'sanity'

import 'swiper/css';
import 'swiper/css/autoplay';


const getAllProduct = async () => {
    const res = await client.fetch(`*[_type == "product"]{
    name,
    sub_cat,
    price,
    product_info,
    image,
    "slug":slug.current,
}`)
    return res;
}

interface IProductType {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    slug?: string
}

export default async function ProductSection() {

    const data: IProductType[] = await getAllProduct();

    return (
        <section className='mt-[60px] lg:mt-[150px] max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] px-4 mx-auto'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-sm text-[#0000FF] text-center uppercase text-[14px] font-inconsolata 
                font-bold tracking-[1px]'>
                    Products
                </span>
                <h1 className='font-bold font-arimo tracking-[1px] text-3xl text-center'>
                    Check What We Have
                </h1>
            </div>
            <div className='flex items-center justify-center mx-auto mt-[50px]'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={150}
                    slidesPerView={3}
                    autoplay={{ delay: 4000 }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        950: {
                            slidesPerView: 3,
                            spaceBetween: 150
                        }
                    }}
                >
                    {
                        data.map((item) => (
                            <SwiperSlide key={item.name}>
                                <ProductCard item={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>


    );
};
