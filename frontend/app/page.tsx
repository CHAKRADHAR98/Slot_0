'use client'
import AnimatedCharacter from './play/SkinMenu/AnimatedCharacter'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import { Code } from '@phosphor-icons/react'

export default function Index() {
  return (
    <div className='w-full grid place-items-center h-screen gradient p-4 relative'>
      <div className='max-w-[600px] flex flex-col items-center'>
        <div>
          <h1 className='font-semibold text-3xl'>Welcome to Slot 0</h1>   
          <p className='w-full text-xl my-6'>
            Build with your community, set on-chain goals, 
            and let the market bet on your success.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Link href='/app' >
            <BasicButton>
              Get Started
            </BasicButton>
          </Link>
        </div>
        <AnimatedCharacter src='/sprites/characters/Character_009.png'/>
      </div>
    </div>
  )
}
