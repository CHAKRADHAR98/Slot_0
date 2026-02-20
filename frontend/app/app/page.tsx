import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/Navbar/Navbar'
import RealmsMenu from './RealmsMenu/RealmsMenu'
import { verifyToken } from '@/utils/auth/server'

export default async function App() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return redirect('/signin')
    }

    const user = await verifyToken(token)
    if (!user) {
        return redirect('/signin')
    }

    // Fetch realms from PostgreSQL
    const { getOwnedRealms, getVisitedRealms } = await import('@/utils/db/realms')
    const ownedRealms = await getOwnedRealms(user.id)
    const visitedRealms = await getVisitedRealms(user.id)

    const realms = [
        ...ownedRealms,
        ...visitedRealms.map(r => ({ ...r, shared: true }))
    ]

    return (
        <div>
            <Navbar />
            <h1 className='text-3xl pl-4 sm:pl-8 pt-8'>Your Spaces</h1>
            <RealmsMenu realms={realms} errorMessage=''/>
        </div>
    )
}