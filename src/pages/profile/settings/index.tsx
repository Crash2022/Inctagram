import React, { useState } from 'react'
import Head from 'next/head'
import cls from './ProfileSettings.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { General } from '@/components/Profile/General/General'
import { Devices } from '@/components/Profile/Devices/Devices'
import { Management } from '@/components/Profile/Management/Management'
import { Payments } from '@/components/Profile/Payments/Payments'

const ProfileSettings: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-settings')
    // const router = useRouter()

    // const { data: photos, error, isLoading, isError } = useFetchUserProfileQuery(9)
    // const { data: meData } = useMeQuery()

    // if (isLoading) return <LoaderScreen variant={'loader'} />

    const [isGeneral, setIsGeneral] = useState<boolean>(true)
    const [isDevices, setIsDevices] = useState<boolean>(false)
    const [isManagement, setIsManagement] = useState<boolean>(false)
    const [isPayments, setIsPayments] = useState<boolean>(false)

    // выбор раздела
    const setSectionHandler = (
        isGeneral: boolean,
        isDevices: boolean,
        isManagement: boolean,
        isPayments: boolean
    ) => {
        setIsGeneral(isGeneral)
        setIsDevices(isDevices)
        setIsManagement(isManagement)
        setIsPayments(isPayments)
    }

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Settings' />
            </Head>
            <div className={cls.profilePageSettings}>
                <div className={cls.profileSettings_header}>
                    <div
                        className={isGeneral ? cls.headerItem_active : cls.headerItem}
                        onClick={() => {
                            setSectionHandler(true, false, false, false)
                        }}
                    >
                        General Information
                    </div>
                    <div
                        className={isDevices ? cls.headerItem_active : cls.headerItem}
                        onClick={() => {
                            setSectionHandler(false, true, false, false)
                        }}
                    >
                        Devices
                    </div>
                    <div
                        className={isManagement ? cls.headerItem_active : cls.headerItem}
                        onClick={() => {
                            setSectionHandler(false, false, true, false)
                        }}
                    >
                        Account Management
                    </div>
                    <div
                        className={isPayments ? cls.headerItem_active : cls.headerItem}
                        onClick={() => {
                            setSectionHandler(false, false, false, true)
                        }}
                    >
                        My Payments
                    </div>
                </div>
                <div className={cls.profileSettings_content}>
                    {isGeneral && <General />}
                    {isDevices && <Devices />}
                    {isManagement && <Management />}
                    {isPayments && <Payments />}
                </div>
            </div>
        </>
    )
}

ProfileSettings.getLayout = getSidebarLayout
export default ProfileSettings
