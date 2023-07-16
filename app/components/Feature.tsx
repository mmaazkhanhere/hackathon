import Image from 'next/image'
import React from 'react'

export default function Features() {
    return (
        <section className='mt-[80px] lg:mt-[150px]  max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] mx-auto p-6 
        lg:p-0'>
            <div>
                <h1 className='font-bold font-arimo tracking-[1px] text-3xl text-left lg:text-center'>
                    Unique and Authentic Vintage Design Jewellery
                </h1>
            </div>
            <div className='flex flex-col lg:flex-row mt-[50px] bg-[#fbfcff]'>
                <div className='relative lg:w-1/2 p-4 lg:p-14'>
                    <div className='absolute font-black font-inconsolata opacity-10 max-w-[300px] '>
                        <p className='text-[45px] md:text-[65px] lg:text-[80px] lg:leading-[100px]'>Different from others</p>
                    </div>
                    <div className='grid grid-cols-2 grid-rows-2 gap-x-4 lg:gap-x-10 gap-y-6 lg:gap-y-14'>
                        <div className='flex flex-col items-start justify-center gap-y-2 max-w-[200px] 
                        lg:max-w-[250px]'>
                            <h1 className='font-bold font-arimo text-[18px]'>Using Good Quality Materials</h1>
                            <p className='text-[16px] font-inconsolata leading-[20px]'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit
                            </p>
                        </div>

                        <div className='flex flex-col items-start justify-center gap-y-2 max-w-[200px]
                        lg:max-w-[250px]'>
                            <h1 className='font-bold font-arimo text-[18px]'>100% Handmade Products</h1>
                            <p className='text-[16px] font-inconsolata leading-[20px]'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit
                            </p>
                        </div>

                        <div className='flex flex-col items-start justify-center gap-y-2 max-w-[200px]
                        lg:max-w-[250px]'>
                            <h1 className='font-bold font-arimo text-[18px]'>Modern Fashion Design</h1>
                            <p className='text-[16px] font-inconsolata leading-[20px]'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit
                            </p>
                        </div>

                        <div className='flex flex-col items-start justify-center gap-y-2 max-w-[200px]
                        lg:max-w-[250px]'>
                            <h1 className='font-bold font-arimo text-[18px]'>Discount for Bulk Orders</h1>
                            <p className='text-[16px] font-inconsolata leading-[20px]'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center gap-y-6 lg:gap-y-0 
                md:gap-x-10 lg:w-1/2 mt-[30px] lg:mt-0'>
                    <Image src="/feature.webp" alt='Women in white hoodie' height={300} width={300} />
                    <div className='flex flex-col items-start justify-center gap-y-6 lg:gap-y-4'>
                        <p className='font-inconsolata text-[16px] text-justify'>
                            This piece is ethically crafted in our small family-owned workshop in Peru with
                            unmatched attention to detail and care. The Natural color is the actual natural color
                            of the fiber, undyed and 100% traceable.
                        </p>
                        <div>
                            <button className='bg-black text-white px-8 py-2 font-arimo'>
                                See all Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
