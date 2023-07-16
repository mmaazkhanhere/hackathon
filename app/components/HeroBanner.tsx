import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroBanner() {
    return (
        <section className='flex max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] items-center 
        justify-center mt-[100px] px-4 md:px-10 mx-auto'>
            <div className='flex flex-col gap-y-14'>
                <div className='flex flex-col gap-y-8 lg:mr-[200px]'>
                    <div>
                        <span className='py-3 px-4 bg-blue-100 text-[#0000FF] font-bold font-inconsolata
                        rounded-md'>
                            Sale 70%
                        </span>
                    </div>
                    <h1 className='font-black font-arimo text-[52px] md:text-[62px] leading-[60px] md:leading-[70px] 
                    '>
                        An Industrial Take on Streetwear
                    </h1>
                    <p className='font-inconsolata lg:text-base text-[14px] md:text-[16px] md:max-w-[500px] lg:max-w-none'>
                        Anyone can beat you but no one can beat your outfit as long as you wear Dine Outfits
                    </p>
                    <div>
                        <button className=' py-4 px-10 md:px-24  bg-black'>
                            <Link href='/' className='flex items-center justify-center gap-x-2'>
                                <span className='text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 8 8"><path fill="currentColor" d="M.34 1A.506.506 0 0 0 .5 2H2l.09.25l.41 1.25l.41 1.25c.04.13.21.25.34.25h3.5c.14 0 .3-.12.34-.25l.81-2.5c.04-.13-.02-.25-.16-.25H3.3l-.38-.72A.5.5 0 0 0 2.48 1h-2a.5.5 0 0 0-.09 0a.5.5 0 0 0-.06 0zM3.5 6c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5zm3 0c-.28 0-.5.22-.5.5s.22.5.5.5s.5-.22.5-.5s-.22-.5-.5-.5z" />
                                    </svg>
                                </span>
                                <span className='font-medium text-white font-arimo'>
                                    Start Shopping
                                </span>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className=' grid grid-cols-2 md:grid-cols-4 items-center justify-start gap-4 md:gap-[60px] '>
                    <Image src='/Featured1.webp' alt='Featured 1' width={100} height={100} />
                    <Image src='/Featured2.webp' alt='Featured 1' width={100} height={100} />
                    <Image src='/Featured3.webp' alt='Featured 1' width={100} height={100} />
                    <Image src='/Featured4.webp' alt='Featured 1' width={100} height={100} />
                </div>
            </div>
            <div className='bg bg-red-100 rounded-full hidden lg:block'>
                <div>
                    <Image src='/header.webp' alt='Hero Picture' width={700} height={700} className='-mt-8' />
                </div>
            </div>
        </section>
    )
}
