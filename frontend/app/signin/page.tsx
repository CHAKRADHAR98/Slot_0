'use client'
import { useState } from 'react'
import { login } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import BasicInput from '@/components/BasicInput'
import { toast } from 'react-toastify'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login(username, password)
            toast.success('Logged in successfully!')
            router.push('/app')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center w-full pt-32 px-4'>
            <div className='w-full max-w-md'>
                <h1 className='text-3xl font-bold mb-8 text-center'>Sign In</h1>
                
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Username</label>
                        <BasicInput
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your username'
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
                            placeholder='Enter your password'
                            required
                            minLength={6}
                        />
                    </div>
                    
                    <BasicButton 
                        type='submit' 
                        disabled={loading}
                        className='mt-4'
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </BasicButton>
                </form>
                
                <p className='mt-6 text-center'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register' className='underline font-semibold'>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
