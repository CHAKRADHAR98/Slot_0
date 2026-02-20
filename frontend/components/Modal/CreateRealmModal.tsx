'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import BasicButton from '../BasicButton'
import BasicInput from '../BasicInput'
import { getToken, getUser } from '@/utils/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation' 
import revalidate from '@/utils/revalidate'
import { removeExtraSpaces } from '@/utils/removeExtraSpaces'
import defaultMap from '@/utils/defaultmap.json'

const CreateRealmModal:React.FC = () => {
    
    const { modal, setModal } = useModal()
    const [realmName, setRealmName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [useDefaultMap, setUseDefaultMap] = useState<boolean>(true)

    const router = useRouter()

    async function createRealm() {
        const token = getToken()
        const user = getUser()

        if (!token || !user) {
            toast.error('Not authenticated')
            return
        }

        setLoading(true)

        const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

        try {
            const response = await fetch(`${API_URL}/realms`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: realmName,
                    map_data: useDefaultMap ? defaultMap : null
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                toast.error(error.message || 'Failed to create realm')
                setLoading(false)
                return
            }

            const data = await response.json()
            setRealmName('')
            revalidate('/app')
            setModal('None')
            toast.success('Your space has been created!')
            router.push(`/editor/${data.realm.id}`)
        } catch (error) {
            toast.error('Failed to create realm')
        }

        setLoading(false)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = removeExtraSpaces(e.target.value)
        setRealmName(value)
    }

    return (
        <Modal open={modal === 'Create Realm'} closeOnOutsideClick>
            <div className='flex flex-col items-center p-4 w-[400px] gap-4'>
                <h1 className='text-2xl'>Create a Space</h1>
                <BasicInput label={'Space Name'} className='w-[280px]' value={realmName} onChange={onChange} maxLength={32}/>
                <div className='flex items-center gap-2 w-[280px]'>
                    <input
                        type="checkbox"
                        id="useDefaultMap"
                        checked={useDefaultMap}
                        onChange={(e) => setUseDefaultMap(e.target.checked)}
                    />
                    <label htmlFor="useDefaultMap">Use starter map</label>
                </div>
                <BasicButton disabled={realmName.length <= 0 || loading} onClick={createRealm} className='text-lg'>
                    Create
                </BasicButton>
            </div>
        </Modal>
    )
}

export default CreateRealmModal