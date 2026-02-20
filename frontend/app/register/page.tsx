'use client'
import { useState } from 'react'
import { register } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import BasicInput from '@/components/BasicInput'
import { toast } from 'react-toastify'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            await register(username, password)
            toast.success('Account created successfully!')
            router.push('/app')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center w-full pt-32 px-4'>
            <div className='w-full max-w-md'>
                <h1 className='text-3xl font-bold mb-8 text-center'>Create Account</h1>
                
                <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Username</label>
                        <BasicInput
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Choose a username'
                            required
                            minLength={3}
                            maxLength={32}
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium mb-1'>Password</label>
                        <BasicInput
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Choose a password'
                            required
                            minLength={6}
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium mb-1'>Confirm Password</label>
                        <BasicInput
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm your password'
                            required
                            minLength={6}
                        />
                    </div>
                    
                    <BasicButton 
                        type='submit' 
                        disabled={loading}
                        className='mt-4'
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </BasicButton>
                </form>
                
                <p className='mt-6 text-center'>
                    Already have an account?{' '}
                    <Link href='/signin' className='underline font-semibold'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
