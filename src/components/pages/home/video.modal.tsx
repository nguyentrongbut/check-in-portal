'use client';

import { useState } from 'react';
import PlayIcon from "@/components/pages/home/play.icon";
import { X } from "lucide-react";

export default function VideoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setShow(true), 10);
    };
    const closeModal = () => setShow(false);

    const handleTransitionEnd = () => {
        if (!show) setIsOpen(false);
    };

    return (
        <>
            <div
                className='flex justify-center items-center rounded-full bg-primary w-[100px] h-[100px] cursor-pointer hover:bg-primary/80 transition'
                onClick={openModal}
            >
                <PlayIcon className='w-8 h-8 text-white' />
            </div>

            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeModal}
                >
                    <div
                        className={`relative w-[90%] max-w-4xl rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 ${show ? 'scale-100' : 'scale-90'}`}
                        onClick={(e) => e.stopPropagation()}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        <div className='w-full aspect-video'>
                            <iframe
                                className='w-full h-full'
                                src='https://www.youtube.com/embed/-JtWRlUI8Mk?controls=0&autoplay=1&rel=0&modestbranding=1'
                                title='YouTube video'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <button
                        className='absolute -top-[10%] right-4 text-gray-300 text-3xl font-bold z-50 hover:text-white hover:border-black transition cursor-pointer border rounded-full size-10 flex justify-center items-center'
                        onClick={closeModal}
                    >
                        <X className='size-5'/>
                    </button>
                </div>
            )}
        </>
    );
}
