'use client'
import React from 'react'
import Image from 'next/image'
import { PlusCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { useModal } from '@/app/hooks/useModal'
import BasicButton from '../BasicButton'

type NavbarChildProps = {
    name: string,
    avatar_url?: string
}

export const NavbarChild:React.FC<NavbarChildProps> = ({ name, avatar_url }) => {

    const { setModal } = useModal()

    return (
        <div className='h-16'>
            <div className='w-full fixed bg-secondary flex flex-row items-center p-2 pl-8 justify-end sm:justify-between z-10'>
                <div className='hidden sm:flex flex-row items-center gap-3'>
                    <BasicButton onClick={() => setModal('Create Realm')} className='flex flex-row items-center gap-2 py-[10px]'>
                        Create Space
                        <PlusCircleIcon className='h-5'/>
                    </BasicButton>
                    <a href={process.env.NEXT_PUBLIC_PREDICTION_MARKET_URL || 'http://localhost:3003'} target='_blank' rel='noopener noreferrer'>
                        <BasicButton className='flex flex-row items-center gap-2 py-[10px]'>
                            Prediction Market
                            <ArrowTrendingUpIcon className='h-5'/>
                        </BasicButton>
                    </a>
                </div>
                <div className='flex flex-row items-center gap-4 hover:bg-light-secondary animate-colors rounded-full cursor-pointer py-1 px-1 select-none' onClick={() => setModal('Account Dropdown')}>
                    <p className='text-white'>{name}</p>
                    <Image alt='avatar' src={avatar_url || '/default-avatar.png'} width={48} height={48} className='aspect-square rounded-full' />
                </div>
            </div>
        </div> 
    )
}