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

interface SectionsType {
    id: number
    status: ProfileSettingStatusType
}

type ProfileSettingStatusType = 'General' | 'Devices' | 'Management' | 'Payments'

const ProfileSettings: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-settings')
    // const router = useRouter()

    // const { data: photos, error, isLoading, isError } = useFetchUserProfileQuery(9)
    // const { data: meData } = useMeQuery()

    const sections: SectionsType[] = [
        { id: 1, status: 'General' },
        { id: 2, status: 'Devices' },
        { id: 3, status: 'Management' },
        { id: 4, status: 'Payments' }
    ]

    const [settingStatus, setSettingStatus] = useState<ProfileSettingStatusType>('General')

    // if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <>
            <Head>
                <title>Inctagram - Profile Setting</title>
                <meta name='title' content='Profile Settings' />
            </Head>
            <div className={cls.profilePageSettings}>
                <div className={cls.profileSettings_header}>
                    {sections.map((el) => {
                        return (
                            <div
                                key={el.id}
                                className={
                                    el.status === settingStatus
                                        ? cls.headerItem_active
                                        : cls.headerItem
                                }
                                onClick={() => {
                                    setSettingStatus(el.status)
                                }}
                            >
                                {t(`${el.status}`)}
                            </div>
                        )
                    })}
                </div>
                <div className={cls.profileSettings_content}>
                    {sections[0].status === settingStatus && <General />}
                    {sections[1].status === settingStatus && <Devices />}
                    {sections[2].status === settingStatus && <Management />}
                    {sections[3].status === settingStatus && <Payments />}
                </div>
            </div>
        </>
    )
}

ProfileSettings.getLayout = getSidebarLayout
export default ProfileSettings
