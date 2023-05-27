import React, { useState } from 'react'
import Head from 'next/head'
import cls from './ProfileSettings.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { General } from '@/components/Profile/General/General'
import { Devices } from '@/components/Profile/Devices/Devices'
import { Management } from '@/components/Profile/Management/Management'
import { Payments } from '@/components/Profile/Payments/Payments'

interface SectionsType {
    id: number
    menu: ProfileSettingsMenuType
}

type ProfileSettingsMenuType = 'General' | 'Devices' | 'Management' | 'Payments'

const ProfileSettings: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-settings')

    const sections: SectionsType[] = [
        { id: 1, menu: 'General' },
        { id: 2, menu: 'Devices' },
        { id: 3, menu: 'Management' },
        { id: 4, menu: 'Payments' }
    ]

    const [settingsMenu, setSettingsMenu] = useState<ProfileSettingsMenuType>('General')

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
                                    el.menu === settingsMenu
                                        ? cls.headerItem_active
                                        : cls.headerItem
                                }
                                onClick={() => {
                                    setSettingsMenu(el.menu)
                                }}
                            >
                                {t(`${el.menu}`)}
                            </div>
                        )
                    })}
                </div>
                <div className={cls.profileSettings_content}>
                    {sections[0].menu === settingsMenu && <General />}
                    {sections[1].menu === settingsMenu && <Devices />}
                    {sections[2].menu === settingsMenu && <Management />}
                    {sections[3].menu === settingsMenu && <Payments />}
                </div>
            </div>
        </>
    )
}

ProfileSettings.getLayout = getSidebarLayout
export default ProfileSettings
