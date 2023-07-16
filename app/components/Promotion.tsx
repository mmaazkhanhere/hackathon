import Image from 'next/image'
import React from 'react'

export default function Promotion() {
    return (
        <section className='flex flex-col max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] items-center justify-center mt-[150px] px-4 md:px-10 mx-auto'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-sm text-[#0000FF] text-center uppercase text-[14px] font-inconsolata 
                font-bold tracking-[1px]'>
                    Promotions
                </span>
                <h1 className='font-bold font-arimo tracking-[1px] text-3xl text-center'>
                    Our Promotions Events
                </h1>
            </div>
            {/*Grid  */}
            <div className=' grid grid-cols-1 md: grid-cols-[repeat(4, 1fr)] lg:grid-cols-[repeat(6, 1fr)] 
            md:grid-rows-[repeat(3, auto)] lg:grid-rows-[auto, auto] md:gap-x-6 lg:gap-x-4 gap-y-4 lg:gap-y-2 
            mt-[30px] lg:mt-[50px]'>
                {/*60% sale section */}
                <div className='md:col-span-4 flex flex-col lg:flex-row items-center justify-between
                 bg-[#d6d6d8] px-8'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='uppercase font-inconsolata text-4xl font-bold'>
                            get up to 60%
                        </p>
                        <span>
                            For the summer season
                        </span>
                    </div>
                    <div>
                        <Image src='/event1.webp' alt='Women in black shirt' width={250} height={250} />
                    </div>
                </div>
                {/*30% sale section */}
                <div className='md:col-span-4 flex flex-col items-center bg-[#202120] text-white 
                py-12 gap-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='uppercase font-inconsolata text-4xl font-bold'>
                            get 30% off
                        </p>
                        <span className='uppercase font-inconsolata text-sm'>
                            use promo code
                        </span>
                    </div>
                    <div>
                        <button className='uppercase px-2 py-1 bg-gray-500'>dineweekendsale</button>
                    </div>
                </div>
                {/*Flex shirt div */}
                <div className='flex flex-col md:col-span-2 lg:col-span-1 lg:col-start-5 lg:col-end-6 
                lg:row-start-1 lg:row-end-3 bg-[#efe1c7] items-center'>
                    <div className='flex flex-col mt-8'>
                        <span className='font-bold '>
                            Flex Sweatshirt
                        </span>
                        <div className='flex font-inconsolata gap-4'>
                            <span className='line-through text-[16px]'>$100.00</span>
                            <span className='font-bold'>$75.00</span>
                        </div>
                    </div>
                    <div className='mt-4 lg:mt-2'>
                        <Image src='/event2.webp' alt='Model Picture' width={300} height={300}
                            className='w-[200px] md:w-[230px] lg:w-[250px] ' />
                    </div>
                </div>
                {/*Push Button Bomber div */}
                <div className='flex flex-col md:col-span-2 lg:col-span-1 lg:col-start-6 lg:col-end-7 
                 lg:row-start-1 lg:row-end-3 bg-[#d7d7d9] items-center'>
                    <div className='flex flex-col mt-8'>
                        <span className='font-bold'>
                            Flex Push Button Bomber
                        </span>
                        <div className='flex font-inconsolata gap-4'>
                            <span className='line-through text-[16px]'>$225.00</span>
                            <span className='font-bold'>$190.00</span>
                        </div>
                    </div>
                    <div className='mt-4 lg:mt-2'>
                        <Image src='/event3.webp' alt='Model Picture' width={300} height={300}
                            className=' w-[200px] md:w-[230px] lg:w-[250px]' />
                    </div>
                </div>
            </div>
        </section>
    )
}
